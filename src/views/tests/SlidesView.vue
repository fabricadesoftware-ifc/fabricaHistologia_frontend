<script setup>
import { onMounted } from 'vue';
import { useSlideStore } from '@/stores';

const slideStore = useSlideStore()

onMounted(() => {
    slideStore.getSlides();
})
</script>

<template>
    <h1>Slide test</h1>
    <p>Slide: {{ slideStore.state }}</p>
    <h1>Organ</h1>
    <p></p>
    <h1>specie</h1>
    <p></p>
    <h1>usuario</h1>
</template>