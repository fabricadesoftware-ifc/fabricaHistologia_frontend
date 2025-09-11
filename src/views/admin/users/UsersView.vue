<script setup>
import { onBeforeMount, computed, ref, watch } from 'vue'
import {
  AdminGlobalContainer,
  TableFilterContainer,
  TableFilterCard,
  DataGraph,
  ListTableAdmin,
  LoadingSpinner,
  TablePagination,
  ButtonActionAdmin,
} from '@/components/index'

import { useCollaboratorsStore } from '@/stores'

// Stores
const collaboratorsStore = useCollaboratorsStore()

// Estado de carregamento
const loading = ref(true)

// Paginação
const currentPage = ref(1)
const itemsPerPage = 10

// -----------------------
// Filtros locais da página
// -----------------------
const filters = ref([
  { key: 'personal-data', label: 'Dados Pessoais', active: true },
  { key: 'users', label: 'Usuários', active: false },
  { key: 'address', label: 'Endereços', active: false }
])

// Função para trocar filtro ativo
const changeFilter = (index) => {
  filters.value.forEach((f, i) => (f.active = i === index))
  currentPage.value = 1
}

// Filtro ativo
const activeFilter = computed(() => filters.value.find(f => f.active))

// -----------------------
// Carregar dados iniciais
// -----------------------
onBeforeMount(async () => {
  try {
    await Promise.all([
      collaboratorsStore.getCollaborators(),
      collaboratorsStore.getUsers(),
      collaboratorsStore.getAddress()
    ])


  } finally {
    loading.value = false
  }
})

// -----------------------
// Rotas para edição
// -----------------------
const tableRoute = computed(() => {
  switch (activeFilter.value?.key) {
    case 'personal-data':
      return '/admin/personal-data'
    case 'users':
      return '/admin/users'
    case 'address':
      return '/admin/address'
    default:
      return '/'
  }
})

// -----------------------
// Colunas dinâmicas
// -----------------------
const tableColumns = computed(() => {
  switch (activeFilter.value?.key) {
    case 'personal-data':
      return [
        { key: 'id', label: 'ID' },
        { key: 'user', label: 'Usuário', editable: true },
        { key: 'registration', label: 'Matrícula' },
        { key: 'birth_date', label: 'Nascimento' },
        { key: 'phone', label: 'Telefone' },
        { key: 'education_level', label: 'Escolaridade' },
        { key: 'university', label: 'Universidade' },
        { key: 'city', label: 'Cidade' },
        { key: 'state', label: 'Estado' }
      ]
    case 'users':
      return [
        { key: 'id', label: 'ID' },
        { key: 'email', label: 'E-mail', editable: true },
        { key: 'is_verified', label: 'Verificado' },
        { key: 'date_joined', label: 'Data de Criação' }
      ]
    case 'address':
      return [
        { key: 'id', label: 'ID' },
        { key: 'city', label: 'Cidade', editable: true },
        { key: 'state', label: 'Estado', editable: true }
      ]
    default:
      return []
  }
})

// -----------------------
// Dados filtrados
// -----------------------
const filteredData = computed(() => {
  switch (activeFilter.value?.key) {
    case 'personal-data':
      return collaboratorsStore.collaborators.map(collab => {
        const addr = collaboratorsStore.address.find(a => a.id === collab.address)
        return {
          ...collab,
          city: addr?.city || 'N/A',
          state: addr?.state || 'N/A'
        }
      })
    case 'users':
      return collaboratorsStore.users
    case 'address':
      return collaboratorsStore.address
    default:
      return []
  }
})

const paginatedData = computed(() => filteredData.value)

// -----------------------
// Total de páginas
// -----------------------
const totalPages = computed(() => {
  return Math.max(1, Math.ceil((filteredData.value.length || 1) / itemsPerPage))
})

// -----------------------
// Atualização de dados
// -----------------------
watch(currentPage, async (newPage) => {
  const key = activeFilter.value?.key
  if (!key) return

  loading.value = true
  const fetchMethods = {
    'personal-data': () => collaboratorsStore.getCollaborators(newPage),
    'users': () => collaboratorsStore.getUsers(newPage),
    'address': () => collaboratorsStore.getAddress(newPage)
  }
  if (fetchMethods[key]) await fetchMethods[key]()
  loading.value = false
})
</script>

<template>
  <AdminGlobalContainer subtitle="Listagem de dados pessoais, usuários e endereços">
    <LoadingSpinner v-if="loading" class="mt-20" />

    <template v-else>
      <!-- Gráficos -->
<div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center flex-col justify-between">
      <ButtonActionAdmin />

      <div class="flex w-full max-w-[60%] ml-[2%] overflow-auto gap-10 mt-20">
        
        <DataGraph
          class="min-w-[300px]"
          title="Dados Pessoais"
          :total="collaboratorsStore?.collaborators?.length"
          seeMoreUrl="/admin/personal-data"
          :items="collaboratorsStore.collaborators"
          groupBy="education_level"
        />
        <DataGraph
          title="Usuários"
          :total="collaboratorsStore?.users?.length"
          seeMoreUrl="/admin/users"
          :items="collaboratorsStore.users"
          groupBy="is_verified"
        />
        <DataGraph
          title="Endereços"
          :total="collaboratorsStore?.address?.length"
          seeMoreUrl="/admin/address"
          :items="collaboratorsStore.address"
          groupBy="state"
        />
      </div>
      </div>

      <!-- Filtros -->
      <section>
        <div class="flex flex-col w-[90%] mx-auto mt-10">
          <p class="text-xl font-medium mb-10">Filtros</p>
          <TableFilterContainer :amount="filters.length">
            <TableFilterCard
              v-for="(filter, index) in filters"
              :key="filter.key"
              :active="filter.active"
              :filter="{ nome: filter.label }"
              @change="() => changeFilter(index)"
            />
          </TableFilterContainer>
        </div>
      </section>

      <!-- Tabela -->
      <section class="mt-10 w-[90%] mx-auto flex flex-col items-center mb-10">
        <ListTableAdmin
          v-if="paginatedData?.length"
          :rows="paginatedData"
          :columns="tableColumns"
          :router="tableRoute"
          @update:cell="(e) => console.log('editou', e)"
        />

        <TablePagination
          class="mt-6"
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="(page) => (currentPage = page)"
        />
      </section>
    </template>
  </AdminGlobalContainer>
</template>
