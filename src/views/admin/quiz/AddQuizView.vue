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
  BtnDefault
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

const send = async () => {
  try {
    console.log(newQuiz)
    await quizStore.createQuiz(newQuiz)

    router.push('/admin/quiz')
  } catch (err) {
    console.error('Erro ao criar o quiz:', err)
  }
}

onMounted(() => {})
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
</template>
