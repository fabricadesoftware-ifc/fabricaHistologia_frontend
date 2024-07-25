<script setup>
import { onMounted } from 'vue';
import { useSlideStore } from '@/stores/blog/slide';

const slideStore = useSlideStore()

onMounted(() => {
    slideStore.getSlides();
})
</script>

<template>
    <h1>Slide test</h1>
    <p>Slide: {{ slideStore.state }}</p>
</template>