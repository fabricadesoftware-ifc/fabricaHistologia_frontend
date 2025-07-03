<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { NavLateralReponsive } from '@/components/index'

const route = useRoute()
const isMobile = ref(false)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
})


const menuSections = ref([
  {
    title: 'Portal',
    items: [
      { label: 'Órgãos', icon: '🦴', to: '/orgaos' },
      { label: 'Lâminas', icon: '🧬', to: '/laminas' },
      { label: 'Espécies', icon: '🐾', to: '/especies' },
      { label: 'Sistemas', icon: '🦻', to: '/sistemas' }
    ]
  },
  {
    title: 'Usuários',
    items: [
      { label: 'Usuários', icon: '👥', to: '/usuarios' }
    ]
  },
  {
    title: 'Quiz',
    items: [
      { label: 'Perguntas', icon: '📋', to: '/perguntas' }
    ]
  },
  {
    title: 'Material de Suporte',
    items: [
      { label: 'Conteúdos', icon: '📄', to: '/conteudos' }
    ]
  }
])

const isCurrent = (path) => route.path === path
</script>

<template>
  <div v-if="!isMobile" class="flex">
    <aside class="min-h-screen bg-gray-100 shadow-md p-10 flex flex-col gap-8">
      <div class="flex items-center p-3 bg-white rounded-xl shadow-md space-x-3">
        <img src="https://via.placeholder.com/40" alt="Avatar" class="rounded-full object-cover" />
        <div class="flex-1">
          <h2 class="text-sm font-semibold">Gabriel Lucas</h2>
          <p class="text-xs text-gray-500">gabe1612mail@gmail.com</p>
        </div>
        <button class="text-gray-400 hover:text-gray-600">⋮</button>
      </div>

      <nav class="flex flex-col gap-8 text-sm">
        <div v-for="section in menuSections" :key="section.title" class="pb-4 last:border-none last:pb-0">
          <p class="text-gray-500 uppercase text-xs mb-3 tracking-wide">{{ section.title }}</p>
          <ul class="flex flex-col gap-3">
            <li v-for="item in section.items" :key="item.to">
              <router-link :to="item.to" :class="[isCurrent(item.to) ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-black', 'flex items-center gap-2']">
                {{ item.icon }} <span>{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  </div>
  <div v-else>
    <NavLateralReponsive />
  </div>
</template>

<style scoped>
</style>
