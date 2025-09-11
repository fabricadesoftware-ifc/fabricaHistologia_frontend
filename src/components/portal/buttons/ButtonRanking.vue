<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button
    @click="$router.push(props.to)"
    class="flex items-center justify-center p-3 rounded-2xl border-2"
    style="border-color: #E6C200; color: #E6C200;"
  >
    <!-- Aqui você insere sua imagem/SVG -->
    <img 
      src="@\assets\images\icons\medal-ribbon-star-svgrepo-com (6).svg" 
      alt="Ranking" 
      class="w-12 h-12"
    />
  </button>
</template>
