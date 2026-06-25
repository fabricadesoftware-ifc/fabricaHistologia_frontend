import api from '@/plugins/api'

class AuthService {
  async login(email, password) {
    const { data } = await api.post('/token/', { email, password })
    return data
  }

  async register(email, password) {
    const { data } = await api.post('/users/register/', { email, password })
    return data
  }

  async refreshToken(refresh) {
    const { data } = await api.post('/token/refresh/', { refresh })
    return data
  }

  async getUser() {
    const { data } = await api.get('/users/me/')
    return data
  }

  async getUsers() {
    const { data } = await api.get('/users/')
    return data.results
  }

  async forgetPassword(email) {
    const { data } = await api.post('/users/forget/', { email })
    return data
  }

  async recoverPassword(email, code, password) {
    const { data } = await api.post('/users/recover/', { email, code, password })
    return data
  }
}

export default new AuthService()

