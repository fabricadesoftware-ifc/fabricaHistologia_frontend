<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isOpen = ref(false)

const menuSections = [
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
]

const isCurrent = (path) => route.path === path

function navigateTo(to) {
  isOpen.value = false
  router.push(to)
}
</script>

<template>
  <nav class="bg-transparent fixed top-0 right-0 z-50 flex items-center p-4">
    <button @click="isOpen = !isOpen" aria-label="Toggle Menu" class="text-2xl text-white">
      ☰
    </button>
  </nav>

  <transition name="slide">
    <aside
      v-if="isOpen"
      class="min-h-screen fixed inset-0 bg-white overflow-auto z-40 flex flex-col items-center justify-center relative"
    >
      <button
        @click="isOpen = false"
        aria-label="Close Menu"
        class="absolute top-4 left-4 text-xl"
      >
        ✕
      </button>

      <div class="flex flex-col items-center gap-10 text-center text-sm max-w-xs w-full">
        <!-- 👤 Usuário -->
        <div class="flex items-center p-4 bg-white rounded-xl shadow-md w-full gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            class="rounded-full object-cover"
          />
          <div class="flex flex-col flex-1 text-left">
            <h2 class="text-sm font-semibold">Gabriel Lucas</h2>
            <p class="text-xs text-gray-500">gabe1612mail@gmail.com</p>
          </div>
          <button class="text-gray-400 hover:text-gray-600">⋮</button>
        </div>

        <!-- 📂 Menu -->
        <div class="flex flex-col items-center gap-10 text-center w-full">
          <div
            v-for="section in menuSections"
            :key="section.title"
            class="flex flex-col items-center gap-3 w-full border-b border-gray-200 last:border-none"
          >
            <p class="text-gray-500 uppercase text-xs tracking-wide">
              {{ section.title }}
            </p>
            <ul class="flex flex-col gap-2">
              <li
                v-for="item in section.items"
                :key="item.to"
              >
                <a
                  href="#"
                  @click.prevent="navigateTo(item.to)"
                  :class="[
                    isCurrent(item.to)
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-black',
                    'block'
                  ]"
                >
                  {{ item.icon }} <span>{{ item.label }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
