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
    }
})
</script>

<template>
    <CardsContainer noFlex> 
        <SmallCardDefault v-for="i in props.datas" :key="i.name" :item="i" :context="context" />
    </CardsContainer>
</template>