<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sessionMap = {
  laminas: {
    label: 'Lâmina',
    options: {
      'Lâmina': '/laminas/create',
      'Ponto da Lâmina': '/laminas/ponto/create'
    }
  },
  perguntas: {
    label: 'Pergunta',
    options: {
      'Pergunta': '/perguntas/create',
      'Resposta': '/perguntas/resposta/create'
    }
  },
  orgaos: {
    label: 'Órgão',
    options: {
      'Órgão': '/orgaos/create'
    }
  },
}

const sessionKey = computed(() => {
  const match = route.path.match(/\/([^/]+)/)
  return match ? match[1] : null
})

const session = computed(() => sessionMap[sessionKey.value] || null)
const options = computed(() => session.value ? Object.keys(session.value.options) : [])
const selectedOption = ref(options.value[0] || '')
const showSelect = computed(() => options.value.length > 1)

const dropdownOpen = ref(false)

const handleAdd = () => {
  const path = session.value?.options[selectedOption.value]
  if (path) router.push(path)
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option) => {
  selectedOption.value = option
  dropdownOpen.value = false
}
</script>

<template>
  <div v-if="session" class="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 relative">
    <label class="text-sm text-gray-500 font-semibold">Ação:</label>

    <div class="flex items-center gap-2 relative">
      <button
        class="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition"
        @click="handleAdd"
      >
        <span class="text-xl">＋</span>
        <span>Adicionar {{ showSelect ? selectedOption : session.label }}</span>
      </button>

      <div v-if="showSelect" class="relative">
        <button
          @click="toggleDropdown"
          class="text-gray-600 hover:text-gray-800 p-2 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-transform duration-300"
            :class="{ 'rotate-180': dropdownOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <transition name="dropdown">
          <ul
            v-if="dropdownOpen"
            class="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-md w-40 overflow-hidden"
          >
            <li
              v-for="option in options"
              :key="option"
              @click="selectOption(option)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {{ option }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 200ms ease-out;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
