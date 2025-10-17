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

// dificuldade selecionada
const selectedDifficulty = ref('Fácil')

// mapeamento de dificuldade -> backend
const difficultyMap = {
  'Fácil': 1,
  'Médio': 2,
  'Difícil': 3
}

// busca ranking via store
async function fetchRanking() {
  try {
    await quizStore.getScores({
      level: difficultyMap[selectedDifficulty.value],
      ordering: 'answer_time'
    })
  } catch (error) {
    console.error("Erro ao buscar ranking:", error)
  }
}

onMounted(fetchRanking)
watch([selectedDifficulty], fetchRanking)

// 🔹 Dados de ranking de exemplo (mock)
const ranking = [
  { pos: 1, name: 'Henrique', time: 42, correct: 10 },
  { pos: 2, name: 'Lucas', time: 48, correct: 9 },
  { pos: 3, name: 'Marina', time: 51, correct: 8 },
  { pos: 4, name: 'Beatriz', time: 55, correct: 7 },
  { pos: 5, name: 'Rafael', time: 60, correct: 7 },
  { pos: 6, name: 'Gabriel', time: 63, correct: 6 },
  { pos: 7, name: 'João', time: 70, correct: 6 },
  { pos: 8, name: 'Lívia', time: 74, correct: 5 },
  { pos: 9, name: 'Eduarda', time: 79, correct: 4 },
  { pos: 10, name: 'Pedro', time: 85, correct: 3 }
]

const userPosition = ref({
  pos: 27,
  name: 'Davi',
  time: 102,
  correct: 6
})

</script>

<template>
  <div class="w-[50%] flex flex-col gap-2 items-center justify-center h-[100%] mx-auto">
    <TitleRanking title="Ranking de Conhecimentos Gerais" />

    <!-- Botões de filtro -->
    <ButtonsRanking @difficulty-change="(val) => selectedDifficulty = val" />

    <!-- Tabela de ranking -->
    <TableRanking :data="ranking" :userPosition="userPosition" />

    <Footer />
  </div>
</template>
