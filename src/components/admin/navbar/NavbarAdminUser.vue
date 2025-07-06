<script setup>
import { useNavBarAdminStore } from '@/stores/admin/navbar_admin'
import { useAuthStore } from '@/stores/auth/auth'
import { NavbarDropdown } from '@/components/index'

const store = useNavBarAdminStore()
const auth = useAuthStore()
</script>

<template>
  <div class="relative flex items-center p-4 gap-1.5 bg-white rounded-xl shadow-md w-full">
    <img :src="auth.userInfo.foto || 'https://via.placeholder.com/40'" alt="Avatar" class="rounded-full object-cover w-10 h-10"/>
    <div class="flex flex-col flex-1 text-left">
      <h2 class="text-sm font-semibold">{{ auth.userInfo.nome || 'Usuário' }}</h2>
      <p class="text-xs text-gray-500">{{ auth.userInfo.email || 'email@exemplo.com' }}</p>
    </div>
    <button @click="store.toggleDropdown" class="text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Abrir menu do usuário">
      ⋮
    </button>
    <NavbarDropdown :open="store.isDropdownOpen" :width="'100%'" @close="store.closeDropdown" @logout="auth.logout"/>
  </div>
</template>
