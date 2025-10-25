// 📁 src/api/scoreService.js
import api from "@/plugins/api"

async function getTopScores(level, type) {
  try {
    const token = localStorage.getItem("psg_auth_token")
    const response = await api.get(
      `/top-scores/ranking/?level=${level}&type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("[ScoreService] Erro em getTopScores:", error)
    throw error
  }
}

export default {
  getTopScores,
}
