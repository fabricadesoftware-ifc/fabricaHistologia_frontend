<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
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
  BtnDefault
} from '@/components/index'
import router from '@/router'

const systemStore = useSystemStore()
const authStore = useAuthStore()
const uploadStore = useUploadStore()
const supportingStore = useSupportingStore()

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

onBeforeMount(async () => {
  await systemStore.getSystems()
  console.log(authStore.userInfo)

  console.log('Dados iniciais do post:', newMaterial)
})

const send = async () => {
  try {
    if (newImage.file) {
      const imageUiqueDescriptionId = crypto.randomUUID()
      newImage.description = `${newMaterial.name} - ${imageUiqueDescriptionId}`
      newMaterial.autor_user = authStore.userInfo.id

      const result = await uploadStore.createUpload(`images`, newImage)
      console.log('imagem criada', result)

      newMaterial.image_supporting_material = result.attachment_key
      console.log(newMaterial)
    } else if (newDocument.file) {
      const documentUiqueDescriptionId = crypto.randomUUID()
      newDocument.description = `${newMaterial.name} - ${documentUiqueDescriptionId}`
      newMaterial.autor_user = authStore.userInfo.id

      const result = await uploadStore.createUpload(`documents`, newDocument)
      console.log('documento criado', result)

      newMaterial.document_supporting_material = result.attachment_key
    }

    await supportingStore.createMaterial(newMaterial)

    router.push('/admin/supporting')
  } catch (err) {
    console.error('Erro ao fazer upload da imagem:', err)
  }
}

onMounted(() => {})
</script>

<template>
  <AdminGlobalContainer>
    <div class="w-[90%] mx-auto space-y-6">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
        <InputStringAdmin label="Nome" :modelValue="newMaterial.name" @action="newMaterial.name = $event" />

        <InputTextAdmin label="Descrição" :modelValue="newMaterial.description" @action="newMaterial.description = $event"/>

        <InputUrlAdmin label="URL para material de estudo" :modelValue="newMaterial.field_name" @action="newMaterial.field_name = $event"/>


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
          <InputImageAdmin v-show="newDocument.file === null" label="Imagem" :modelValue="newImage.file" @action="newImage.file = $event"/>
        </div>

        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>
</template>
