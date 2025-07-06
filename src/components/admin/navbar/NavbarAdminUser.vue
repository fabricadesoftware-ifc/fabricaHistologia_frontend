<script setup>
import { useNavBarAdminStore } from '@/stores/admin/navbar_admin'
import { NavbarDropdown } from '@/components/index'

const store = useNavBarAdminStore()
</script>

<template>
  <div class="relative flex items-center p-4 gap-1.5 bg-white rounded-xl shadow-md w-full">
    <img src="#" alt="Avatar" class="rounded-full object-cover" />
    <div class="flex flex-col flex-1 text-left">
      <h2 class="text-sm font-semibold">Gabriel Lucas</h2>
      <p class="text-xs text-gray-500">gabe1612mail@gmail.com</p>
    </div>
    <button @click="store.toggleDropdown" class="text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Abrir menu do usuário">⋮</button>
    <NavbarDropdown :open="store.isDropdownOpen" :width="'100%'" @close="store.closeDropdown" />
  </div>
</template>
