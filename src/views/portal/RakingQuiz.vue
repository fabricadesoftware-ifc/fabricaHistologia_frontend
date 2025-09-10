<script setup>
import {
  TablePagination,
  Footer,
  TableRanking,
  ButtonsRanking,
  TitleRanking
} from '@/components/index'
import { ref, onMounted, watch } from 'vue'
import { useQuizStore } from '@/stores/index' // seu index de stores já exporta useQuizStore

const quizStore = useQuizStore()

// estado local
const currentPage = ref(1)
const totalPages = ref(1)
const selectedDifficulty = ref('Fácil')

// mapeamento string -> valor do back
const difficultyMap = {
  'Fácil': 1,
  'Médio': 2,
  'Difícil': 3
}

// busca ranking via store
async function fetchRanking() {
  await quizStore.getRanking(difficultyMap[selectedDifficulty.value])
  totalPages.value = Math.ceil((quizStore.ranking.length || 0) / 10) || 1
}

// troca de página
function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// reatividade
onMounted(fetchRanking)
watch([selectedDifficulty], fetchRanking)
</script>

<template>
  <div class="w-[50%] flex flex-col gap-2 items-center justify-center h-[100%] mx-auto">
    <TitleRanking title="Ranking de Conhecimentos Gerais" />

    <!-- Botões de filtro -->
    <ButtonsRanking @difficulty-change="(val) => selectedDifficulty = val" />

    <!-- Tabela com ranking -->
<TableRanking :data="quizStore.ranking.slice((currentPage-1)*10, currentPage*10)" />


    <!-- Paginação -->
    <TablePagination
      class="custom-pagination mt-6"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="changePage"
    />

    <Footer />
  </div>
</template>
