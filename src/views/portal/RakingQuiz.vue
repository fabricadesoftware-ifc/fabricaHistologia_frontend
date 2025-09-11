<script setup>
import {
  TablePagination,
  Footer,
  TableRanking,
  ButtonsRanking,
  TitleRanking
} from '@/components/index'
import { ref, onMounted, watch } from 'vue'
import { useQuizStore } from '@/stores/index'

const quizStore = useQuizStore()

// estado local
const currentPage = ref(1)
const totalPages = ref(1)
const selectedDifficulty = ref('Fácil')

// mapeamento string -> valor esperado pelo back
const difficultyMap = {
  'Fácil': 1,
  'Médio': 2,
  'Difícil': 3
}

// busca ranking via store (agora usando getScores)
async function fetchRanking() {
  try {
    await quizStore.getScores({
      level: difficultyMap[selectedDifficulty.value],
      ordering: 'answer_time', // exemplo de ordenação
    })
    totalPages.value = Math.ceil((quizStore.scores.length || 0) / 10) || 1
  } catch (error) {
    console.error("Erro ao buscar ranking:", error)
  }
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
    <TableRanking :data="quizStore.scores.slice((currentPage-1)*10, currentPage*10)" />

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
