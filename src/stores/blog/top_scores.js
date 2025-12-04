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
   * @param {number|null} level - Usado apenas se type=1
   * @param {number} type - 1=Geral, 2=Sistema
   * @param {number|null} systemId - Apenas para type=2
   */
  async function fetchTopScores(level = null, type = 1, systemId = null) {
    loading.value = true
    try {
      // 🔥 Envia systemId para o service corretamente
      const data = await getTopScores.getTopScores(level, type, systemId)

      // Lista de ranking
      topScores.value = (data?.results || []).map((item, index) => ({
        pos: item.pos || index + 1,
        email: item.email || `Usuário ${index + 1}`,
        answer_time: item.answer_time ?? 0,
        correct: item.correct ?? 0,
        score: item.score ?? 0,
      }))

      // Dados do usuário autenticado
      if (data?.user_score_data) {
        userScore.value = {
          pos: data.user_score_data.pos,
          email: data.user_score_data.email || "Você",
          answer_time: data.user_score_data.answer_time ?? 0,
          correct: data.user_score_data.correct ?? 0,
          score: data.user_score_data.score ?? 0,
        }
      } else {
        userScore.value = null
      }

      if (!topScores.value.length) {
        console.log("Nenhum resultado encontrado para este tipo/nível/sistema.")
      }
    } catch (err) {
      console.error("[ScoreStore] Erro ao buscar ranking:", err)
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
