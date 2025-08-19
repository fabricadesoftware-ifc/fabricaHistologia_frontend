<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center bg-[#f3f6fb] cursor-pointer hover:border-blue-500" 
         @dragover.prevent 
         @drop.prevent="onDrop">
      <div class="flex flex-col items-center justify-center gap-2 text-sm text-gray-600">
        <img src="@/assets/images/admin/cloud-upload-solid-svgrepo-com.svg" alt="PDF Upload" class="h-12 " />
        <p>Escolha um arquivo ou arraste & solte aqui</p>
        <p class="text-xs text-gray-400">PDF</p>
        <label class="inline-flex items-center mt-3 px-4 py-1 border rounded text-sm text-blue-600 border-blue-600 hover:bg-blue-50 transition cursor-pointer">
          Procure
          <img src="@/assets/images/admin/document-plus-svgrepo-com.svg" alt="Anexo" class="ml-2 h-4" />
          <input type="file" accept="application/pdf" class="hidden" @change="handleFileChange" />
        </label>
        <div v-if="fileName" class="mt-3 text-sm text-gray-700">
          Arquivo selecionado: {{ fileName }}
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

const fileName = ref('')

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file && file.type === 'application/pdf') {
    fileName.value = file.name
    emit('action', file)
  }
}

function onDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file && file.type === 'application/pdf') {
    fileName.value = file.name
    emit('action', file)
  }
}
</script>
