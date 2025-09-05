<script setup>
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import {ContainerGlobal, QuizQuestion, HeaderPortal, Footer, BackButton, BtnStroke, BtnDefault, LoadingSpinner} from '@/components/';
import { useQuizStore, useAuthStore, useNavigationStore} from '@/stores';
import { useRoute, useRouter } from 'vue-router';
import { resetAll } from '@/utils/quiz';
import MessageGlobal from '@/components/portal/globals/MessageGlobal.vue';

const quizStore = useQuizStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const navigationStore = useNavigationStore()
const id = route.params.id

const currentQuestion = ref(0)
const actual = ref(null)
const keepCompAlive = ref(true)

// 🔵 Loading global e 🟢 Loading da questão
const loadingPage = ref(false)
const loadingQuestion = ref(false)

const redirect = ref(0)
const returnTime = computed(() => {
  return redirect.value
})

const setId = async (index) => {
  if (!quizStore.quizBySystem[index]) {
    console.warn("Quiz ainda não carregado ou índice inválido")
    return
  }
  actual.value = quizStore.quizBySystem[index].id
  loadingQuestion.value = true
  await quizStore.getAnswersByQuestion(actual.value)
  console.log(quizStore.answersByQuestion)
  loadingQuestion.value = false
}


const nextSection = async () => {
    if (currentQuestion.value < quizStore.quizBySystem.length - 1 && quizStore.markedAnswers[currentQuestion.value].answered) {
        currentQuestion.value += 1
        await setId(currentQuestion.value)
    }
}

const previousSection = async () => {
    if (currentQuestion.value > 0) {
        currentQuestion.value -= 1
        await setId(currentQuestion.value)
    }
}

onMounted(async () => {
  quizStore.state.markedAnswers = []
  quizStore.state.savedAnswers = []
  quizStore.getMarkedAnswers()

  loadingPage.value = true

  if (quizStore.selectedAnswers.length > 0) {
    resetAll(quizStore)
  }

  // carregar quiz
  await quizStore.getQuizBySystem(id, '')

  // aguardar até que o quiz esteja preenchido
  if (quizStore.quizBySystem.length > 0) {
    await setId(0)
  }

  loadingPage.value = false
})



onUpdated(()=>{
    if (quizStore.markedAnswers.length == 0) {
         quizStore.getMarkedAnswers()
    }
})

const answeredAll = computed(()=>{
    return quizStore.markedAnswers.length == quizStore.savedAnswers.length && quizStore.markedAnswers.length != 0
})

const saveAnswer = async (data) => {
  console.log(data)
  redirect.value = 0 // inicia a barra cheia

  const interval = 50 // intervalo em ms
  const totalTime = 2000 // 2 segundos
  const step = (interval / totalTime) * 100

  return new Promise((resolve) => {
    const timer = setInterval(() => {
      redirect.value += step
      if (redirect.value >= 100) {
        clearInterval(timer)
        redirect.value = 0
        nextSection()
        resolve()
      }
    }, interval)
  })
}


watch(
  () => quizStore.quizBySystem,
  async (newVal) => {
    if (newVal.length > 0 && actual.value === null) {
      await setId(0)
    }
  }
)
</script>

<template>
    <MessageGlobal @action="router.push('/portal')" />

    <!-- 🔵 Loading global -->
    <section
      v-if="loadingPage"
      class="h-dvh w-dvw flex justify-center items-center bg-white z-50 fixed top-0 left-0"
    >
      <LoadingSpinner class="w-16 h-16 text-blue-600" />
    </section>

    <!-- Quiz não encontrado -->
    <section v-else-if="quizStore.quizBySystem.length == 0" class="h-dvh w-dvw flex justify-center flex-col items-center gap-4 sm:text-center">
        <BackButton class="top-14 left-40" />
        <h1 class=" text-4xl sm:text-3xl">Quiz não encontrado</h1>
        <p>Aparentemente não há nenhum quiz cadastrado</p>
    </section>

    <!-- Conteúdo -->
    <main v-else class="min-h-dvh relative flex flex-col justify-between">
        <section class="fixed w-dvw h-dvh flex justify-center items-center z-40" v-if="answeredAll && keepCompAlive">
          <div class="absolute bg-white z-40 rounded-md p-5 w-4/12 sm:w-11/12 lg:w-8/12 h-2/6 flex flex-col justify-center gap-10">
              <div class="flex w-full justify-center flex-col gap-3">
                <h1  class="text-3xl text-center">Pontuação:</h1>
                <p class=" text-green-600 text-center text-2xl">{{ quizStore.countSavedAnswers }} {{ quizStore.countSavedAnswers == 1 ? 'Acerto' : 'Acertos' }}</p>
              </div>
              <div class="flex w-full justify-center gap-4">
                  <BtnDefault :hasLink="false" @click="keepCompAlive = false" :text="'Ver Respostas'" />
                  <BtnDefault :text="'Voltar ao Portal'" :link="'/portal'" />
              </div>
          </div>
          <div class="bg-black h-dvh w-dvw opacity-50 z-30"></div>
        </section>

        <ContainerGlobal>
            <HeaderPortal title="Quiz de Conhecimentos Gerais" size="text-2xl" />
            <section class="flex flex-col gap">
            <div class="flex justify-between p-3 w-full">
                <div @click="previousSection()" class="flex justify-start w-1/12 hover:scale-[.92] duration-150 active:scale-[.80]">
                    <img class="size-9" src="@/assets/images/icons/arrow-left.svg" >
                </div>
                <div class="flex w-10/12 justify-evenly">
                  <div v-for="item, index in quizStore.markedAnswers" 
                       :class="!item.answered ? 'bg-slate-400' : item.correct ? 'bg-green-400' : 'bg-red-500', index == currentQuestion ? ' border-2 border-slate-600' : ''" 
                       class="size-5 rounded-full"></div>
                </div>
                <div @click="nextSection()" 
                     :class="quizStore.markedAnswers[currentQuestion] ? quizStore.markedAnswers[currentQuestion].answered && quizStore.savedAnswers.length < quizStore.quizBySystem.length || keepCompAlive == false && currentQuestion < (quizStore.quizBySystem.length - 1)  ? ' opacity-1' : '  opacity-[50%]' : ''" 
                     class="flex justify-end w-1/12 hover:scale-[.92] duration-150 active:scale-[.80]">
                    <img class="size-9" src="@/assets/images/icons/arrow-right.svg" >
                </div>
            </div>

            <!-- 🟢 Loading do QuizQuestion -->
            <div v-if="loadingQuestion" class="flex justify-center items-center h-40">
              <LoadingSpinner class="w-12 h-12 text-blue-500" />
            </div>

            <QuizQuestion 
              v-else 
              @answerSelected="saveAnswer" 
              :currentQuestion="actual" 
              class="w-full" 
              :data_answer="quizStore.answersByQuestion" 
              :data_question="quizStore.quizBySystem" 
            />
                    <div v-if="returnTime > 0" class="flex w-100 h-2 bg-gray-200 rounded-full mt-5 relative">
          <!-- Barra de progresso -->
          <div
            class="bg-green-500 h-2 rounded-full absolute top-0"
            :style="{
              width: returnTime + '%',
              transition: 'width 0.05s linear'
            }"
          ></div>
        </div>
            </section>

            <div v-if="answeredAll && !keepCompAlive" class="w-full flex justify-center mt-4">
              <BtnStroke text="Voltar ao Portal" :border="'border-black'" link="/portal" />
            </div>
        </ContainerGlobal>
        <Footer class="mt-10"  />
    </main>
</template>
