<script setup>
import { onMounted } from 'vue';
import { useSpecieStore } from '@/stores';

const specieStore = useSpecieStore();

onMounted(() => {
  specieStore.getSpecies();
});

</script>

<template>
  <div>
    <h1>Species Test</h1>
    <p>Species: {{ specieStore.state }}</p>
  </div>
  </template>