<template>
  <div>
    <label class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
    <select class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" :value="modelValue" @change="$emit('action', $event.target.value)">
      <option disabled value="">Selecione</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.id">
        {{ opt.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true
  }
})

defineEmits(['action'])
</script>
