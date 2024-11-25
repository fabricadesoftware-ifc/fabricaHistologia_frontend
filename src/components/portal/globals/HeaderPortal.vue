<script setup>
import { ContainerGlobal, BackButton, TitleGlobal } from '@/components/index';

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: 'Sem título',
    },
    size: {
        type: String,
        required: false,
        default: 'text-4xl'
    }
})

</script>

<template>
    <ContainerGlobal class="pt-8 pb-12">
        
        <BackButton />
        <TitleGlobal :content="props.title" :size="props.size" position="justify-center" class="xl:mt-16" />
        
    </ContainerGlobal>
</template>
