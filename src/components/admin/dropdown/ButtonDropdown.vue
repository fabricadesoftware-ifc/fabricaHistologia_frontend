<script setup>
import { ref, watch, onMounted } from 'vue'

// Props recebidas do componente pai
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

// Evento emitido para atualizar o valor no componente pai
const emit = defineEmits(['update:modelValue'])

// Estado local do dropdown
const isOpen = ref(false)           // controla se o dropdown está aberto ou fechado
const selected = ref('')            // valor selecionado atualmente

// Define valor inicial ao montar o componente
onMounted(() => {
  selected.value = props.modelValue || props.options[0]
})

// Atualiza o valor selecionado quando o modelValue muda externamente
watch(() => props.modelValue, (newVal) => {
  selected.value = newVal
})

// Quando o usuário seleciona uma opção
const selectOption = (option) => {
  selected.value = option
  emit('update:modelValue', option) // informa ao pai a nova seleção
  isOpen.value = false              // fecha o dropdown
}

// Alterna o estado de aberto/fechado do dropdown
const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="relative">
    <button @click="toggle" class="text-gray-600 hover:text-gray-800 p-2 transition-transform">
        <img src="@/assets/images/admin/arrow-down-338-svgrepo-com.svg" alt="seta" class="h-4 w-4 transition-transform duration-300" :class="{ 'rotate-180': isOpen }" />
    </button>

    <transition name="dropdown">
      <ul v-if="isOpen" class="absolute sm:relative sm:left-5 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-md w-40 overflow-hidden">
        <li v-for="option in props.options" :key="option" @click="selectOption(option)" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 200ms ease-out;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
