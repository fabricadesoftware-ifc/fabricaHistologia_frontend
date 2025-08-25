<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue'
import { useSupportingStore } from '@/stores'
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
const supportingStore = useSupportingStore()
const { changeActive } = useAdmin()

// Estado de carregamento
const loading = ref(true)

// Controle de paginação
const currentPage = ref(1)
const itemsPerPage = 10

// Filtros dinâmicos
const filters = ref([])

// Dados tratados para incluir nome do sistema
const materialsWithSystem = computed(() =>
  supportingStore.materials.map(material => ({
    ...material,
    systemName: material.system?.name || 'Sem Sistema'
  }))
)

// Carrega dados iniciais
onBeforeMount(async () => {
  try {
    await supportingStore.getMaterials(1)
    const systems = [...new Set(supportingStore.materials.map(m => m.system?.name || 'Sem Sistema'))]
    filters.value = [
      { nome: 'Geral', active: true },
      ...systems.map(sys => ({
        nome: sys,
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

// Dados filtrados
const filteredMaterials = computed(() => {
  if (!activeFilter.value || activeFilter.value === 'Geral') {
    return materialsWithSystem.value
  }
  return materialsWithSystem.value.filter(material => material.systemName === activeFilter.value)
})

// Paginação (API já paginada)
const paginatedMaterials = computed(() => filteredMaterials.value)

// Total de páginas
const totalPages = computed(() =>
  Math.max(1, Math.ceil((supportingStore.count || filteredMaterials.value.length) / itemsPerPage))
)

// Atualiza ao mudar de página
watch(currentPage, async (newPage) => {
  loading.value = true
  await supportingStore.getMaterials(newPage)
  loading.value = false
})

// Reset página ao trocar filtro
watch(activeFilter, async () => {
  currentPage.value = 1
  loading.value = true
  await supportingStore.getMaterials(1)
  loading.value = false
})
</script>

<template>
  <AdminGlobalContainer>
    <!-- Loading -->
    <LoadingSpinner v-if="loading" class="my-10" />

    <template v-else>
      <!-- Gráfico -->
      <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center justify-between">
        <ButtonActionAdmin />
        <DataGraph
          title="Materiais de Apoio"
          :total="supportingStore.count"
          seeMoreUrl="/admin/supporting-materials"
          :items="materialsWithSystem"
          groupBy="systemName"
        />
      </div>

      <!-- Filtros -->
      <section>
        <div class="flex flex-col w-[90%] mx-auto">
          <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
          <TableFilterContainer :items="filters" :amount="filters.length">
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
            :rows="paginatedMaterials"
            :columns="[
              { key: 'name', label: 'Nome', editable: true },
              { key: 'description', label: 'Descrição', editable: true },
              { key: 'systemName', label: 'Sistema', editable: false }
            ]"
            router="/admin/supporting"
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
