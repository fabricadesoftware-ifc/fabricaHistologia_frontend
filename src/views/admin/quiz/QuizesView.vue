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
  TablePagination
} from '@/components/index'

import { useAdmin } from '@/stores/admin/filter_admin'

// Stores
const quizStore = useQuizStore()
const systemStore = useSystemStore()
const { changeActive } = useAdmin()

// Estado de carregamento
const loading = ref(true)

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

// Carregar dados iniciais
onBeforeMount(async () => {
  try {
    await quizStore.getQuiz(1)
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
const filteredQuizzes = computed(() => {
  if (!activeFilter.value || activeFilter.value === 'Geral') {
    return quizzesWithLevelName.value
  }
  return quizzesWithLevelName.value.filter(q => q.system?.name === activeFilter.value)
})

// A API já pagina, então a tabela usa diretamente os dados atuais
const paginatedQuizzes = computed(() => filteredQuizzes.value)

// === Cálculo de quantidade de páginas ===
// Segue o padrão de posts: usa o count da store (fallback para length caso não venha)
const totalPages = computed(() => Math.max(1, Math.ceil(quizStore.quizCountState / itemsPerPage)))

// Atualizar dados ao mudar de página
watch(currentPage, async (newPage) => {
  loading.value = true
  await quizStore.getQuiz(newPage)
  loading.value = false
})

// Resetar para página 1 ao mudar filtro
watch(activeFilter, async () => {
  currentPage.value = 1
  loading.value = true
  await quizStore.getQuiz(1)
  loading.value = false
})

watch(totalPages, (val) => console.log('Total Pages:', val))

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
          title="Quizzes"
          :total="totalItems"
          seeMoreUrl="/admin/quiz"
          :items="quizzesWithLevelName"
          groupBy="levelName"
        />
      </div>

      <!-- Filtros -->
      <section>
        <div class="flex flex-col w-[90%] mx-auto">
          <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
          <TableFilterContainer :items="filters" :amount="filters.length">
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
          <!-- Se o seu TablePagination aceitar totalPages diretamente, pode passar também:
          :totalPages="totalPages"
          -->
        </section>
      </section>
    </template>
  </AdminGlobalContainer>
</template>
