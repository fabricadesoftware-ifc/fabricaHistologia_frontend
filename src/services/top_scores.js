// 📁 src/api/scoreService.js
import api from "@/plugins/api"

async function getTopScores(level, type) {
  try {
    const token = localStorage.getItem("psg_auth_token")

    // 🔹 Monta a URL conforme o tipo
    let url = `/top-scores/ranking/?type=${type}`
    if (String(type) === "1" && level) {
      url += `&level=${level}`
    }

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error("[ScoreService] Erro em getTopScores:", error)
    throw error
  }
}

export default {
  getTopScores,
}
