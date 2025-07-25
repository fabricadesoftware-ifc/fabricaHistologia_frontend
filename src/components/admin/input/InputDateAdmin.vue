<template>
  <div>
    <label class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
    <input type="date" class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" :value="modelValue" @input="$emit('action', $event.target.value)"/>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String
})

defineEmits(['action'])
</script>
