<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useSlideStore } from '@/stores';
import { useOrganStore } from '@/stores';

const slideStore = useSlideStore()
const organStore = useOrganStore()

const upObject = reactive({
    "date_analysis": '',
    "post_date": '',
    "species": 1,
    "type_cut": '',
    "increase": '',
    "coloring": '',
    "autor_user": 1,
    "organ": 1
});

const newObject = reactive({
    "date_analysis": '',
    "post_date": '',
    "species": 1,
    "type_cut": '',
    "increase": '',
    "coloring": '',
    "autor_user": 1,
    "organ": 1
});

const deleteId = ref(0)

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
    <form @submit.prevent="slideStore.updateSlide(upObject, 2)">
        <input type="date" v-model="upObject.date_analysis">
        <input type="date" v-model="upObject.post_date">
        <input type="text" v-model="upObject.type_cut">
        <input type="text" v-model="upObject.increase">
        <input type="text" v-model="upObject.coloring">
        <input type="submit">
    </form>
    <input type="number" v-model="deleteId"><button @click="slideStore.deleteSlide(deleteId)">delete</button>
</template>