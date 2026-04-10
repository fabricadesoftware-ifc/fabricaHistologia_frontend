import { computed } from 'vue'
import { defineStore } from 'pinia'
import AuthService from '../../services/auth/auth'
import router from '@/router'
import { useStorage } from '@vueuse/core'



export const useAuthStore = defineStore('auth', () => {
  const active = useStorage('auth_state', {
    active: false,
    user: {},
    users: [],
    accessToken: '',
    refreshToken: '',
  })

  const users = computed(() => active.value.users)
  const email = computed(() => (active.value.user ? active.value.user.email : ''))
  const activeUser = computed(() => active.value.active)
  const userInfo = computed(() => active.value.user)

  const syncSessionFlags = () => {
    const verified = !!active.value.user?.is_verified
    sessionStorage.setItem('verified_user', String(verified))
    sessionStorage.setItem('active_user', String(!!active.value.active))
    localStorage.setItem('verified_user', String(verified))
  }

  const setTokens = (access, refresh = '') => {
    if (access) {
      localStorage.setItem('access_token', access)
      active.value.accessToken = access
    }

    if (refresh) {
      localStorage.setItem('refresh_token', refresh)
      active.value.refreshToken = refresh
    }
  }

  const clearTokens = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('verified_user')
    localStorage.removeItem('last_login_email')
    active.value.accessToken = ''
    active.value.refreshToken = ''
  }

  const fetchCurrentUser = async () => {
    const userData = await AuthService.getUser()
    active.value.user = userData || {}
    active.value.active = !!userData
    syncSessionFlags()
    return userData
  }

  const initializeAuth = async () => {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')

    if (!accessToken) {
      active.value.active = false
      active.value.user = {}
      syncSessionFlags()
      return false
    }

    active.value.accessToken = accessToken
    active.value.refreshToken = refreshToken || ''

    try {
      await fetchCurrentUser()
      return true
    } catch (error) {
      clearTokens()
      active.value.active = false
      active.value.user = {}
      syncSessionFlags()
      return false
    }
  }

  const login = async ({ email, password }) => {
    const response = await AuthService.login(email, password)
    setTokens(response.access, response.refresh)

    active.value.user = response.user || {}
    active.value.active = true
    await fetchCurrentUser()
    localStorage.setItem('last_login_email', active.value.user?.email || email)
    syncSessionFlags()

    return active.value.user
  }

  const register = async ({ email, password }) => {
    return AuthService.register(email, password)
  }

  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem('refresh_token') || active.value.refreshToken

    if (!refresh) {
      throw new Error('refresh token not found')
    }

    const response = await AuthService.refreshToken(refresh)
    setTokens(response.access)
    return response.access
  }

  const verifyUser = () => {
    const authToken = localStorage.getItem('access_token')
    active.value.active = !!authToken
    syncSessionFlags()
    return active.value.active
  }

  const getUser = async () => {
    return fetchCurrentUser()
  }

  const getUsers = async () => {
    try {
      const response = await AuthService.getUsers()
      active.value.users = response
      return response
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  const logout = () => {
    active.value.user = {}
    active.value.active = false
    active.value.users = []
    clearTokens()
    syncSessionFlags()
    router.push('/')
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  return {
    email,
    users,
    getUsers,
    getUser,
    verifyUser,
    logout,
    activeUser,
    userInfo,
    initializeAuth,
    login,
    register,
    refreshAccessToken,
  }
})