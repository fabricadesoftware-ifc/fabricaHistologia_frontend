<script setup>
import { ContainerGlobal, BackButton, TitleGlobal } from '@/components/index';

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: 'Sem título',
    },
})

</script>

<template>
    <ContainerGlobal class="pt-8 pb-12">
        <BackButton />
        <TitleGlobal :content="props.title" position="justify-center" class="md:mt-16" />
    </ContainerGlobal>
</template>
