<script setup>
import { RouterView } from 'vue-router'
import { useNavigationStore, useAuthStore } from './stores';
import { onMounted } from 'vue';
import { UserInformation } from './components';
import { useRoute } from 'vue-router';
const router = useRoute()
const authStore = useAuthStore()

onMounted(async()=> {
  if(authStore.verifyUser()) {
    await authStore.getUser()
  }
})
</script>

<template>
  <UserInformation v-if="authStore.activeUser && router.meta.activeUser" :position="'absolute'"/>
  <RouterView />
</template>
