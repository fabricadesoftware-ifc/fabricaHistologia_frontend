<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue'
import { useCollaboratorsStore } from '@/stores'
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
const collaboratorsStore = useCollaboratorsStore()
const { changeActive } = useAdmin()

// Loading
const loading = ref(true)

// Paginação
const currentPage = ref(1)
const itemsPerPage = 10

// Filtros dinâmicos por prioridade
const filters = ref([])

// Dados formatados para exibir na tabela
const collaboratorsWithRelations = computed(() =>
  collaboratorsStore.collaborators.map((collab) => ({
    id: collab.id,
    email: collab.user || 'Sem Email',
    name: collab.personal_data?.name || 'Sem Nome',
    phone: collab.personal_data?.phone || 'N/A',
    city: collab.personal_data?.address?.city || 'Sem Cidade',
    state: collab.personal_data?.address?.state || 'Sem Estado',
    priority: collab.priority || 'Sem Prioridade',
  }))
)

// Carregar dados iniciais
onBeforeMount(async () => {
  try {
    await collaboratorsStore.getCollaborators()

    const priorities = [
      ...new Set(collaboratorsStore.collaborators.map(c => c.priority || 'Sem Prioridade')),
    ]

    filters.value = [
      { nome: 'Todos', active: true },
      ...priorities.map((priority) => ({
        nome: priority,
        active: false,
      })),
    ]
  } finally {
    loading.value = false
  }
})

// Filtro ativo
const activeFilter = computed(() => filters.value.find(f => f.active)?.nome)

// Lista filtrada
const filteredCollaborators = computed(() => {
  if (!activeFilter.value || activeFilter.value === 'Todos') {
    return collaboratorsWithRelations.value
  }
  return collaboratorsWithRelations.value.filter(
    (collab) => collab.priority === activeFilter.value
  )
})

// Paginação
const paginatedCollaborators = computed(() => filteredCollaborators.value)

// Total de páginas
const totalPages = computed(() =>
  Math.max(
    1,
    Math.ceil(
      (collaboratorsStore.collaboratorsCount || filteredCollaborators.value.length) /
        itemsPerPage
    )
  )
)

// Atualiza dados ao mudar página
watch(currentPage, async (newPage) => {
  loading.value = true
  await collaboratorsStore.getCollaborators(newPage)
  loading.value = false
})

// Resetar página ao mudar filtro
watch(activeFilter, async () => {
  currentPage.value = 1
  loading.value = true
  await collaboratorsStore.getCollaborators(1)
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
        <ButtonActionAdmin  />
        <DataGraph
          title="Colaboradores"
          :total="collaboratorsStore.collaboratorsCount"
          seeMoreUrl="/admin/collaborators"
          :items="collaboratorsWithRelations"
          groupBy="priority"
        />
      </div>

      <!-- Filtros -->
      <section>
        <div class="flex flex-col w-[90%] mx-auto">
          <p class="text-xl font-medium mb-10">Filtrar por Prioridade</p>
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
            :rows="paginatedCollaborators"
            :columns="[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Nome' },
              { key: 'email', label: 'E-mail' },
              { key: 'phone', label: 'Telefone' },
              { key: 'city', label: 'Cidade' },
              { key: 'state', label: 'Estado' },
              { key: 'priority', label: 'Prioridade' },
            ]"
            :router="'/admin/collaborators'"
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
