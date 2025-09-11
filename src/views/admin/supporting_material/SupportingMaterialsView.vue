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
  TablePagination,
  SucessModalAdmin
} from '@/components/index'

import { useAdmin } from '@/stores/admin/filter_admin'
import { useDebounceFn } from '@vueuse/core'

// Stores
const supportingStore = useSupportingStore()
const { changeActive, changeActiveMobile } = useAdmin()

// Estados
const loading = ref(true)
const searchLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10
const filters = ref([])
const searchText = ref("")
const error = ref(null)
const showErrorModal = ref(false)
const closeErrorModal = () => { showErrorModal.value = false }

// Dados tratados para incluir nome do sistema
const materialsWithSystem = computed(() =>
  supportingStore.materials.map(material => ({
    ...material,
    systemName: material.system?.name || 'Sem Sistema'
  }))
)

// Filtro ativo
const activeFilter = computed(() =>
  filters.value.find(f => f.active)?.nome
)

// Dados filtrados
const filteredMaterials = computed(() => {
  let data = materialsWithSystem.value
  if (activeFilter.value && activeFilter.value !== 'Geral') {
    data = data.filter(m => m.systemName === activeFilter.value)
  }
  if (searchText.value) {
    data = data.filter(m =>
      m.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
      (m.description?.toLowerCase().includes(searchText.value.toLowerCase()))
    )
  }
  return data
})

// Paginação
const paginatedMaterials = computed(() => filteredMaterials.value)
const totalPages = computed(() =>
  Math.max(1, Math.ceil((supportingStore.count || filteredMaterials.value.length) / itemsPerPage))
)

// Função para carregar materiais
const loadMaterials = async (page = 1, search = "") => {
  try {
    if (search) searchLoading.value = true
    else loading.value = true

    if (search === "") {
    await supportingStore.getMaterials(page, search)
    } else {
    await supportingStore.getMaterialsBySearch(search)

    }
    console.log('Materiais carregados:', supportingStore.materials)
    // Atualiza filtros
    const systems = [...new Set(supportingStore.materials.map(m => m.system?.name || 'Sem Sistema'))]
    filters.value = [
      { nome: 'Geral', active: true },
      ...systems.map(sys => ({ nome: sys, active: false }))
    ]
  } catch (err) {
    console.error('Erro ao carregar materiais:', err)
    error.value = err?.message || 'Erro inesperado ao carregar materiais.'
    showErrorModal.value = true
  } finally {
    loading.value = false
    searchLoading.value = false
  }
}

// Carrega dados iniciais
onBeforeMount(() => loadMaterials(1))

// Watchers
watch(currentPage, (newPage) => loadMaterials(newPage, searchText.value))
watch(activeFilter, () => {
  currentPage.value = 1
  loadMaterials(1, searchText.value)
})

// Função de busca com debounce
const _onSearch = async (text) => {
  searchText.value = text
  currentPage.value = 1
  await loadMaterials('', text) // busca a página 1 com filtro
}
const onSearch = useDebounceFn(_onSearch, 400)
</script>

<template>
  <AdminGlobalContainer>
    <LoadingSpinner v-if="loading && !searchLoading" class="my-10" />

    <template v-else>
      <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center sm:flex-col sm:mx-auto sm:w-[90%] justify-between">
        <ButtonActionAdmin />
        <DataGraph
          title="Materiais de Apoio"
          :total="supportingStore.count"
          seeMoreUrl="/admin/supporting-materials"
          :items="materialsWithSystem"
          groupBy="systemName"
        />
      </div>

      <section>
        <div class="flex flex-col w-[90%] mx-auto sm:mt-24">
          <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
          <TableFilterContainer @filter="changeActiveMobile" @search-text="onSearch" :items="filters" :amount="filters.length">
            <TableFilterCard
              v-for="(filter, index) in filters"
              :key="index"
              :active="filter.active"
              :filter="filter"
              @change="changeActive(index, filters)"
            />
          </TableFilterContainer>
        </div>

        <section class="mt-10 w-[90%] mx-auto flex flex-col items-center mb-10">
          <p v-if="searchLoading" class="text-gray-500 mt-6">Buscando...</p>

          <ListTableAdmin
            v-else-if="paginatedMaterials.length"
            :rows="paginatedMaterials"
            :columns="[
              { key: 'name', label: 'Nome', editable: true },
              { key: 'description', label: 'Descrição', editable: true },
              { key: 'systemName', label: 'Sistema', editable: false }
            ]"
            router="/admin/supporting"
            @update:cell="(e) => console.log('editou', e)"
          />

          <p v-else class="text-gray-500 mt-6">Nenhum resultado encontrado</p>

          <TablePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="(page) => (currentPage = page)"
          />
        </section>
      </section>
    </template>

    <SucessModalAdmin
      :show="showErrorModal"
      subtitle="Erro!"
      :title="error"
      message="Não foi possível carregar os materiais. Tente novamente."
      confirm-label="Fechar"
      :cancel-label="null"
      confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
      @confirm="closeErrorModal"
    />
  </AdminGlobalContainer>
</template>
