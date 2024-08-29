<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useOrganStore, useSystemStore } from '@/stores';

const organStore = useOrganStore();
const systemStore = useSystemStore();

const upObject = reactive({
  "id": 0,
  "name": '',
    "description": '',
    //"image": 0,
    "system": 2,
})

const newObject = reactive({
  "name": 'a',
  "description": 'a',
  // "image_organ": 0,
  "system": 1,
})

const deleteId = ref(0)

onMounted(async () => {
  await organStore.getOrgans();
  await systemStore.getSystem();
});

</script>

<template>
    <h1>organs Test</h1>
    <p>organs: {{ organStore.state }}</p>
    <form @submit.prevent="organStore.createOrgan(newObject)">
      <input type="text" v-model="newObject.name" :placeholder="newObject.name">
      <input type="text" v-model="newObject.description">
      <select v-model="newObject.system">
        <option value="">Selecione uma categoria</option>
        <option v-for="system in systemStore.state.systems" 
        :key="system.id" 
        :value="system.id">
        {{ system.name }}
        </option>
      </select>
      <input type="submit">
    </form>
    <form @submit.prevent="organStore.updateOrgan(upObject)">
      <select v-model="upObject.id">
        <option v-for="organ in organStore.state.organs" :key="organ.id" :value="organ.id"> {{ organ.id }}</option>
      </select>
      <input type="text" v-model="upObject.name" :placeholder="upObject.name">
      <input type="text" v-model="upObject.description">
      <select v-model="upObject.system">
        <option value="">Selecione uma categoria</option>
        <option v-for="system in systemStore.state.systems" 
        :key="system.id" 
        :value="system.id">
        {{ system.name }}
        </option>
      </select>
      <input type="submit">
    </form>
    <input type="number" v-model="deleteId"><button @click="organStore.deleteOrgan(deleteId)">delete</button>
  </template>