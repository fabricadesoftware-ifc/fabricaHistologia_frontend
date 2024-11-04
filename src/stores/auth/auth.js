import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import AuthService from '../../services/auth/auth';
import router from '@/router';
import { useStorage } from '@vueuse/core';



export const useAuthStore = defineStore('auth', () => {
  const active = useStorage('activated', {
    active: false
  })
  const user = reactive({});
  
  const verifyUser = () => {
    const authToken = localStorage.getItem('psg_auth_token');
    if (authToken) {
      active.value.active = true
      return true
    } else {
      active.value.active = false
      return false
    }
  }

  const getUser = async () => {
    const authToken = localStorage.getItem('psg_auth_token');
    console.log(authToken)
    const userData = await AuthService.getUser(authToken);
    console.log(userData)
    user.value = userData
    user.value ? active.value.active = true : active.value.active = false
  }

  const email = computed(() => user.value ? user.value.email : '')

  const activeUser = computed(() => active.value.active )

  const userInfo = computed(()=> user)

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
    user.value = {};
    localStorage.removeItem('psg_auth_token')
    router.push('/')
    active.value.active = false
  }

  return { user, email, getUser, verifyUser, logout, activeUser, userInfo };
});