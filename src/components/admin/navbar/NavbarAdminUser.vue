<script setup>
import { ref } from 'vue'
import { NavbarDropdown } from '@/components/index'

const isDropdownOpen = ref(false)

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown() {
  isDropdownOpen.value = false
}

function handleLogout() {
  // Aqui você coloca a lógica de logout real
  alert('Logout acionado')
  closeDropdown()
}
</script>

<template>
  <div class="relative flex items-center p-4 gap-1.5 bg-white rounded-xl shadow-md w-full">
    <img src="#" alt="Avatar" class="rounded-full object-cover" />
    <div class="flex flex-col flex-1 text-left">
      <h2 class="text-sm font-semibold">Gabriel Lucas</h2>
      <p class="text-xs text-gray-500">gabe1612mail@gmail.com</p>
    </div>
    <button @click="toggleDropdown" class="text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Open user menu">⋮</button>
    <!-- Dropdown fica posicionado relativo ao pai -->
    <NavbarDropdown  :isOpen="isDropdownOpen" :width="'100%'" @close="closeDropdown" @logout="handleLogout"/>
  </div>
</template>

<style scoped>
/* Para garantir que o dropdown posicione relativo a esse container */
.relative {
  position: relative;
}
</style>
