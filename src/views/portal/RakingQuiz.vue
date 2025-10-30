<script setup>
import { ref, onMounted, watch } from "vue"
import { useScoreStore } from "@/stores/index"
import { ButtonsRanking, TableRanking, TitleRanking, Footer } from "@/components/index"

const scoreStore = useScoreStore()
const selectedDifficulty = ref("Fácil")
const difficultyMap = { "Fácil": 1, "Médio": 2, "Difícil": 3 }

const fetchRanking = async () => {
  const level = difficultyMap[selectedDifficulty.value]
  await scoreStore.fetchTopScores(level, 1)
}

watch(selectedDifficulty, fetchRanking)
onMounted(fetchRanking)
</script>

<template>
  <div class="w-[50%] flex flex-col gap-2 items-center justify-center h-[100%] mx-auto">
    <TitleRanking title="Ranking de Conhecimentos Gerais" />
<ButtonsRanking mode="geral" v-model="selectedDifficulty" />


    <TableRanking :data="scoreStore.topScores" :userPosition="scoreStore.userScore" />
    <Footer />
  </div>
</template>
