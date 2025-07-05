<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  width: {
    type: String,
    default: '100%'
  }
})

const emit = defineEmits(['close', 'logout'])

function onClose() {
  emit('close')
}

function onLogout() {
  emit('logout')
  emit('close')
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      :style="{ width: width }"
      class="absolute left-0 top-full mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
    >
      <div class="flex justify-end p-2 border-b border-gray-200">
        <button
          @click="onClose"
          aria-label="Close menu"
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
          type="button"
        >
          ✕
        </button>
      </div>
      <div class="py-2">
        <button
          @click="onLogout"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          type="button"
        >
          Logout
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
