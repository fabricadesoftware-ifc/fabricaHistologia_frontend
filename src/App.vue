<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores';
import { onMounted } from 'vue';
const authStore = useAuthStore()

onMounted(async()=> {
  if(authStore.verifyUser()) {
    await authStore.getUser()
  }
})
</script>

<template>
  <RouterView  />
</template>
