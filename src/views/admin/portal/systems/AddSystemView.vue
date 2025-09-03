<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore, useUploadStore, useSystemStore } from '@/stores'
import { BtnDefault, InputStringAdmin, InputTextAdmin, InputImageAdmin, AdminGlobalContainer, SucessModalAdmin, LoadingSpinner } from '@/components'
import router from '@/router'

const authStore = useAuthStore()
const uploadStore = useUploadStore()
const systemsStore = useSystemStore()

const loading = ref(false)

const newSystem = reactive({
  name: '',
  description: '',
  image: null,
  autor_user: null
})

const newImage = reactive({
  file: null,
  description: ''
})

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")

const closeErrorModal = () => { showErrorModal.value = false }

const send = async () => {
  loading.value = true
  try {
    newSystem.autor_user = authStore.userInfo.id

    if (newImage.file) {
      const imageUniqueDescriptionId = crypto.randomUUID()
      newImage.description = `${newSystem.name} - ${imageUniqueDescriptionId}`

      const formData = new FormData()
      formData.append('file', newImage.file)
      formData.append('description', newImage.description)

      const result = await uploadStore.createUpload('images', formData)
      newSystem.image = result.attachment_key
    }

    await systemsStore.createSystem(newSystem)
    showSuccessModal.value = true
    setTimeout(() => router.push('/admin/systems'), 1000)

  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = err?.message || "Erro inesperado ao cadastrar o Sistema."
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
<AdminGlobalContainer>
  <!-- overlay de loading -->
  <LoadingSpinner v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50"/>

  <div v-else class="w-[90%] mx-auto space-y-6">
    <div class="flex flex-col gap-10 w-full">
      <InputStringAdmin label="Nome" :modelValue="newSystem.name" @action="newSystem.name = $event"/>
      <InputTextAdmin label="Descrição" :modelValue="newSystem.description" @action="newSystem.description = $event"/>
      <div class="md:col-span-2 mb-10">
        <InputImageAdmin label="Imagem" :modelValue="newImage.file" @action="newImage.file = $event"/>
      </div>
      <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" @click="send"/>
    </div>
  </div>
</AdminGlobalContainer>

<SucessModalAdmin
  :show="showSuccessModal"
  subtitle="Sucesso!"
  title="Sistema cadastrado"
  :duration="1"
  confirm-label=""
    cancel-label=""
/>

<SucessModalAdmin
  :show="showErrorModal"
  subtitle="Erro!"
  :title="errorMessage"
  message="Tente novamente ou contate o suporte."
  confirm-label="Fechar"
  :cancel-label="null"
  confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
  @confirm="closeErrorModal"
/>
</template>
