<script setup>
import {FooterComp, ContainerGlobal, TitleGlobal, CardsContainer, BtnDefault } from '@/components/index'

const buttons = [
    {text: 'Fácil', background: 'bg-[#267A7A]', block: true},
    {text: 'Médio', background: 'bg-[#1F94C7]', block: true},
    {text: 'Médio', background: 'bg-[#D94E4E]', block: true}
]
</script>
<template>
<main class=" w-full h-dvh flex flex-col justify-between">
    <ContainerGlobal class="gap-7 h-full flex flex-col items-center justify-center sm:mt-8">

        <TitleGlobal class="text-center" :color="'text-black'" :weight="'font-medium'" :content="'Quiz de Conhecimentos Gerais'" :size="'text-3xl'" :position="'justify-center'" />

        <TitleGlobal class="w-10/12 text-center" :color="'text-gray-500'" :weight="'font-medium'" :content="'Este é um quiz para testar seu conhecimento em Histologia. Ele reúne perguntas aleatórias cadastradas pelos colaboradores e varia a cada vez. Um ótimo método para estudar!'" :size="'text-lg'" :position="'justify-center'" />

        <CardsContainer class="w-auto gap-10 md:gap-5 sm:flex-wrap md:justify-center">
            <BtnDefault v-for="item, index in buttons" :key="index"  :text="item.text" :background="item.background"/>
        </CardsContainer>
    </ContainerGlobal>
    <FooterComp class="sm:mt-14"/>
</main>

</template>