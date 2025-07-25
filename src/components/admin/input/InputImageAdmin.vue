<template>
  <div>
    <label class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      type="file"
      accept="image/*"
      @change="handleFileChange"
      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
    <div v-if="preview" class="mt-2">
      <img :src="preview" alt="Preview" class="h-24 rounded" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: String,
  modelValue: File
})
const emit = defineEmits(['action'])

const preview = ref(null)

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    preview.value = URL.createObjectURL(file)
    emit('action', file)
  }
}
</script>
