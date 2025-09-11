<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue'
import { useSystemStore } from '@/stores'
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
import { useDebounceFn } from '@vueuse/core'

// Stores
const systemStore = useSystemStore()
const { changeActive, changeActiveMobile } = useAdmin()

// Estados
const loading = ref(true)
const searchLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10
const filters = ref([])
const searchText = ref("")

// Dados formatados
const systemsWithCategory = computed(() =>
  systemStore.systems.map(s => ({
    ...s,
    categoryName: s.category || 'Sem Categoria'
  }))
)

// Carregar dados iniciais
const loadInitialData = async () => {
  try {
    loading.value = true
    await systemStore.getSystems(1)
    const categories = [...new Set(systemStore.systems.map(s => s.category || 'Sem Categoria'))]
    filters.value = [
      { nome: 'Geral', active: true },
      ...categories.map(cat => ({ nome: cat, active: false }))
    ]
  } finally {
    loading.value = false
  }
}

onBeforeMount(loadInitialData)

// Filtro ativo
const activeFilter = computed(() =>
  filters.value.find(f => f.active)?.nome
)

// Lista filtrada
const filteredSystems = computed(() => {
  let data = systemsWithCategory.value
  if (activeFilter.value && activeFilter.value !== 'Geral') {
    data = data.filter(s => s.category === activeFilter.value)
  }
  if (searchText.value) {
    data = data.filter(s => s.name.toLowerCase().includes(searchText.value.toLowerCase()))
  }
  return data
})

// Paginação
const paginatedSystems = computed(() => filteredSystems.value)
const totalPages = computed(() =>
  Math.max(1, Math.ceil((systemStore.count || filteredSystems.value.length) / itemsPerPage))
)

// Atualiza dados ao mudar de página
watch(currentPage, async (newPage) => {
  if (!searchText.value) {
    loading.value = true
    await systemStore.getSystems(newPage)
    loading.value = false
  } else {
    searchLoading.value = true
    await systemStore.getSystemsBySearch(searchText.value)
    searchLoading.value = false
  }
})

// Resetar para página 1 ao mudar filtro
watch(activeFilter, async () => {
  currentPage.value = 1
  if (!searchText.value) {
    loading.value = true
    await systemStore.getSystems(1)
    loading.value = false
  } else {
    searchLoading.value = true
    await systemStore.getSystemsBySearch(searchText.value)
    searchLoading.value = false
  }
})

// Função de search com debounce
const _onSearch = async (text) => {
  searchText.value = text
  currentPage.value = 1
  if (!text) {
    loading.value = true
    await systemStore.getSystems(1)
    loading.value = false
  } else {
    searchLoading.value = true
    await systemStore.getSystemsBySearch(text)
    searchLoading.value = false
  }
}
const onSearch = useDebounceFn(_onSearch, 400)
</script>

<template>
  <AdminGlobalContainer>
    <!-- Loading global -->
    <LoadingSpinner v-if="loading && !searchLoading" class="my-10" />

    <template v-else>
      <!-- Gráfico -->
      <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center sm:flex-col justify-between">
        <ButtonActionAdmin />
        <DataGraph
          title="Sistemas"
          :total="systemStore.count"
          seeMoreUrl="/admin/systems"
          :items="systemsWithCategory"
          groupBy="categoryName"
        />
      </div>

      <!-- Filtros -->
      <section>
        <div class="flex flex-col w-[90%] mx-auto">
          <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
          <TableFilterContainer
            @filter="changeActiveMobile"
            @search-text="onSearch"
            :items="filters"
            :amount="filters.length"
          >
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
          <!-- Loading da busca -->
          <p v-if="searchLoading" class="text-gray-500 mt-6">Buscando...</p>

          <ListTableAdmin
            v-else-if="paginatedSystems.length"
            :rows="paginatedSystems"
            :columns="[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Nome', editable: true },
              { key: 'description', label: 'Descrição', editable: true },
              { key: 'image.url', label: 'Imagem', type: 'image' }
            ]"
            :router="'/admin/systems'"
            @update:cell="(e) => console.log('editou', e)"
          />

          <p v-else class="text-gray-500 mt-6">Nenhum resultado encontrado</p>

          <!-- Paginação -->
          <TablePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="(page) => currentPage = page"
          />
        </section>
      </section>
    </template>
  </AdminGlobalContainer>
</template>
