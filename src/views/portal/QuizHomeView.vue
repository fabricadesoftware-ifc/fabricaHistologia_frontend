<script setup>
import { BtnDefault, DefaultTitle, Footer } from '@/components/index';

const infos = [
    {color: 'bg-[#267A7A]', text: 'Fácil'},
    {color: 'bg-[#1F94C7]', text: 'Médio'},
    {color: 'bg-[#D94E4E]', text: 'Difícil'},
]
</script>
<template>
<main class="w-dvw h-dvh flex flex-col justify-center items-center">
    <section class="w-7/12 h-auto flex flex-col items-center gap-8 mb-28 2md:w-10/12">
        <DefaultTitle class="text-center" content="Quiz de Conhecimentos Gerais" size="text-3xl" />
        <p class=" text-center">Este é um quiz para testar seu conhecimento em Histologia. Ele reúne perguntas aleatórias cadastradas pelos colaboradores e varia a cada vez. Um ótimo método para estudar!</p>
        <section class=" mt-2 w-10/12 flex sm:flex-col justify-between sm:items-center gap-4">
        <div class="w-4/12 sm:w-9/12" v-for="item, index in infos" :key="index">
            <BtnDefault block="true" :text="item.text" :background="item.color" />
        </div>
        </section>
    </section>
</main>
<Footer class="absolute bottom-0 w-dvw" />
</template>
