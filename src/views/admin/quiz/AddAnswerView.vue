<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useSystemStore, useAuthStore, useQuizStore } from '@/stores'
import {
  InputStringAdmin,
  InputSelectAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin,
} from '@/components/index'
import router from '@/router'

// Stores
const systemStore = useSystemStore()
const authStore = useAuthStore()
const quizStore = useQuizStore()

// Lista de quizzes carregados
const quizOptions = ref([])

// Opções para campo "correta"
const correctOptions = [
  { id: true, name: 'Sim' },
  { id: false, name: 'Não' }
]

// Reactive state para múltiplas respostas
const newAnswers = reactive([
  {
    question: '',
    option: '',
    correct: false,
    comment_answer: ''
  }
])

// Buscar quizzes existentes
onBeforeMount(async () => {
  await quizStore.getAllQuizes()
  console.log(quizStore.allQuizes)
  quizOptions.value = quizStore.allQuizes.map(q => ({
    id: q.id,
    name: q.question,
  }))
  console.log('Usuário logado:', authStore.userInfo)
})

// Adicionar nova linha de resposta
const addAnswer = () => {
  newAnswers.push({
    question: newAnswers[0]?.question || '',
    option: '',
    correct: false,
    comment_answer: ''
  })
}

// Remover uma linha de resposta
const removeAnswer = (index) => {
  if (newAnswers.length > 1) {
    newAnswers.splice(index, 1)
  }
}

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")

// Enviar respostas
const send = async () => {
  try {
    const payload = newAnswers.map(a => ({
      question: a.question,
      option: a.option,
      correct: a.correct,
      comment_answer: a.comment_answer
    }))

    console.log('Payload enviado para API:', JSON.stringify(payload, null, 2))

    await quizStore.createAnswersBulk(payload)
    showSuccessModal.value = true
    setTimeout(()=>{
    router.push('/admin/quiz')

    },1000)
  } catch (err) {
    console.error('Erro ao criar as respostas:', err.response?.data || err)
    errorMessage.value = err?.message || "Erro inesperado ao cadastrar a Resposta."
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
      <form class="space-y-8 mb-10" @submit.prevent="send">
        <!-- Loop de respostas -->
        <div
          v-for="(answer, index) in newAnswers"
          :key="index"
          class="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-xl shadow-sm relative"
        >
          <!-- Selecionar Quiz -->
          <InputSelectAdmin class="mt-10"
            label="Pergunta"
            :modelValue="answer.question"
            :options="quizOptions"
            @action="answer.question = $event"
          />

          <!-- Texto da opção -->
          <InputStringAdmin
            label="Opção da Resposta"
            :modelValue="answer.option"
            @action="answer.option = $event"
          />

          <!-- Comentário -->
          <InputStringAdmin
            label="Comentário da Resposta"
            :modelValue="answer.comment_answer"
            @action="answer.comment_answer = $event"
          />

          <!-- Correta -->
          <InputSelectAdmin
            label="Resposta Correta?"
            :modelValue="answer.correct"
            :options="correctOptions"
            @action="answer.correct = $event"
          />

          <!-- Botão de Remover -->
          <button
            v-if="newAnswers.length > 1"
            type="button"
            class="bg-red-600 rounded-2xl text-white px-4 py-2 text-sm hover:bg-red-400 transition absolute top-2 right-2"
            @click="removeAnswer(index)"
          >
            Remover
          </button>
        </div>

        <!-- Botão para adicionar mais -->
        <div class="flex gap-5 h-auto">
        <button
          type="button"
          class="bg-gray-200 rounded-2xl px-4 py-2 text-sm hover:bg-gray-300 transition"
          @click="addAnswer"
        >
          + Adicionar outra resposta
        </button>

        <!-- Botão para salvar -->
        <BtnDefault text="Cadastrar Respostas" background="bg-[#29AC96]" :hasLink="false" />
        </div>
      </form>
    </div>
  </AdminGlobalContainer>

      <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Resposta cadastrada"
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
