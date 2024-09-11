<script setup>
import { CardsContainer, SmallCardDefault } from '@/components';

const props = defineProps({
    datas: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <CardsContainer noFlex> 
        <SmallCardDefault v-for="i in props.datas" :key="i.name" :item="i" />
    </CardsContainer>
</template>