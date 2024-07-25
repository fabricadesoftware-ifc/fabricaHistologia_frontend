<script setup>
import { onMounted } from 'vue';
import { useOrganStore } from '@/stores';

const organStore = useOrganStore();

onMounted(() => {
  organStore.getOrgans();
});

</script>

<template>
  <div>
    <h1>Organs Test</h1>
    <p>Organs: {{ organStore.state }}</p>
  </div>
  </template>