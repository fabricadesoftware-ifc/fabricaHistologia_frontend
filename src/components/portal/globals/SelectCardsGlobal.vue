<script setup>
import { CardsContainer, SmallCardDefault } from '@/components';
const cardsTest = [1, 2, 3, 4, 5, 6, 7, 8]
</script>

<template>
        <CardsContainer class="gap-10 justify-center"> 
            <SmallCardDefault  v-for="item in cardsTest" :key="item"/>
        </CardsContainer>
</template>