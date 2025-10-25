<script setup>
import { ButtonFilterRanking } from '@/components/index'
import { computed } from 'vue'

/**
 * Props:
 * - mode: 'geral' | 'especifico'
 * - modelValue: String -> para v-model do dropdown
 */
const props = defineProps({
  mode: {
    type: String,
    default: 'geral',
  },
  modelValue: {
    type: String,
    default: 'Fácil'
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'mode-change'])

// Difficulties
const difficulties = ['Fácil', 'Médio', 'Difícil']

// Computed para exibir o rótulo correto
const modeLabel = computed(() => props.mode === 'geral' ? 'Geral' : 'Específico')

// Atualiza o valor do v-model
function updateDifficulty(val) {
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="flex justify-end p-2 gap-2 w-full items-center">
    <!-- Label do modo -->
    <span
      class="text-white px-4 py-1 rounded-full text-sm font-semibold"
      :class="{
        'bg-blue-500': props.mode === 'geral',
        'bg-purple-600': props.mode === 'especifico',
      }"
    >
      {{ modeLabel }}
    </span>

    <!-- Dropdown só aparece no modo 'geral' -->
    <ButtonFilterRanking
      v-if="props.mode === 'geral'"
      :options="difficulties"
      :modelValue="props.modelValue"
      @update:modelValue="updateDifficulty"
    />
  </div>
</template>
