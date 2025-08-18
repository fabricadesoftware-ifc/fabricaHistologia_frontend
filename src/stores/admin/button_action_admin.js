import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { eraseWords } from '@/utils/admin'

export const useActionSelectorStore = defineStore('actionSelector', () => {
  const router = useRouter()
  const route = useRoute()

  // Sessões disponíveis e suas opções
  const sessionMap = {
    posts: {
      label: 'Lâmina',
      options: {
        'Lâmina': '/admin/posts/add-post', // < modificar futuramente
        'Ponto da Lâmina': '/laminas/ponto/create' // < modificar futuramente      
      }
    },
    quiz: {
      label: 'Pergunta',
      options: {
        'Pergunta': '/admin/quiz/add-quiz', // < modificar futuramente
        'Resposta': '/admin/quiz/answer/add' // < modificar futuramente
      }
    },
    organs: {
      label: 'Órgão',
      options: {
        'Órgão': '/admin/organs/add' // < modificar futuramente      
        }
    },
    conteudos: {
        label: 'Conteúdo',
        options: {
            'Conteúdo': '/conteudos/create', // < modificar futuramente
        }
    },
    especies: {
      label: 'Espécie',
      options: {
        'Espécie': '/especies/create', // < modificar futuramente
      }
    },
    systems: {
      label: 'Sistema',
      options: {
        'Sistema': '/admin/systems/add', // < modificar futuramente
      }
    },
    users: {
      label: 'Usuário',
      options: {
        'Usuário': '/users/create', // < modificar futuramente
      }
    }
  }

  // Detecta a sessão atual com base na URL
  const sessionKey = computed(() => {
      const match = route.path.match(/^\/admin\/([^/]+)/)
    return match ? match[1] : null
  })

  // Sessão ativa (dados da sessão)
  const session = computed(() => sessionMap[sessionKey.value] || null)

  // Opções disponíveis da sessão atual
  const options = computed(() => session.value ? Object.keys(session.value.options) : [])

  // Opção selecionada
  const selectedOption = ref(options.value[0] || '')

  // Atualiza a opção selecionada ao mudar as opções (ex: trocar de rota)
  watch(options, (newOptions) => {
    if (!newOptions.includes(selectedOption.value)) {
      selectedOption.value = newOptions[0] || ''
    }
  })

  // Mostra o dropdown apenas se houver mais de uma opção
  const showSelect = computed(() => options.value.length > 1)

  // Ação principal: redireciona para a rota da opção selecionada < pode ser mudada futuramente
  const handleAdd = () => {
    const path = session.value?.options[selectedOption.value]
    if (path) router.push(path)
  }

  // Atualiza manualmente a opção selecionada
  const selectOption = (option) => {
    selectedOption.value = option
  }

  return {
    session,
    sessionKey,
    options,
    selectedOption,
    showSelect,
    handleAdd,
    selectOption
  }
})
