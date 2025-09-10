<script setup>
defineProps({
  title: {
    type: String,
    default: 'Ranking de Conhecimentos Gerais'
  }
})
</script>

<template>
  <div class="w-full flex justify-start py-5">
    <h2 class="text-3xl font-bold mb-4">
      {{ title }}
    </h2>
  </div>
</template>
<style scoped>
.py-5{
  margin-top: 2.5rem;
}
</style>