<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useSystemStore, useAuthStore, useQuizStore } from '@/stores'
import {
  NavLateralAdmin,
  ButtonActionAdmin,
  InputDateAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  InputStringAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin,
} from '@/components/index'
import router from '@/router'

const systemStore = useSystemStore()
const authStore = useAuthStore()
const quizStore = useQuizStore()

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

onMounted(async () => {
  await systemStore.getSystems()
  console.log(authStore.userInfo)

  console.log('Dados iniciais do quiz:', newQuiz)
})

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")

const send = async () => {
  try {
    console.log(newQuiz)
    await quizStore.createQuiz(newQuiz)

    showSuccessModal.value = true
    setTimeout(()=> {
    router.push('/admin/quiz')
    },1000)
  } catch (err) {
    console.error('Erro ao criar o quiz:', err)
    console.error('Erro ao fazer upload da imagem:', err)
    errorMessage.value = err?.message || "Erro inesperado ao cadastrar Pergunta."
    showErrorModal.value = true
  }
}

function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <div class="w-[90%] mx-auto space-y-6">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
        <InputStringAdmin
          label="Titulo"
          :modelValue="newQuiz.title"
          @action="newQuiz.title = $event"
        />

        <InputStringAdmin
          label="Pergunta"
          :modelValue="newQuiz.question"
          @action="newQuiz.question = $event"
        />

        <InputSelectAdmin
          label="Sistema"
          :modelValue="newQuiz.system"
          :options="systemStore.systems"
          @action="newQuiz.system = $event"
        />

        <InputSelectAdmin
          label="Nível"
          :modelValue="newQuiz.level"
          :options="levelOptions"
          @action="newQuiz.level = $event"
        />

        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>
  
    <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Pergunta cadastrado"
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