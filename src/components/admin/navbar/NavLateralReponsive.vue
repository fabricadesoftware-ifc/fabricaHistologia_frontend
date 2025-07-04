<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NavbarAdminUser, NavbarAdminMenu } from '@/components/index'

const router = useRouter()
const isOpen = ref(false)

function navigateTo(to) {
  isOpen.value = false
  router.push(to)
}
</script>

<template>
  <nav class="bg-transparent fixed top-0 left-0 z-40 flex items-center p-4">
    <button @click="isOpen = !isOpen" aria-label="Toggle Menu" class="text-2xl text-white">☰</button>
  </nav>

  <transition name="slide">
    <aside v-if="isOpen" class="responsive-aside overflow-auto z-40 flex flex-col bg-gray-100 items-center justify-center relative">
      <button @click="isOpen = false" aria-label="Close Menu" class="absolute z-50 top-4 left-4 text-xl">✕</button>

      <div class="flex justify-center py-8">
        <div class="max-w-xs w-full">
          <NavbarAdminUser />
        </div>
      </div>

      <div class="flex flex-1 flex-col items-center">
        <NavbarAdminMenu @navigate="navigateTo" />
      </div>
    </aside>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.responsive-aside {
  position: fixed;
  inset: 0;
  min-height: 100dvh;
  width: 100%;
}

@media (min-width: 500px) {
  .responsive-aside {
    max-width: 400px;
  }
}
</style>

