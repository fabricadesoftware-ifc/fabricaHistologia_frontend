<script setup>
import { ContainerGlobal } from '@/components/index';

const searchResults = [
    {
        title: 'link 1 Nome da aular',
        description: 'breve descrição',
        link: '#'
    },
    {
        title: 'link 2 Nome do PDF',
        description: 'breve descrição',
        link: '#'
    },
    {
        title: 'link 3 Nome da Referencia',
        description: 'breve descrição',
        link: '#'
    },
]
</script>

<template>
    <ContainerGlobal>
        <div class="w-3/4 mx-auto flex flex-col my-4 font-poppins">
            <div v-for="(result, index) in searchResults" :key="index" class="w-full flex h-12 my-4 justify-between">
                <div class="flex flex-col my">
                    <RouterLink class="text-xl sm:text-base" :to="result.link">{{ result.title }}</RouterLink>
                    <ul class="text-[#787878] list-disc ml-4 text-lg sm:text-sm">
                        <li>{{ result.description }}</li>
                    </ul>
                </div>
                <RouterLink class="my-auto text-[#267A7A] text-base sm:text-xs">ver relacionados</RouterLink>
            </div>
        </div>
    </ContainerGlobal>
</template>