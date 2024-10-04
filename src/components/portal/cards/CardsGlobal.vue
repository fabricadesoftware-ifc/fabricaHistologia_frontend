<script setup>
import { CardsContainer, SmallCardDefault } from '@/components';

const props = defineProps({
    datas: {
        type: Array,
        required: true,
    },
    context: {
        type: String,
        required: false,
        default: 'system'
    },
    justify: {
        type: String,
        default: 'justify-center'  
    },
    gap: {
        type: String,
        default: 'gap-10'
    },
})
</script>

<template>
    <CardsContainer :gap="props.gap" :justify="props.justify"> 
        <SmallCardDefault v-for="i in props.datas" :key="i.name" :item="i" :context="context" />
    </CardsContainer>
</template>