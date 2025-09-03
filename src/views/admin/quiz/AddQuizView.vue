<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useSystemStore, useAuthStore, useQuizStore } from '@/stores'
import {
  AdminGlobalContainer,
  InputStringAdmin,
  InputSelectAdmin,
  BtnDefault,
  SucessModalAdmin,
  LoadingSpinner
} from '@/components/index'
import router from '@/router'

const systemStore = useSystemStore()
const authStore = useAuthStore()
const quizStore = useQuizStore()

const loading = ref(false)

const newQuiz = reactive({
  title: '',
  question: '',
  system: '',
  level: ''
})

const levelOptions = [
  { name: 'Fácil', id: 1 },
  { name: 'Médio', id: 2 },
  { name: 'Difícil', id: 3 }
]

// Modais e mensagens
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref('')

// Inicialização
onMounted(async () => {
  loading.value = true
  try {
    await systemStore.getAllSystems()
  } catch (err) {
    console.error('Erro ao carregar sistemas:', err)
    errorMessage.value = 'Erro ao carregar sistemas. Tente novamente.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

// Envio do formulário
const send = async () => {
  loading.value = true
  try {
    await quizStore.createQuiz(newQuiz)
    showSuccessModal.value = true
    setTimeout(() => router.push('/admin/quiz'), 1000)
  } catch (err) {
    console.error('Erro ao criar o quiz:', err)
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = err?.message || "Erro inesperado ao cadastrar Pergunta."
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

const closeErrorModal = () => { showErrorModal.value = false }
</script>

<template>
  <AdminGlobalContainer>
    <!-- Overlay de loading -->
    <LoadingSpinner v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50"/>

    <div v-else class="w-[90%] mx-auto space-y-6">
      <div class="flex flex-col gap-10 w-full">
        <InputStringAdmin label="Título" :modelValue="newQuiz.title" @action="newQuiz.title = $event"/>
        <InputStringAdmin label="Pergunta" :modelValue="newQuiz.question" @action="newQuiz.question = $event"/>
        <InputSelectAdmin label="Sistema" :modelValue="newQuiz.system" :options="systemStore.systems" @action="newQuiz.system = $event"/>
        <InputSelectAdmin label="Nível" :modelValue="newQuiz.level" :options="levelOptions" @action="newQuiz.level = $event"/>
        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" @click="send"/>
      </div>
    </div>
  </AdminGlobalContainer>

  <!-- Modal de sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Pergunta cadastrada"
    :duration="1"
    confirm-label=""
    cancel-label=""
  />

  <!-- Modal de erro -->
  <SucessModalAdmin
    :show="showErrorModal"
    subtitle="Erro!"
    :title="errorMessage"
    message="Tente novamente ou contate o suporte."
    confirm-label="Fechar"
    :cancel-label="null"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="closeErrorModal"
  />
</template>
