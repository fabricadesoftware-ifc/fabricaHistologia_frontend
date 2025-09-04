<script setup>
import { quizHomeButtonsData } from '@/utils/quiz';
import { BtnDefault, DefaultTitle, Footer, BackButton } from '@/components/index';
import { useQuizStore } from '@/stores/blog/quiz';
import { onMounted, ref } from 'vue';
import { throwQuizes, resetAll } from '@/utils/quiz';
import { useRouter } from 'vue-router';
const router = useRouter()
const quizStore = useQuizStore()



const defineLevel = async(item) => {
    resetAll(quizStore)
    await quizStore.getQuizBySystem('', item)
    quizStore.state.selectedLevel = item
    throwQuizes()
    router.push('/portal/quiz/random'); 
}

</script>
<template>
<main class="w-dvw h-dvh flex flex-col justify-center items-center">
    <BackButton class=" left-40 top-14 sm:left-12 sm:top-8" />
    <section class="w-7/12 h-auto flex flex-col items-center gap-8 mb-28 md2:w-10/12">
        <DefaultTitle class="text-center sm:mt-36" content="Quiz de Conhecimentos Gerais" size="text-3xl" />
        <p class=" text-center">Este é um quiz para testar seu conhecimento em Histologia. Ele reúne perguntas aleatórias cadastradas pelos colaboradores e varia a cada vez. Um ótimo método para estudar!</p>
        <section class=" mt-2 w-10/12 flex sm:flex-col justify-between sm:items-center gap-4">
        <div class="w-4/12 sm:w-9/12" v-for="item, index in quizHomeButtonsData" :key="index">
            <BtnDefault block="true" :text="item.text" :background="item.color" @click="defineLevel(item.value)" link="/portal/quiz/random" />
        </div>
        </section>
        
    </section>
    
</main>
<Footer class="absolute bottom-0 sm:relative w-dvw" />
</template>
