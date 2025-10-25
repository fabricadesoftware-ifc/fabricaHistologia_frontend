// 📁 src/stores/score.js
import { ref } from "vue"
import { defineStore } from "pinia"
import getTopScores from "@/services/top_scores"

export const useScoreStore = defineStore("score", () => {
  const topScores = ref([])
  const userScore = ref(null)
  const loading = ref(false)

  /**
   * Busca o ranking e posição do usuário
   * @param {number} level - 1=Fácil, 2=Médio, 3=Difícil
   * @param {number} type - 1=Geral, 2=Sistema
   */
  async function fetchTopScores(level, type = 1) {
    loading.value = true
    try {
      const data = await getTopScores.getTopScores(level, type)

      // padroniza nomes para consistência
      topScores.value = data?.top_scores || data?.top10 || []
      userScore.value = data?.user_score || data?.user_rank || null

      // opcional: feedback de sucesso
      if (!topScores.value.length) {
        console.log("Nenhum resultado encontrado para este nível.")
      }
    } catch (error) {
      console.error("[ScoreStore] Erro ao buscar ranking:", error)
    } finally {
      loading.value = false
    }
  }

  return {
    topScores,
    userScore,
    loading,
    fetchTopScores,
  }
})
