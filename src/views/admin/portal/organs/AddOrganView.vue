<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useSystemStore, useOrganStore, useAuthStore, useUploadStore } from '@/stores'
import {
  AdminGlobalContainer,
  BtnDefault,
  InputStringAdmin,
  InputTextAdmin,
  InputSelectAdmin,
  InputImageAdmin,
  LoadingSpinner,
  SucessModalAdmin
} from '@/components/index'
import router from '@/router'

const systemStore = useSystemStore()
const organStore = useOrganStore()
const authStore = useAuthStore()
const uploadStore = useUploadStore()

const newOrgan = reactive({
  name: '',
  description: '',
  system: '',
  image: null
})

const newImage = reactive({
  file: null,
  description: '',
})

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    await systemStore.getAllSystems()
  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = "Erro inesperado ao carregar sistemas."
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

const send = async () => {
  loading.value = true
  try {
    // Upload da imagem, se houver
    if (newImage.file) {
      const imageUniqueDescriptionId = crypto.randomUUID()
      newImage.description = `${newOrgan.name} - ${imageUniqueDescriptionId}`
      newOrgan.autor_user = authStore.userInfo.id

      const formData = new FormData()
      formData.append('file', newImage.file)
      formData.append('description', newImage.description)

      const result = await uploadStore.createUpload(`images`, formData)
      newOrgan.image = result.attachment_key
    }

    // Criação do órgão
    await organStore.createOrgan(newOrgan)
    showSuccessModal.value = true

    setTimeout(() => {
      router.push('/admin/organs')
    }, 1000)

  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = "Erro inesperado ao cadastrar o órgão."
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

function closeErrorModal() {
  showErrorModal.value = false
}
</script>


<template>
  <AdminGlobalContainer>
    <div class="w-[90%] mx-auto space-y-6">

      <LoadingSpinner v-if="loading" class="mt-20" />

      <form v-else class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
        <InputStringAdmin label="Nome" :modelValue="newOrgan.name" @action="newOrgan.name = $event"/>
        <InputTextAdmin label="Descrição" :modelValue="newOrgan.description" @action="newOrgan.description = $event"/>
        <InputSelectAdmin label="Sistema" :modelValue="newOrgan.system" :options="systemStore.systems" @action="newOrgan.system = $event"/>
        <div class="md:col-span-2 mb-10">
          <InputImageAdmin label="Imagem" :modelValue="newImage.file" @action="newImage.file = $event"/>
        </div>
        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>

  <SucessModalAdmin
   :duration="1"
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Órgão cadastrado"
    confirm-label=""
    cancel-label=""
  />

  <SucessModalAdmin
     :duration="0"
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
