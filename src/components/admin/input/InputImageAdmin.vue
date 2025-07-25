<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center bg-[#e9f8f6] cursor-pointer hover:border-teal-500" @dragover.prevent @drop.prevent="onDrop">
      <div class="flex flex-col items-center justify-center gap-2 text-sm text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V8m0 0l-4 4m4-4l4 4m5-4v8m0 0l4-4m-4 4l-4-4" />
        </svg>
        <p>Escolha um arquivo ou arraste & solte aqui</p>
        <p class="text-xs text-gray-400">JPEG, PNG, JPG e WEBP</p>
        <label class="inline-flex items-center mt-3 px-4 py-1 border rounded text-sm text-teal-600 border-teal-600 hover:bg-teal-50 transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4a2 2 0 00-2 2v1H6.5A1.5 1.5 0 005 8.5V19a1 1 0 001 1h12a1 1 0 001-1V8.5A1.5 1.5 0 0017.5 7H16V6a2 2 0 00-2-2h-4zm6 3V6a1 1 0 00-1-1h-4a1 1 0 00-1 1v1h6z" />
          </svg>
          Procure
          <input type="file" accept="image/*" class="hidden" @change="handleFileChange" />
        </label>
        <div v-if="preview" class="mt-3">
          <img :src="preview" alt="Preview" class="h-24 rounded object-cover mx-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,
  modelValue: File
})
const emit = defineEmits(['action'])

const preview = ref(null)

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file && file.type.startsWith('image/')) {
    preview.value = URL.createObjectURL(file)
    emit('action', file)
  }
}

function onDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    preview.value = URL.createObjectURL(file)
    emit('action', file)
  }
}
</script>
