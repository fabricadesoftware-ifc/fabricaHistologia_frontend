<script setup>
import { useNavBarAdminStore } from '@/stores/admin/navbar_admin'

const store = useNavBarAdminStore()
</script>

<template>
  <transition name="fade">
    <div
      v-if="store.isDropdownOpen"
      style="width: 100%"
      class="absolute left-0 top-full mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
    >
      <div class="flex items-center justify-between p-2 border-b border-gray-200">
        <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Opções</h2>
        <button
          @click="store.closeDropdown"
          aria-label="Fechar menu"
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
          type="button"
        >
          ✕
        </button>
      </div>

      <div class="py-2 text-sm px-4">
        <p class="text-gray-500 uppercase text-xs tracking-wide mb-2">Usuário</p>
        <button
          @click="onLogout"
          class="flex items-center gap-2 text-gray-700 hover:text-black hover:bg-gray-100 w-full text-left px-2 py-1 rounded-md"
          type="button"
        >
          🚪 <span>Logout</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
