<script setup>
import CardsContainer from '@/components/CardsContainer.vue';
import ContainerDefault from '@/components/ContainerDefault.vue';
import DefaultTitle from '@/components/DefaultTitle.vue';
</script>
<template>
    <main class="w-dvw h-dvh bg-green-200">
            <ContainerDefault class="flex justify-center items-center flex-col">
            <h1 class=" font-poppins text-xl font-medium"></h1>
            <DefaultTitle :color="'text-black'" :weight="'font-medium'" :content="'Bem-vindo ao Portal! Explore nossos recursos'" :size="'text-xl'" :position="'justify-center'" />
            <CardsContainer class="bg-gray-300  ">
                <p>cards will be here soon.</p>
            </CardsContainer>
            </ContainerDefault>
    </main>
</template>