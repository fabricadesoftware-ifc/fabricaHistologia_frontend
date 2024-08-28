<script setup>
import CardsContainer from '@/components/CardsContainer.vue';
import ContainerDefault from '@/components/ContainerDefault.vue';
import DefaultTitle from '@/components/DefaultTitle.vue';
</script>
<template>
    <main class="w-dvw h-dvh bg-green-200">
            <ContainerDefault class="flex justify-center items-center flex-col gap-10">
            <DefaultTitle :color="'text-black'" :weight="'font-medium'" :content="'Bem-vindo ao Portal! Explore nossos recursos'" :size="'text-3xl'" :position="'justify-center'" />
            <CardsContainer class="bg-gray-300 justify-between" >
                <div class=" min-h-64 min-w-72 bg-gray-700" v-for="(item, index) in 3" :key="index"></div>
            </CardsContainer>
            </ContainerDefault>
    </main>
</template>