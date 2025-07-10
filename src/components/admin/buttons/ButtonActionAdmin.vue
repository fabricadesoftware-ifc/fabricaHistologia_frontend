<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Mapeamento interno de rotas para opções de criação
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
  // Adicione mais sessões aqui conforme necessário
}

// Extrai o nome da sessão com base no path da rota
const sessionKey = computed(() => {
  const match = route.path.match(/\/([^/]+)/)
  return match ? match[1] : null
})

const session = computed(() => sessionMap[sessionKey.value] || null)
const options = computed(() => session.value ? Object.keys(session.value.options) : [])
const selectedOption = ref(options.value[0] || '')

const showSelect = computed(() => options.value.length > 1)

const handleAdd = () => {
  const path = session.value?.options[selectedOption.value]
  if (path) router.push(path)
}
</script>

<template>
  <div v-if="session" class="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
    <label class="text-sm text-gray-500 font-semibold">Ação:</label>

    <div class="flex items-center gap-2">
      <button
        class="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition"
        @click="handleAdd"
      >
        <span class="text-xl">＋</span>
        <span>Adicionar {{ showSelect ? selectedOption : session.label }}</span>
      </button>

      <select
        v-if="showSelect"
        v-model="selectedOption"
        class="border border-gray-300 rounded-md px-2 py-1 text-sm"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>
