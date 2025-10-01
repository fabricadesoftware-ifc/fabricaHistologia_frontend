<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: 'Fácil'   // 🔹 valor default para teste
  }
})

const emit = defineEmits(['update:modelValue'])
const open = ref(false)

function selectOption(option) {
  emit('update:modelValue', option)
  open.value = false
}

// cores por dificuldade
const colors = {
  'Fácil': '#267A7A',
  'Médio': '#F39C12',
  'Difícil': '#C0392B'
}

// estilo dinâmico baseado no valor atual
const currentColor = computed(() => colors[props.modelValue] || '#267A7A')
</script>

<template>
  <div class="relative">
    <!-- Botão principal -->
    <button
      class="px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-gray-50 transition border"
      :style="{ borderColor: currentColor, color: currentColor }"
      @click="open = !open"
    >
      {{ props.modelValue }}
      <svg
        class="w-4 h-4 transition-transform duration-300"
        :class="{ 'rotate-180': open }"
        fill="none"
        :stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <!-- Dropdown com animação -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <ul
        v-if="open"
        class="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10"
      >
        <li
          v-for="option in props.options"
          :key="option"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
          @click="selectOption(option)"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>
