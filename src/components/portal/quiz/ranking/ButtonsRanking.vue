<script setup>
import { ButtonFilterRanking } from '@/components/index'
import { ref, watch } from 'vue'

const difficulties = ['Fácil', 'Médio', 'Difícil']
const selectedDifficulty = ref('Fácil')

// função que troca dificuldade
function changeDifficulty(difficulty) {
  selectedDifficulty.value = difficulty
}

// emitir para o pai
const emit = defineEmits(['difficulty-change'])
watch(selectedDifficulty, (newVal) => {
  emit('difficulty-change', newVal)
})
</script>

<template>
  <div class="flex justify-end p-2 gap-2 w-full">
    <!-- Label Geral -->
    <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
      Geral
    </span>

    <!-- Botão com Dropdown -->
    <ButtonFilterRanking
      :options="difficulties"
      :modelValue="selectedDifficulty"
      @update:modelValue="changeDifficulty"
    />
  </div>
</template>
