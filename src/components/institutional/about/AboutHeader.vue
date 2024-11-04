<script setup>
import { computed, ref } from 'vue';
import { BackButton } from '@/components/index';

const screen = computed(() => {
    return window.innerWidth
})
</script>

<template>
    <header class="flex flex-col w-full">
        <div class="flex justify-between flex-row">
            <div class="w-1/2 md:w-auto">
                <BackButton :title="(screen > 768) ? 'Voltar a Página Inicial' : 'Voltar'" />
            </div>
            <span class="font-light text-xl w-auto md:text-base">IFC - Campus Araquari</span>
        </div>
        <div class="flex justify-end m-3 md:justify-center md:mt-6">
            <div class="w-auto flex flex-col text-end md:text-center">
                <span class="text-6xl md:text-4xl font-semibold font-poppins leading-tight">Atlas Digital</span>
                <span class="text-6xl md:text-4xl font-semibold font-poppins leading-tight">de Histologia</span>

            </div>
        </div>
    </header>
</template>