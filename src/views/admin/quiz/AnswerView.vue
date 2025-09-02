<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useQuizStore, useAuthStore } from '@/stores'
import {
  InputStringAdmin,
  InputSelectAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin,
  LoadingSpinner
} from '@/components/index'

import router from '@/router'
import { useRoute } from 'vue-router'

// Stores
const quizStore = useQuizStore()
const authStore = useAuthStore()

// Route params
const route = useRoute()
const answerId = route.params.id

// Estado de carregamento e mensagens
const loading = ref(false)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')

// Controle de sucesso (edição ou exclusão)
const successAction = ref('edit')
const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Resposta Excluída' : 'Resposta Atualizada'
)

// Modelo da resposta
const answer = reactive({
  id: '',
  question: null,
  option: '',
  correct: false,
  comment_answer: ''
})

// Controle de resposta correta
const correctValue = ref(false)
watch(correctValue, (val) => {
  answer.correct = val
})

// Lista de perguntas para o select
const questionsOptions = computed(() => {
  return quizStore.allQuizes?.map((q) => ({
    id: q.id,
    name: q.question
  })) || []
})

// Computed para bind com o select
const selectedQuestionId = computed({
  get: () => answer.question?.id || null,
  set: (id) => {
    const found = questionsOptions.value.find(q => q.id == id)
    answer.question = found ? { id: found.id, name: found.name } : null
  }
})

// Função para carregar os dados
onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      quizStore.getAllQuizes(),
      quizStore.getAnswerById(answerId)
    ])

    Object.assign(answer, quizStore.selectedAnswers)
    correctValue.value = quizStore.selectedAnswers.correct

    const selected = quizStore.selectedAnswers.question
    const matchedQuestion = questionsOptions.value.find(q =>
      typeof selected === 'object' ? q.id === selected.id : q.id === selected
    )
    answer.question = matchedQuestion || null
  } catch (err) {
    errorMessage.value = err?.response?.data
      ? Object.values(err.response.data)
          .map(v => Array.isArray(v) ? v.join(', ') : v)
          .join('\n')
      : 'Falha ao carregar os dados da resposta.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

// Atualização da resposta
const send = async () => {
  loading.value = true
  try {
    const payload = {
      ...answer,
      question: answer.question?.id || null
    }

    await quizStore.updateAnswers(payload)

    successAction.value = 'edit'
    showSuccessModal.value = true

    setTimeout(() => {
      router.push('/admin/quiz')
    }, 1000)
  } catch (err) {
    console.log(err)
    errorMessage.value = err?.response?.data
      ? Object.values(err.response.data)
          .map(v => Array.isArray(v) ? v.join(', ') : v)
          .join('\n')
      : err?.message || 'Erro inesperado ao atualizar a resposta.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

// Solicitar confirmação de exclusão
const tryDelete = () => {
  showDeleteConfirm.value = true
}

// Exclusão confirmada
const confirmDelete = async () => {
  loading.value = true
  try {
    await quizStore.deleteAnswers(answerId)

    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true

    setTimeout(() => {
      router.push('/admin/quiz')
    }, 1000)
  } catch (err) {
    errorMessage.value = err?.response?.data
      ? Object.values(err.response.data)
          .map(v => Array.isArray(v) ? v.join(', ') : v)
          .join('\n')
      : err?.message || 'Erro inesperado ao deletar a resposta.'
    showDeleteConfirm.value = false
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

// Fecha modal de erro
function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <!-- Loading -->
    <LoadingSpinner v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50" />

    <div v-else class="w-[90%] mx-auto space-y-6">
      <!-- Botões de ação -->
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

      <!-- Formulário -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <InputSelectAdmin
          label="Pergunta"
          :modelValue="selectedQuestionId"
          :options="questionsOptions"
          @action="selectedQuestionId = $event"
        />

        <InputStringAdmin
          label="Opção"
          :modelValue="answer.option"
          @action="answer.option = $event"
        />

        <div class="md:col-span-2">
          <InputStringAdmin
            label="Comentário da Resposta"
            :modelValue="answer.comment_answer"
            @action="answer.comment_answer = $event"
          />
        </div>

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
    :duration="1"
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
