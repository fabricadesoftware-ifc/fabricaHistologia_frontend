<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center bg-[#e9f8f6] cursor-pointer hover:border-teal-500"
         @dragover.prevent
         @drop.prevent="onDrop">
      <div class="flex flex-col items-center justify-center gap-2 text-sm text-gray-600">
        <img :src="cloudIcon" alt="Nuvem de Upload" class="h-12" />
        <p>Escolha um arquivo ou arraste & solte aqui</p>
        <p class="text-xs text-gray-400">JPEG, PNG, JPG e WEBP</p>
        <label class="inline-flex items-center mt-3 px-4 py-1 border rounded text-sm text-teal-600 border-teal-600 hover:bg-teal-50 transition cursor-pointer">
          Procure
          <img :src="documentIcon" alt="Anexo" class="ml-2 h-4" />
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
import { ref, watch } from 'vue'
import cloudImg from '@/assets/images/admin/cloud-upload-solid-svgrepo-com.svg'
import documentImg from '@/assets/images/admin/document-plus-svgrepo-com.svg'

const props = defineProps({
  label: String,
  modelValue: File
})
const emit = defineEmits(['action'])

const preview = ref(null)

const cloudIcon = cloudImg
const documentIcon = documentImg

// Atualiza o preview caso modelValue venha já preenchido
watch(() => props.modelValue, (newFile) => {
  if (newFile) {
    preview.value = URL.createObjectURL(newFile)
  } else {
    preview.value = null
  }
})

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
