<script setup>
import { computed, onMounted, ref } from 'vue';
import {ContainerGlobal, QuizQuestion, HeaderPortal, Footer} from '@/components/';
import { useQuizStore } from '@/stores/blog/quiz';
import { useRoute } from 'vue-router';

const quizStore = useQuizStore()
const router = useRoute()
const id = router.params.id
const currentQuestion = ref(1)

const updateQuestions = computed(()=> {
    return quizStore.answersByQuestion.filter(s => s.question == currentQuestion.value)
} )

const nextSection = () => {
    if (currentQuestion.value < quizStore.quizBySystem.length)
    currentQuestion.value += 1
}

const previousSection = () => {
    if (currentQuestion.value > 1) {
        currentQuestion.value -= 1
    }
}

onMounted(async()=>{
 await quizStore.getQuizBySystem(id, '')
 await quizStore.getAnswersByQuestion()
  quizStore.getMarkedAnswers()
  console.log(quizStore.markedAnswers)
})

</script>
<template>
    <main  class="min-h-dvh relative">
    <ContainerGlobal>
            <HeaderPortal title="Quiz de Conhecimentos Gerais" size="text-2xl" />
            <section class="flex flex-col gap">
            <div class="flex justify-between p-3 w-full">
                <div @click="previousSection()" class="flex justify-start w-1/12 hover:scale-[.92] duration-150 active:scale-[.80]">
                    <img class="size-9" src="@/assets/images/icons/arrow-left.svg" >
                </div>
                <div class="flex w-10/12 justify-evenly">
                <div v-for="item, index in quizStore.markedAnswers" :class="!item.answered ? 'bg-slate-400' : item.correct ? 'bg-green-400' : 'bg-red-500', index == (currentQuestion -1) ? ' border-2 border-slate-600' : ''" class="size-5 rounded-full"></div>
                </div>
                <div @click="nextSection()" class="flex justify-end w-1/12 hover:scale-[.92] duration-150 active:scale-[.80]">
                    <img class="size-9" src="@/assets/images/icons/arrow-right.svg" >
                </div>
            </div>
        <QuizQuestion :currentQuestion="currentQuestion" class="w-full" :data_answer="updateQuestions" :data_question="quizStore.quizBySystem" />
        </section>
    </ContainerGlobal>
    <Footer class=" absolute bottom-0"  />
    </main>

</template>