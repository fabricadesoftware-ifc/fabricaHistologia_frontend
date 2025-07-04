<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NavLateralReponsive, NavbarAdminUser, NavbarAdminMenu } from '@/components/index'

const isMobile = ref(false)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 1150
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
})

function navigateTo(to) {
  isOpen.value = false
  router.push(to)
}

</script>

<template>
  <div v-if="!isMobile" class="flex">
    <aside class="min-h-screen bg-gray-100 shadow-md p-5 flex flex-col gap-8">
      <NavbarAdminUser />
      <NavbarAdminMenu />
    </aside>
  </div>
  <div v-else>
    <NavLateralReponsive />
  </div>
</template>

<style scoped>
</style>
