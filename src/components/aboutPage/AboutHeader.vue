<script setup>
import BackButton from '@/components/BackButton.vue';
import ContainerDefault from '@/components/ContainerDefault.vue';
</script>

<template>
    <ContainerDefault>
    <header class="flex flex-col w-full">
        <div class="flex justify-between flex-row">
            <div class="w-1/2">
                <BackButton title="Voltar a página inicial"/>
            </div>
            <span class="font-light text-xl w-auto">IFC - Campus Araquari</span>
        </div>
        <div class="flex justify-end m-3">
            <div class="w-auto flex flex-col text-end">
                <span class="text-6xl font-semibold font-poppins leading-tight">Atlas Digital</span>
                <span class="text-6xl font-semibold font-poppins leading-tight">de Histologia</span>

            </div>
        </div>
    </header>
</ContainerDefault>
</template>