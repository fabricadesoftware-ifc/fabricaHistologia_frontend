<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const emit = defineEmits(['navigate'])

const route = useRoute()

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

function handleClick(to) {
  emit('navigate', to)
}
</script>

<template>
  <nav class="flex flex-col gap-8 text-sm w-full">
    <div v-for="section in menuSections" :key="section.title" class="flex flex-col gap-3">
      <p class="text-gray-500 uppercase text-xs tracking-wide">
        {{ section.title }}
      </p>
      <ul class="flex flex-col gap-3">
        <li v-for="item in section.items" :key="item.to">
          <a href="#" @click.prevent="handleClick(item.to)" :class="[ isCurrent(item.to) ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-black', 'flex items-center gap-2']">
            {{ item.icon }} <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
