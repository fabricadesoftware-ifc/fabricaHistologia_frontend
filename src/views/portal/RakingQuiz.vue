<script setup>
import { ref, onMounted, watch, computed } from "vue"
import { useScoreStore } from "@/stores/index"
import { ButtonsRanking, TableRanking, TitleRanking, Footer } from "@/components/index"

// Props
const props = defineProps({
  label: {
    type: String,
    default: "geral", // ou "especifico"
  },
  title: {
    type: String,
    default: "Ranking de Conhecimentos Gerais",
  },
  id: { type: Number, default: null } 
})

// Store
const scoreStore = useScoreStore()

// Define type baseado no label
const type = computed(() => (props.label === "especifico" ? 2 : 1))

// Controle de nível (apenas no modo geral)
const selectedDifficulty = ref("Fácil")
const difficultyMap = { "Fácil": 1, "Médio": 2, "Difícil": 3 }

// Busca dados do ranking
const fetchRanking = async () => {
  const level = type.value === 1 ? difficultyMap[selectedDifficulty.value] : null
  await scoreStore.fetchTopScores(level, type.value, props.id)
}


// Observa mudanças de nível (somente geral)
watch(selectedDifficulty, fetchRanking)

// Inicializa
onMounted(fetchRanking)
</script>

<template>
  <div class="w-[50%] flex flex-col gap-4 items-center justify-center h-full mx-auto">
    <!-- 🔹 Título dinâmico -->
    <TitleRanking
      :title="title"
    />

    <!-- 🔹 Botões de dificuldade (apenas no modo geral) -->
    <ButtonsRanking
      :mode="props.label"
      v-model="selectedDifficulty"
    />

    <!-- 🔹 Tabela -->
    <TableRanking
      :data="scoreStore.topScores"
      :userPosition="scoreStore.userScore"
    />

    <Footer />
  </div>
</template>
