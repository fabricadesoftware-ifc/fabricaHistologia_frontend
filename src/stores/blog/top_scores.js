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
   * @param {number|null} level - 1=Fácil, 2=Médio, 3=Difícil (usado apenas se type=1)
   * @param {number} type - 1=Geral, 2=Sistema
   */
  async function fetchTopScores(level = null, type = 1) {
    loading.value = true
    try {
      // 🔹 Chamada já adapta conforme o tipo
      const data = await getTopScores.getTopScores(level, type)

      // 🔹 Ranking principal
      topScores.value = (data?.results || []).map((item, index) => ({
        pos: item.pos || index + 1,
        email: item.email || `Usuário ${index + 1}`,
        answer_time: item.answer_time ?? 0,
        correct: item.correct ?? 0,
        score: item.score ?? 0,
      }))

      // 🔹 Posição e dados do usuário autenticado
      if (data?.user_score_data) {
        userScore.value = {
          pos: data.user_score_data.pos,
          email: data.user_score_data.email || "Você",
          answer_time: data.user_score_data.answer_time ?? 0,
          correct: data.user_score_data.correct ?? 0,
          score: data.user_score_data.score ?? 0,
        }
      } else if (data?.user_score) {
        userScore.value = {
          pos: data.user_score,
          email: "Você",
          answer_time: 0,
          correct: 0,
          score: 0,
        }
      } else {
        userScore.value = null
      }

      if (!topScores.value.length) {
        console.log("Nenhum resultado encontrado para este tipo/nível.")
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
