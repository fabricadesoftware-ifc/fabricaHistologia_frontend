<script setup>
import BackButton from '@/components/BackButton.vue';
import ContainerDefault from '@/components/ContainerDefault.vue';
</script>

<template>
    <ContainerDefault>
    <header class="flex flex-col w-full">
        <div class="flex justify-between flex-row">
            <div class="w-2/3 ">
                <BackButton title="Voltar a página inicial"/>
            </div>
            <span class="font-light text-xl">IFC - Campus Araquari</span>
        </div>
        <div class="flex justify-end">
            <div class="w-1/3 flex flex-col text-end">
                <span class="text-6xl font-semibold font-poppins leading-tight">Atlas Digital de Histologia</span>
            </div>
        </div>
    </header>
</ContainerDefault>
</template>