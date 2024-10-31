import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import AuthService from '../../services/auth/auth';
import router from '@/router';
import { useStorage } from '@vueuse/core';

const authService = new AuthService();

export const useAuthStore = defineStore('auth', () => {
  const active = useStorage('active', {
    active: false
  })
  const user = reactive({});
  
  const getUser = async () => {
    const authToken = localStorage.getItem('psg_auth_token');
    const userData = await authService.getUser(authToken);
    user.value = userData
    user.value ? active.value.active = true : ''
  }

  const email = computed(() => user.value ? user.value.email : '')

  const activeUser = computed(() => active.value.active )

  const logout = () => {
    user.value = {};
    localStorage.removeItem('psg_auth_token')
    router.push('/')
    active.value.active = false
  }

  return { user, email, getUser, logout, activeUser };
});