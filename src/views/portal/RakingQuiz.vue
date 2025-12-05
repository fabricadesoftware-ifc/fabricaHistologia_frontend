<script setup>
import { ref, onMounted, watch, computed } from "vue"
import { useScoreStore } from "@/stores/blog/top_scores"
import { ButtonsRanking, TableRanking, TitleRanking, Footer, BackButton } from "@/components/index"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

// Props
const props = defineProps({
  label: { type: String, default: "geral" },
  title: { type: String, default: "Ranking de Conhecimentos Gerais" }
})

// Store
const scoreStore = useScoreStore()

// Lista de sistemas → puxada direto do store
const listaDeSistemas = computed(() => scoreStore.systems)

// Tipo do ranking
const type = computed(() => (props.label === "especifico" ? 2 : 1))

// Dificuldade
const selectedDifficulty = ref("Fácil")
const difficultyMap = { "Fácil": 1, "Médio": 2, "Difícil": 3 }

// 🔥 Busca o ranking
const fetchRanking = async () => {
  const level = type.value === 1 ? difficultyMap[selectedDifficulty.value] : null
  const id = type.value === 2 ? Number(route.params.id) : null

  await scoreStore.fetchTopScores(level, type.value, id)
}

// Watchers
watch(selectedDifficulty, fetchRanking)
watch(() => route.params.id, fetchRanking)
watch(type, fetchRanking)

// inicialização
onMounted(async () => {
  await scoreStore.fetchSystems()
  await fetchRanking()
})
</script>

<template>
  <BackButton class=" left-40 top-14 sm:left-12 sm:top-8" />
  <div
    class="w-[50%] relative mx-auto flex flex-col items-center gap-4"
    style="min-height: 100vh;"
  >
    <TitleRanking :title="title" />

    <!-- Botões -->
    <ButtonsRanking
      :mode="props.label"
      :modelValue="selectedDifficulty"
      :systems="listaDeSistemas"
      @update:modelValue="val => selectedDifficulty = val"
      @search-select="id => router.push(`/portal/quiz/ranking/${id}`)"
    />

    <!-- Conteúdo -->
    <div class="flex flex-col items-center justify-start w-full mt-4 flex-1">

      <div v-if="scoreStore.loading" class="flex items-center justify-center py-10">
        <svg class="animate-spin h-12 w-auto text-blue-500"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
      </div>

      <p v-else-if="!scoreStore.topScores.length"
         class="text-gray-500 text-center text-lg py-6">
        Nenhum ranking encontrado.
      </p>

      <TableRanking
        v-else
        :data="scoreStore.topScores"
        :userPosition="scoreStore.userScore"
      />
    </div>

    <div class="absolute bottom-0 left-1/2 -translate-x-1/2">
      <Footer />
    </div>
  </div>
</template>
