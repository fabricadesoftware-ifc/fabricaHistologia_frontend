<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore, useUploadStore, useSystemStore } from '@/stores'
import { BtnDefault, InputStringAdmin, InputTextAdmin, InputImageAdmin, AdminGlobalContainer, SucessModalAdmin } from '@/components'
import router from '@/router'

const authStore = useAuthStore()
const uploadStore = useUploadStore()
const systemsStore = useSystemStore()

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
  console.log('Arquivo selecionado:', newImage.file)
  try {

    // Adiciona autor do sistema
    newSystem.autor_user = authStore.userInfo.id

    if (newImage.file) {
      // Cria descrição única
      const imageUniqueDescriptionId = crypto.randomUUID()
      newImage.description = `${newSystem.name} - ${imageUniqueDescriptionId}`

      // Cria FormData
      const formData = new FormData()
      formData.append('file', newImage.file)
      formData.append('description', newImage.description)

      // Upload
      const result = await uploadStore.createUpload('images', formData)
      newSystem.image = result.attachment_key
    }

    // Cria o sistema
    await systemsStore.createSystem(newSystem)

    // Modal de sucesso e redireciona
    showSuccessModal.value = true
    setTimeout(() => router.push('/admin/systems'), 1000)

  } catch (err) {
    console.error('Erro ao cadastrar sistema:', err)
    errorMessage.value = err?.message || "Erro inesperado ao cadastrar o Sistema."
    showErrorModal.value = true
  }
}
</script>

<template>
<AdminGlobalContainer>
  <div class="w-[90%] mx-auto space-y-6">
    <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
      <InputStringAdmin label="Nome" :modelValue="newSystem.name" @action="newSystem.name = $event"/>
      <InputTextAdmin label="Descrição" :modelValue="newSystem.description" @action="newSystem.description = $event"/>
      <div class="md:col-span-2 mb-10">
        <InputImageAdmin label="Imagem" :modelValue="newImage.file" @action="newImage.file = $event"/>
      </div>
      <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false"/>
      <input type="file" @change="e => console.log(e.target.files[0])"/>

    </form>
  </div>
</AdminGlobalContainer>

<SucessModalAdmin
  :show="showSuccessModal"
  subtitle="Sucesso!"
  title="Sistema cadastrado"
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
