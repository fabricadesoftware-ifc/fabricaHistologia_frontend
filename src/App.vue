<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores'
import { onMounted } from 'vue'
const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initializeAuth()
})
</script>

<template>
  <RouterView  />
</template>
