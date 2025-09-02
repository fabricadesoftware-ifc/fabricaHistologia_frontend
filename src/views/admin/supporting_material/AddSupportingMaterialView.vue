<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { useSystemStore, useAuthStore, useQuizStore, useUploadStore, useSupportingStore } from '@/stores'
import {
  NavLateralAdmin,
  ButtonActionAdmin,
  InputDateAdmin,
  InputImageAdmin,
  InputDocumentAdmin,
  InputSelectAdmin,
  InputStringAdmin,
  InputTextAdmin,
  InputUrlAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin,
  LoadingSpinner
} from '@/components/index'
import router from '@/router'

const systemStore = useSystemStore()
const authStore = useAuthStore()
const uploadStore = useUploadStore()
const supportingStore = useSupportingStore()

// Estado
const loading = ref(true)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref('')

// Objetos reativos
const newMaterial = reactive({
  name: '',
  description: '',
  system: '',
  field_name: '',
  image_supporting_material: null,
  document_supporting_material: null
})

const newImage = reactive({
  file: null,
  description: ''
})

const newDocument = reactive({
  file: null,
  description: ''
})

// Carregar sistemas
onBeforeMount(async () => {
  try {
    await systemStore.getAllSystems()
  } catch (err) {
    errorMessage.value = 'Erro ao carregar sistemas. Tente novamente mais tarde.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

// Envio de dados
const send = async () => {
  loading.value = true
  try {
    if (newImage.file) {
      const imageUniqueId = crypto.randomUUID()
      newImage.description = `${newMaterial.name} - ${imageUniqueId}`
      newMaterial.autor_user = authStore.userInfo.id

      const formData = new FormData()
      formData.append('file', newImage.file)
      formData.append('description', newImage.description)

      const result = await uploadStore.createUpload('images', formData)
      newMaterial.image_supporting_material = result.attachment_key
    } else if (newDocument.file) {
      const documentUniqueId = crypto.randomUUID()
      newDocument.description = `${newMaterial.name} - ${documentUniqueId}`
      newMaterial.autor_user = authStore.userInfo.id

      const formData = new FormData()
      formData.append('file', newDocument.file)
      formData.append('description', newDocument.description)

      const result = await uploadStore.createUpload('documents', formData)
      newMaterial.document_supporting_material = result.attachment_key
    }

    await supportingStore.createMaterial(newMaterial)
    showSuccessModal.value = true
    setTimeout(() => router.push('/admin/supporting'), 1000)
  } catch (err) {
if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = err?.message || "Erro inesperado ao cadastrar a Espécie."
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

const closeErrorModal = () => {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <!-- Spinner -->
    <LoadingSpinner v-if="loading" class="my-10" />

    <div v-else class="w-[90%] mx-auto space-y-6">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
        <InputStringAdmin label="Nome" :modelValue="newMaterial.name" @action="newMaterial.name = $event" />

        <InputTextAdmin label="Descrição" :modelValue="newMaterial.description" @action="newMaterial.description = $event" />

        <InputUrlAdmin label="URL para material de estudo" :modelValue="newMaterial.field_name" @action="newMaterial.field_name = $event" />

        <InputSelectAdmin
          label="Sistema"
          :modelValue="newMaterial.system"
          :options="systemStore?.systems"
          @action="newMaterial.system = $event"
        />

        <div class="md:col-span-2 mb-10">
          <InputDocumentAdmin
            v-show="newImage.file === null"
            label="Documento"
            :modelValue="newDocument.file"
            @action="newDocument.file = $event"
          />
        </div>

        <div v-show="newDocument.file === null && newImage.file === null" class="md:col-span-2 mb-10 flex items-center justify-center font-semibold text-[#29AC96]">
          <span>OU</span>
        </div>

        <div class="md:col-span-2 mb-10">
          <InputImageAdmin v-show="newDocument.file === null" label="Imagem" :modelValue="newImage.file" @action="newImage.file = $event" />
        </div>

        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>

  <!-- Modal de sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Material de Apoio cadastrado"
    confirm-label=""
    cancel-label=""
    :duration="1"
  />

  <!-- Modal de erro -->
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
