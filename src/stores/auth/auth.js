import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import AuthService from '../../services/auth/auth';

const authService = new AuthService();

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({
    id: null,
    password: null,
    last_login: null,
    is_superuser: null,
    first_name: null,
    last_name: null,
    is_staff: null,
    is_active: null,
    date_joined: null,
    email: null,
    passage_id: null,
    verification_token: null,
    is_verified: null,
    groups: null, 
    user_permissions: null 
  });
  
  const email = computed(() => user.value.email)

  const getUser = async () => {
    const authToken = localStorage.getItem('psg_auth_token');
    const userData = await authService.getUser(authToken);
    console.log(userData)
    user.value = userData
  }

  const logout = () => {
    user.value = {};
  }

  return { user, email, getUser, logout };
});