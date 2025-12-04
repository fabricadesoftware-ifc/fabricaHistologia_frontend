import api from "@/plugins/api"

async function getTopScores(level, type, systemId = null) {
  try {
    const token = localStorage.getItem("psg_auth_token")

    // 🔥 converte para número sempre
    const t = Number(type)

    let url = `/top-scores/ranking/?type=${t}`

    // ⭐ Geral
    if (t === 1 && level) {
      url += `&level=${level}`
    }

    // ⭐ Específico
    if (t === 2 && systemId) {
      url += `&system=${systemId}`
    }

    const response = await api.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default {
  getTopScores,
}
