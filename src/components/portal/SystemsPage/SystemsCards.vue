<script setup>
import { CardsContainer, SmallCardDefault } from '@/components';

const SystemsTest = [1, 2, 3, 4, 5, 6, 7, 8]
</script>

<template>
        <CardsContainer class="gap-10"> 
            <SmallCardDefault  v-for="item in SystemsTest" :key="item"/>
        </CardsContainer>
</template>