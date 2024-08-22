<script setup>
import { onMounted, reactive } from 'vue';
import { useOrganStore, useSystemStore } from '@/stores';

const organStore = useOrganStore();
const systemStore = useSystemStore();

const upObject = reactive({
  "name": '',
    "description": '',
    "image": 0,
    "system": 1,
})

const newObject = reactive({
  "name": '',
  "description": '',
  "image": 0,
  "system": 1,
})


onMounted(() => {
  organStore.getOrgans();
  systemStore.getSystems();
});

</script>

<template>
    <h1>organs Test</h1>
    <p>organs: {{ organStore.state }}</p>
    <form @submit="organStore.createOrgan">
      <input type="text" v-model="newObject.name" :placeholder="newObject.name">
      <input type="text" v-model="newObject.description">
      <select>
        <option v-for="(name, index) in systemStore.state?.system">{{ name }}</option>
      </select>
      <input type="submit">
    </form>
  </template>