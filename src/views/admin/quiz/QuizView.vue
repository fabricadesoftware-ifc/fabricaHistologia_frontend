<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Stores
import { useQuizStore, useSystemStore, useAuthStore } from '@/stores'

// Components
import {
  InputStringAdmin,
  InputSelectAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin
} from '@/components/index'

const quizStore = useQuizStore()
const systemStore = useSystemStore()
const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()
const quizId = route.params.id

const loading = ref(true)

// Modelo de quiz
const quiz = reactive({
  title: '',
  question: '',
  level: '',
  system: '',
  autor_user: Number(authStore.userInfo?.id || 0)
})

// Opções de nível (exemplo)
const levelOptions = [
  { name: 'Fácil', id: 1 },
  { name: 'Médio', id: 2 },
  { name: 'Difícil', id: 3 }
]

// Opções de sistemas (carregadas do store)
const systemOptions = computed(() =>
  systemStore.systems?.map(system => ({
    name: system.name,
    id: system.id
  })) || []
)

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')

const successAction = ref('edit')
const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Quiz Excluído' : 'Quiz Atualizado'
)

onMounted(async () => {
  try {
    loading.value = true
    await Promise.all([
      quizStore.getQuizById(quizId),
      quizStore.getAnswersByQuestion(quizId),
      systemStore.getSystems()
    ])

    console.log(quizStore.answersByQuestion)

    Object.assign(quiz, quizStore.selectedQuiz)
    quiz.system = quizStore.selectedQuiz.system?.id || ''
    quiz.level = quizStore.selectedQuiz.level || ''
  } catch (err) {
    console.error('Erro ao carregar quiz:', err)
    errorMessage.value = 'Erro ao carregar os dados do quiz.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

const send = async () => {
  try {
    await quizStore.updateQuiz(quiz, quizId)
    successAction.value = 'edit'
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/quiz')
    }, 1000)
  } catch (err) {
    console.error('Erro ao atualizar quiz:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao atualizar o quiz.'
    showErrorModal.value = true
  }
}

const tryDelete = () => {
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    await quizStore.deleteQuiz(quizId)
    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/quiz')
    }, 1000)
  } catch (err) {
    console.error('Erro ao deletar quiz:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao deletar o quiz.'
    showDeleteConfirm.value = false
    showErrorModal.value = true
  }
}

function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-[#29AC96] border-t-transparent"></div>
    </div>

    <div v-else class="w-[90%] mx-auto space-y-6">
      <!-- Botões Editar / Excluir -->
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

      <!-- Form -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <InputStringAdmin label="Título" :modelValue="quiz.title" @action="quiz.title = $event" />
        <InputStringAdmin label="Questão" :modelValue="quiz.question" @action="quiz.question = $event" />

        <InputSelectAdmin
          label="Nível"
          :modelValue="quiz.level"
          :options="levelOptions"
          @action="quiz.level = $event"
        />

        <InputSelectAdmin
          label="Sistema"
          :modelValue="quiz.system"
          :options="systemOptions"
          @action="quiz.system = $event"
        />
      </div>
      <div v-if="quizStore.answersByQuestion.length > 0">
        <h2 class="font-semibold text-lg mb-2 mt-4 text-[#267A7A]">Respostas da Pergunta</h2>
        <ul >
          <li
            v-for="(answer, index) in quizStore.answersByQuestion"
            @click="router.push(`/admin/quiz/answer/${answer.id}`)"
            :key="index"
            class="cursor-pointer mb-5 bg-[#F5F5F5] hover:bg-[#29AC96]/90 transition-colors duration-150 rounded-lg px-4 py-3 shadow-sm flex items-center gap-2 group"
          >
            <span class="mdi mdi-map-marker text-[#267A7A] group-hover:text-white text-xl"></span>
            <span class="font-medium text-[#267A7A] group-hover:text-white">{{
              answer.option
            }}</span>
          </li>
        </ul>
        </div>
    </div>
  </AdminGlobalContainer>

  <!-- Modal Sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    :title="successTitle"
    message="Alterações salvas com sucesso."
    :cancel-label="null"
    :confirm-label="null"
  />

  <!-- Modal Erro -->
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

  <!-- Modal Confirmação Delete -->
  <SucessModalAdmin
    :show="showDeleteConfirm"
    subtitle="Confirmação"
    title="Excluir Quiz"
    message="Tem certeza que deseja excluir este quiz? Esta ação não poderá ser desfeita."
    confirm-label="Sim, excluir"
    cancel-label="Cancelar"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="confirmDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>