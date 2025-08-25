<template>
  <div>
    <label class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
    
    <select
      class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
      :value="modelValue"
      @change="$emit('action', $event.target.value)"
    >
      <option disabled value="">Selecione</option>
      <option
        v-for="(opt, index) in options"
        :key="index"
        :value="opt?.id"
      >
        {{ opt?.name }}
      </option>
    </select>

    <!-- Botão para limpar seleção -->
    <button
      type="button"
      class="mt-2 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded shadow-sm transition"
      @click="$emit('action', null)"
      v-if="modelValue"
    >
      Limpar seleção
    </button>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number, null],
  options: {
    type: Array,
    required: true
  }
})

defineEmits(['action'])
</script>
