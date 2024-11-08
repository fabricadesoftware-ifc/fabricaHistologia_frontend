<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue';
import {ContainerGlobal, QuizQuestion, HeaderPortal, Footer, BackButton, BtnStroke, BtnDefault} from '@/components/';
import { useQuizStore, useAuthStore, useNavigationStore} from '@/stores';
import { useRoute, useRouter } from 'vue-router';
import { resetAll } from '@/utils/quiz';
import MessageGlobal from '@/components/portal/globals/MessageGlobal.vue';

const quizStore = useQuizStore()
const authStore = useAuthStore()
const router = useRoute()
const routeruse = useRouter()
const navigationStore = useNavigationStore()
const id = router.params.id

const currentQuestion = ref(0)
const actual = ref(null)


const nextSection = async () => {
    if (currentQuestion.value <= quizStore.quizBySystem.length - 1 && quizStore.markedAnswers[currentQuestion.value].answered)
    currentQuestion.value += 1
    setId(currentQuestion.value)
}

const setId = (index) => {

    actual.value = quizStore.quizBySystem[index].id
    quizStore.getAnswersByQuestion(actual.value)
   
}

const previousSection = () => {
    if (currentQuestion.value > 0) {
        currentQuestion.value -= 1
        setId(currentQuestion.value)
    }
}
const keepCompAlive = ref(true)

onMounted(async()=>{
  quizStore.state.markedAnswers = []
  quizStore.state.savedAnswers = []
  quizStore.getMarkedAnswers()
  if (quizStore.selectedAnswers.length > 0) {
    
  resetAll(quizStore)
  await quizStore.getQuizBySystem(id, '')
  await quizStore.getAnswersByQuestion(currentQuestion.value)
  setId(0)
  

  } else {
  await quizStore.getAnswersByQuestion(currentQuestion.value)
  setId(0)
  
}
})

onUpdated(()=>{
    if (quizStore.markedAnswers.length == 0) {
         quizStore.getMarkedAnswers()
    }
})

const answeredAll = computed(()=> {
    if (quizStore.markedAnswers.length == quizStore.savedAnswers.length && quizStore.markedAnswers.length != 0) {
        return true
    } else {
        return false
    }
})




</script>
<template>
    <MessageGlobal @action="router.push('/portal')" />
    <section v-if="quizStore.quizBySystem.length == 0" class="h-dvh w-dvw flex justify-center flex-col items-center gap-4">
        <BackButton class="top-14 left-40" />
        <h1 class=" text-4xl">Quiz não encontrado</h1>
        <p>Aparentemente não há nenhum quiz cadastrado</p>
    </section>
    <main v-else class="min-h-dvh relative flex flex-col justify-between">
        <section class="fixed w-dvw h-dvh flex justify-center items-center z-40" v-if="answeredAll && keepCompAlive">
        <div class="absolute bg-white z-40 rounded-md p-5 w-4/12 h-2/6 flex flex-col justify-center gap-10">

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
                <div v-for="item, index in quizStore.markedAnswers" :class="!item.answered ? 'bg-slate-400' : item.correct ? 'bg-green-400' : 'bg-red-500', index == (currentQuestion) ? ' border-2 border-slate-600' : ''" class="size-5 rounded-full"></div>
                </div>
                <div @click="nextSection()" :class="quizStore.markedAnswers[currentQuestion] ? quizStore.markedAnswers[currentQuestion].answered ? ' opacity-1' : '  opacity-[50%]' : ''" class="flex justify-end w-1/12 hover:scale-[.92] duration-150 active:scale-[.80]">
                    <img class="size-9" src="@/assets/images/icons/arrow-right.svg" >
                </div>
            </div>

        <QuizQuestion :currentQuestion="actual" class="w-full" :data_answer="quizStore.answersByQuestion" :data_question="quizStore.quizBySystem" />
        </section>

        <div v-if="answeredAll && !keepCompAlive" class="w-full flex justify-center mt-4">
        <BtnStroke text="Voltar ao Portal" :border="'border-black'" link="/portal" />
        </div>
    </ContainerGlobal>
    <Footer class="mt-10"  />
    </main>

</template>