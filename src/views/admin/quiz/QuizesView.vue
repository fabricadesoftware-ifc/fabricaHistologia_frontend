<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue'
import { useQuizStore, useSystemStore } from '@/stores'
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

// Stores
const quizStore = useQuizStore()
const systemStore = useSystemStore()
const { changeActive, changeActiveMobile } = useAdmin()

// Estado de carregamento
const loading = ref(true)

// Tratamento de erro
const showErrorModal = ref(false)
const errorMessage = ref('')
const closeErrorModal = () => { showErrorModal.value = false }

// Paginação
const currentPage = ref(1)
const itemsPerPage = 10

// Filtros
const filters = ref([])

// Mapa de níveis
const levelMap = {
  1: 'Fácil',
  2: 'Médio',
  3: 'Difícil',
}

// Dados formatados
const quizzesWithLevelName = computed(() =>
  quizStore.quiz.map(q => ({
    ...q,
    levelName: levelMap[q.level] || `Nível ${q.level}`
  }))
)

// Função para buscar quizzes com tratamento de erro
const fetchQuizzes = async (page = 1) => {
  loading.value = true
  try {
    await quizStore.getQuiz(page)
  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => (Array.isArray(v) ? v.join(', ') : v))
        .join('\n')
    } else {
      errorMessage.value = err?.message || 'Erro inesperado ao carregar quizzes.'
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

// Carregar dados iniciais
onBeforeMount(async () => {
  try {
    await fetchQuizzes(1)
    await systemStore.getAllSystems()
    filters.value = [
      { nome: 'Geral', active: true },
      ...systemStore.systems.map(item => ({
        nome: item.name,
        active: false
      }))
    ]
  } catch (err) {
    errorMessage.value = 'Erro ao carregar sistemas.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

// Filtro ativo
const activeFilter = computed(() =>
  filters.value.find(f => f.active)?.nome
)

// Filtrados
const filteredQuizzes = computed(() => {
  if (!activeFilter.value || activeFilter.value === 'Geral') {
    return quizzesWithLevelName.value
  }
  return quizzesWithLevelName.value.filter(q => q.system?.name === activeFilter.value)
})

// Dados paginados
const paginatedQuizzes = computed(() => filteredQuizzes.value)

// Total de páginas
const totalPages = computed(() =>
  Math.max(1, Math.ceil(quizStore.quizCountState / itemsPerPage))
)

// Watchers para paginação e filtro
watch(currentPage, async (newPage) => {
  await fetchQuizzes(newPage)
})

watch(activeFilter, async () => {
  currentPage.value = 1
  await fetchQuizzes(1)
})
</script>

<template>
  <AdminGlobalContainer>
    <!-- Loading -->
    <LoadingSpinner v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50" />

    <template v-else>
      <!-- Gráfico -->
      <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center sm:mx-auto sm:w-[90%] sm:flex-col justify-between">
        <ButtonActionAdmin />
        <DataGraph
          title="Quizzes"
          :total="quizStore.quizCountState"
          seeMoreUrl="/admin/quiz"
          :items="quizzesWithLevelName"
          groupBy="levelName"
        />
      </div>

      <!-- Filtros -->
      <section>
        <div class="flex flex-col w-[90%] mx-auto">
          <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
          <TableFilterContainer @filter="changeActiveMobile" :items="filters" :amount="filters.length">
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
          <ListTableAdmin
            :rows="paginatedQuizzes"
            :columns="[
              { key: 'id', label: 'ID' },
              { key: 'question', label: 'Pergunta', editable: true },
              { key: 'system.name', label: 'Sistema', editable: true },
              { key: 'levelName', label: 'Nível' }
            ]"
            :router="'/admin/quiz'"
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

    <!-- Modal de erro -->
    <SucessModalAdmin
      :show="showErrorModal"
      subtitle="Erro!"
      :title="errorMessage"
      message="Tente novamente ou contate o suporte."
      confirm-label="Fechar"
      :cancel-label="null"
      confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
      @confirm="closeErrorModal"
    />
  </AdminGlobalContainer>
</template>
