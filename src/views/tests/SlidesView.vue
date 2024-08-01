<script setup>
import { onMounted, reactive } from 'vue';
import { useSlideStore } from '@/stores';
import { useOrganStore } from '@/stores';

const slideStore = useSlideStore()
const organStore = useOrganStore()

const newObject = reactive({
    "date_analysis": null,
    "post_date": null,
    "species": 1,
    "type_cut": '',
    "increase": '',
    "coloring": '',
    "autor_user": 1,
    "organ": 1
});

onMounted(() => {
    slideStore.getSlides();
    organStore.getOrgans();
})
</script>

<template>
    <h1>Slide test</h1>
    <p>Slide: {{ slideStore.state }}</p>
    <form @submit="slideStore.createSlide(newObject)">
        <input type="date" v-model="newObject.date_analysis">
        <input type="date" v-model="newObject.post_date">
        <input type="text" v-model="newObject.type_cut">
        <input type="text" v-model="newObject.increase">
        <input type="text" v-model="newObject.coloring">
        <input type="submit">
    </form>
    <h1>Organ</h1>
    <p>{{ organStore.state }}</p>
    <h1>specie</h1>
    <p></p>
    <h1>usuario</h1>
</template>