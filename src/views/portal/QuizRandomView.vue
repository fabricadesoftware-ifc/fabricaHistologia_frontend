<script setup>
import { computed, onMounted, ref } from 'vue';
import {ContainerGlobal, QuizQuestion, HeaderPortal, Footer, BackButton} from '@/components/';
import { useQuizStore, useAuthStore} from '@/stores';
import { useRoute, useRouter } from 'vue-router';

const quizStore = useQuizStore()
const authStore = useAuthStore()
const router = useRoute()
const routeruse = useRouter()
const id = router.params.id
const currentQuestion = ref(0)
const actual = ref(null)



const nextSection = async () => {
    if (currentQuestion.value < quizStore.quizBySystem.length)
    currentQuestion.value += 1
    setId(currentQuestion.value)
}

const setId = (id) => {
    actual.value = quizStore.quizBySystem[id].id
    quizStore.getAnswersByQuestion(actual.value)
}

const previousSection = () => {
    if (currentQuestion.value > 0) {
        currentQuestion.value -= 1
        setId(currentQuestion.value)
    }
}

onMounted(async()=>{
  await quizStore.getAnswersByQuestion(currentQuestion.value)
  quizStore.getMarkedAnswers()
  setId(0)
    
})



</script>
<template>
    <section v-if="quizStore.quizBySystem.length == 0" class="h-dvh w-dvw flex justify-center flex-col items-center gap-4">
        <BackButton class="top-14 left-40" />
        <h1 class=" text-4xl">Quiz não encontrado</h1>
        <p>Aparentemente não há nenhum quiz cadastrado</p>
    </section>
    <main v-else class="min-h-dvh relative flex flex-col justify-between">
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
                <div @click="nextSection()" class="flex justify-end w-1/12 hover:scale-[.92] duration-150 active:scale-[.80]">
                    <img class="size-9" src="@/assets/images/icons/arrow-right.svg" >
                </div>
            </div>

        <QuizQuestion :currentQuestion="actual" class="w-full" :data_answer="quizStore.answersByQuestion" :data_question="quizStore.quizBySystem" />
        </section>
    </ContainerGlobal>
    <Footer class="mt-10"  />
    </main>

</template>