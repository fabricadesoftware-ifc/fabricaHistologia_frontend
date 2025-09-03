<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue'
import { useSpecieStore } from '@/stores'
import {
  TableFilterContainer,
  TableFilterCard,
  ButtonActionAdmin,
  AdminGlobalContainer,
  ListTableAdmin,
  DataGraph,
  LoadingSpinner,
  TablePagination
} from '@/components/index'

import { useAdmin } from '@/stores/admin/filter_admin'

// Stores
const speciesStore = useSpecieStore()
const { changeActive, changeActiveMobile } = useAdmin()

// Estado de carregamento
const loading = ref(true)

// Controle de paginação
const currentPage = ref(1)
const itemsPerPage = 10

// Filtros
const filters = ref([])

// Dados formatados
const speciesWithCategory = computed(() =>
  speciesStore.species.map(s => ({
    ...s,
    categoryName: s.category || 'Sem Categoria'
  }))
)

// Carregar dados iniciais
onBeforeMount(async () => {
  try {
    await speciesStore.getSpecies(1)
    // Monta filtros com base nas categorias únicas
    const categories = [...new Set(speciesStore.species.map(s => s.category || 'Sem Categoria'))]
    filters.value = [
      { nome: 'Geral', active: true },
      ...categories.map(cat => ({
        nome: cat,
        active: false
      }))
    ]
  } finally {
    loading.value = false
  }
})

// Filtro ativo
const activeFilter = computed(() =>
  filters.value.find(f => f.active)?.nome
)

// Lista filtrada
const filteredSpecies = computed(() => {
  if (!activeFilter.value || activeFilter.value === 'Geral') {
    return speciesWithCategory.value
  }
  return speciesWithCategory.value.filter(specie => specie.category === activeFilter.value)
})

// Paginação (API já retorna paginado)
const paginatedSpecies = computed(() => filteredSpecies.value)

// Total de páginas
const totalPages = computed(() =>
  Math.max(1, Math.ceil((speciesStore.count || filteredSpecies.value.length) / itemsPerPage))
)

// Atualiza dados ao mudar de página
watch(currentPage, async (newPage) => {
  loading.value = true
  await speciesStore.getSpecies(newPage)
  loading.value = false
})

// Resetar para página 1 ao mudar filtro
watch(activeFilter, async () => {
  currentPage.value = 1
  loading.value = true
  await speciesStore.getSpecies(1)
  loading.value = false
})
</script>

<template>
  <AdminGlobalContainer>
    <!-- Loading -->
    <LoadingSpinner v-if="loading" class="my-10" />

    <template v-else>
      <!-- Gráfico -->
      <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center sm:mx-auto sm:w-[90%] sm:flex-col justify-between">
        <ButtonActionAdmin />
        <DataGraph
          title="Espécies"
          :total="speciesStore.count"
          seeMoreUrl="/admin/species"
          :items="speciesWithCategory"
          groupBy="categoryName"
        />
      </div>

      <!-- Filtros -->
      <section>
        <div class="flex flex-col w-[90%] mx-auto">
          <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
          <TableFilterContainer @filter="changeActiveMobile" :items="filters" :amount="filters.length">
            <TableFilterCard
              v-for="(filter, index) in filters"
              :key="index"
              :active="filter.active"
              :filter="filter"
              @change="changeActive(index, filters)"
            />
          </TableFilterContainer>
        </div>

        <!-- Tabela -->
        <section class="mt-10 w-[90%] mx-auto flex flex-col items-center mb-10">
          <ListTableAdmin
            :rows="paginatedSpecies"
            :columns="[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Nome', editable: true },
              { key: 'categoryName', label: 'Categoria', editable: true }
            ]"
            :router="'/admin/species'"
            @update:cell="(e) => console.log('editou', e)"
          />

          <!-- Paginação -->
          <TablePagination
            :currentPage="currentPage"
            :total-pages="totalPages"
            @page-change="(page) => (currentPage = page)"
          />
        </section>
      </section>
    </template>

  </AdminGlobalContainer>
</template>