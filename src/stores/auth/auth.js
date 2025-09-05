import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import AuthService from '../../services/auth/auth';
import router from '@/router';
import { useStorage } from '@vueuse/core';



export const useAuthStore = defineStore('auth', () => {
  const active = useStorage('activated', {
    active: false,
    user: {},
    users: [],
  })

  const users = computed(()=> active.value.users)
  
  
  const verifyUser = () => {
    const authToken = localStorage.getItem('psg_auth_token');
    if (active.value.user.is_verified) {
      sessionStorage.setItem('verified_user', true)
    } else {
      sessionStorage.setItem('verified_user', false)
    }
    if (authToken) {
      active.value.active = true
      sessionStorage.setItem('active_user', true)
      return true
    } else {
      active.value.active = false
      sessionStorage.setItem('active_user', false)
      return false
    }
  }

  const getUser = async () => {
    const authToken = localStorage.getItem('psg_auth_token');
  
    const userData = await AuthService.getUser(authToken);
  
    active.value.user = userData
    active.value.user ? active.value.active = true : active.value.active = false
  }

  const getUsers = async () => {
    try {
      const response = await AuthService.getUsers();
      active.value.users = response
      return response
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error;
    }
  }

  const email = computed(() => active.value.user ? active.value.user.email : '')

  const activeUser = computed(() => active.value.active )

  const userInfo = computed(()=> active.value.user)

  // const token = localStorage.getItem('psg_auth_token')

  // const verifyTokenExpires = computed(()=> {
  //   if (!token) {
  //     active.value.active = false
  //     console.log('was false', token)
  //   } else {
  //     active.value = true
  //     console.log('was true', token)
  //   }
    
  // })

  const logout = () => {
    active.value.user = {};
    localStorage.removeItem('psg_auth_token')
    localStorage.removeItem('psg_last_login')
    router.push('/')
    active.value.active = false
    setTimeout(()=>{
      window.location.reload()
    },800)
  }

  return { email, users, getUsers, getUser, verifyUser, logout, activeUser, userInfo };
});