<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useQuizStore, useAuthStore } from '@/stores'
import {
  InputStringAdmin,
  InputSelectAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin
} from '@/components/index'

import router from '@/router'
import { useRoute } from 'vue-router'

// Stores
const quizStore = useQuizStore()
const authStore = useAuthStore()

// Route params
const route = useRoute()
const answerId = route.params.id

const loading = ref(true)

// Modelo da resposta
const answer = reactive({
  id: '',
  question: null, // sempre objeto { id, name } ou null
  option: '',
  correct: false,
  comment_answer: ''
})

// Opções para perguntas
const questionsOptions = computed(() => {
  return quizStore.allQuizes?.map((q) => ({
    id: q.id,
    name: q.question
  })) || []
})

// Controle booleano da resposta correta
const correctValue = ref(false)
watch(correctValue, (val) => {
  answer.correct = val
})

// Computed para simplificar binding com o select
const selectedQuestionId = computed({
  get: () => answer.question?.id || null,
  set: (id) => {
    // Se encontrou a pergunta correspondente, substitui o objeto inteiro
    const found = questionsOptions.value.find(q => q.id == id)
    answer.question = found ? { id: found.id, name: found.name } : null
  }
})

// Modais de status
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')

const successAction = ref('edit')
const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Resposta Excluída' : 'Resposta Atualizada'
)

// Carregamento inicial
onMounted(async () => {
  try {
    loading.value = true

    // Carrega quiz e resposta
    await Promise.all([
      quizStore.getAllQuizes(),
      quizStore.getAnswerById(answerId)
    ])

    Object.assign(answer, quizStore.selectedAnswers)
    correctValue.value = quizStore.selectedAnswers.correct

    // Ajusta objeto de pergunta (caso API traga só ID ou objeto)
    const selected = quizStore.selectedAnswers.question
    const matchedQuestion = questionsOptions.value.find(q =>
      typeof selected === 'object' ? q.id === selected.id : q.id === selected
    )
    answer.question = matchedQuestion || null

    console.log('Resposta carregada:', matchedQuestion)
  } catch (err) {
    console.error('Erro ao carregar dados da resposta:', err)
    errorMessage.value = 'Falha ao carregar dados. Verifique o servidor.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

// Atualiza resposta
const send = async () => {
  try {
    const payload = {
      ...answer,
      question: answer.question?.id || null
    }

    console.log('Payload enviado:', payload)
    await quizStore.updateAnswers(payload)

    setTimeout(()=> {
        router.push('/admin/quiz')
    }, 1000)
    successAction.value = 'edit'
    showSuccessModal.value = true
  } catch (err) {
    console.error('Erro ao editar resposta:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao atualizar a resposta.'
    showErrorModal.value = true
  }
}

// Tenta excluir resposta
const tryDelete = () => {
  showDeleteConfirm.value = true
}

// Confirma exclusão
const confirmDelete = async () => {
  try {
    await quizStore.deleteAnswers(answerId)
    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/quiz')
    }, 1000)
  } catch (err) {
    console.error('Erro ao deletar resposta:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao deletar a resposta.'
    showDeleteConfirm.value = false
    showErrorModal.value = true
  }
}

// Fecha modal de erro
function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <!-- Overlay de carregamento -->
    <div v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-[#29AC96] border-t-transparent"></div>
    </div>

    <div v-else class="w-[90%] mx-auto space-y-6">
      <div class="absolute top-0 right-0 p-5 z-10 flex gap-5">
        <BtnDefault
          @click="send"
          class="mb-10 h-8 rounded-lg"
          text="Editar"
          background="bg-[#29AC96]"
          :hasLink="false"
        />
        <BtnDefault
          @click="tryDelete"
          class="mb-10 h-8 rounded-lg"
          text="Excluir"
          background="bg-[#E40000]"
          :hasLink="false"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <!-- Pergunta -->
        <InputSelectAdmin
          label="Pergunta"
          :modelValue="selectedQuestionId"
          :options="questionsOptions"
          @action="selectedQuestionId = $event"
        />

        <!-- Opção -->
        <InputStringAdmin
          label="Opção"
          :modelValue="answer.option"
          @action="answer.option = $event"
        />

        <!-- Comentário da resposta -->
        <div class="md:col-span-2">
          <InputStringAdmin
            label="Comentário da Resposta"
            :modelValue="answer.comment_answer"
            @action="answer.comment_answer = $event"
          />
        </div>

        <!-- Correta -->
        <div class="md:col-span-2 flex items-center gap-4">
          <label class="font-semibold">Correta?</label>
          <input
            type="checkbox"
            v-model="correctValue"
            class="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  </AdminGlobalContainer>

  <!-- Modal de sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    :title="successTitle"
    message="Ação realizada com sucesso."
    :cancel-label="null"
    :confirm-label="null"
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

  <!-- Modal de confirmação para excluir -->
  <SucessModalAdmin
    :show="showDeleteConfirm"
    subtitle="Confirmação"
    title="Excluir Resposta"
    message="Tem certeza que deseja excluir esta resposta? Esta ação não poderá ser desfeita."
    confirm-label="Sim, excluir"
    cancel-label="Cancelar"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="confirmDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>
