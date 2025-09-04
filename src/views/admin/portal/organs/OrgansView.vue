<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue'
import { useOrganStore, useSystemStore } from '@/stores'
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
const organStore = useOrganStore()
const systemStore = useSystemStore()
const { changeActive, changeActiveMobile } = useAdmin()

// Estados
const loading = ref(true)         // carregamento global
const searchLoading = ref(false)  // carregamento do search
const currentPage = ref(1)
const itemsPerPage = 10
const filters = ref([])
const searchText = ref('')

// Dados formatados
const organsWithSystem = computed(() =>
  organStore.organs.map(org => ({
    ...org,
    systemName: org.system?.name || 'Sem Sistema'
  }))
)

// Carregar dados iniciais
onBeforeMount(async () => {
  try {
    await organStore.getOrgans(1)
    await systemStore.getSystems()
    filters.value = [
      { nome: 'Geral', active: true },
      ...systemStore.systems.map(item => ({
        nome: item.name,
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

// Filtrados
const filteredOrgans = computed(() => {
  if (!activeFilter.value || activeFilter.value === 'Geral') {
    return organsWithSystem.value
  }
  return organsWithSystem.value.filter(org => org.system?.name === activeFilter.value)
})

// Paginação
const paginatedOrgans = computed(() => filteredOrgans.value)
const totalPages = computed(() =>
  Math.max(1, Math.ceil((organStore.count || filteredOrgans.value.length) / itemsPerPage))
)

// Atualiza dados ao mudar de página
watch(currentPage, async (newPage) => {
  loading.value = true
  if (!searchText.value) {
    await organStore.getOrgans(newPage)
  } else {
    await organStore.getOrgansBySearch(searchText.value)
  }
  loading.value = false
})

// Reset para página 1 ao mudar filtro
watch(activeFilter, async () => {
  currentPage.value = 1
  if (!searchText.value) {
    loading.value = true
    await organStore.getOrgans(1)
    loading.value = false
  } else {
    searchLoading.value = true
    await organStore.getOrgansBySearch(searchText.value)
    searchLoading.value = false
  }
})

// Função de search com debounce
const _onSearch = async (text) => {
  searchText.value = text
  currentPage.value = 1
  if (!text) {
    loading.value = true
    await organStore.getOrgans(1)
    loading.value = false
  } else {
    searchLoading.value = true
    await organStore.getOrgansBySearch(text)
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
      <div class="flex gap-5 mr-[5%] mt-10 mb-10 sm:mx-auto sm:w-[90%] h-56 items-center sm:flex-col justify-between">
        <ButtonActionAdmin />
        <DataGraph
          title="Órgãos"
          :total="organStore.count"
          seeMoreUrl="/admin/organs"
          :items="organsWithSystem"
          groupBy="systemName"
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
              v-for="(i, index) in filters"
              :key="index"
              :active="i.active"
              :filter="i"
              @change="changeActive(index, filters)"
            />
          </TableFilterContainer>
        </div>

        <!-- Tabela -->
        <section class="mt-10 w-[90%] mx-auto flex flex-col items-center mb-10">
          <!-- Loading de busca -->
          <p v-if="searchLoading" class="text-gray-500 mt-6">Buscando...</p>

          <ListTableAdmin
            v-else-if="paginatedOrgans.length"
            :rows="paginatedOrgans"
            :columns="[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Nome', editable: true },
              { key: 'systemName', label: 'Sistema', editable: true },
              { key: 'image.url', label: 'Imagem', type: 'image' }
            ]"
            :router="'/admin/organs'"
            @update:cell="(e) => console.log('editou', e)"
          />

          <p v-else class="text-gray-500 mt-6">Nenhum resultado encontrado</p>

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
