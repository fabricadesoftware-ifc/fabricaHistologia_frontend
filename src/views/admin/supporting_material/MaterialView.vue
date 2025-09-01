<script setup>
import { onBeforeMount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useSystemStore, useAuthStore, useUploadStore, useSupportingStore } from '@/stores'
import {
  InputDocumentAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  InputStringAdmin,
  InputTextAdmin,
  InputUrlAdmin,
  AdminGlobalContainer,
  BtnDefault
} from '@/components/index'
import router from '@/router'

const route = useRoute()
const systemStore = useSystemStore()
const authStore = useAuthStore()
const uploadStore = useUploadStore()
const supportingStore = useSupportingStore()

const materialId = route.params.id

const material = reactive({
  id: null,
  name: '',
  description: '',
  system: '',
  field_name: '',
  image_supporting_material: null,
  document_supporting_material: null,
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
  await systemStore.getAllSystems()
  const existing = await supportingStore.getMaterialsById(materialId)
  Object.assign(material, existing)
  material.system = material.system.id 
  console.log('Dados iniciais do material:', material)
})

const update = async () => {
  try {
    if (newImage.file) {
      const imageUniqueDescriptionId = crypto.randomUUID()
      newImage.description = `${material.name} - ${imageUniqueDescriptionId}`
      material.autor_user = authStore.userInfo.id

      const result = await uploadStore.createUpload(`images`, newImage)
      material.image_supporting_material = result.attachment_key
      material.document_supporting_material = null
    } else if (newDocument.file) {
      const documentUniqueDescriptionId = crypto.randomUUID()
      newDocument.description = `${material.name} - ${documentUniqueDescriptionId}`
      material.autor_user = authStore.userInfo.id

      const result = await uploadStore.createUpload(`documents`, newDocument)
      material.document_supporting_material = result.attachment_key
      material.image_supporting_material = null
    } else {
      (material.image_supporting_material) ? material.image_supporting_material = material.image_supporting_material.attachment_key 
      : material.document_supporting_material = material.document_supporting_material.attachment_key;
    }

    await supportingStore.updateMaterial(material)

    router.push('/admin/supporting')
  } catch (err) {
    console.error('Erro ao atualizar material de apoio:', err)
  }
}

const confirmDelete = async () => {
  try {
    console.log(materialId)
    await supportingStore.deleteMaterial(materialId)

    setTimeout(() => {
      router.push('/admin/supporting')
    }, 1000)
  } catch (err) {
    console.error('Erro ao deletar material de apoio:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao deletar o material de apoio.'
    showDeleteConfirm.value = false
    showErrorModal.value = true
  }
}
</script>

<template>
  <AdminGlobalContainer>
    <div class="w-[90%] mx-auto space-y-6">
        <div class="absolute top-0 right-0 p-5 z-10 flex gap-5">
            <BtnDefault
            @click="update"
            class="mb-10 h-8 rounded-lg"
            text="Editar"
            background="bg-[#29AC96]"
            :hasLink="false"
            />
            <BtnDefault
            @click="confirmDelete"
            class="mb-10 h-8 rounded-lg"
            text="Excluir"
            background="bg-[#E40000]"
            :hasLink="false"
            />
        </div>
      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="update">
        <InputStringAdmin label="Nome" :modelValue="material.name" @action="material.name = $event" />

        <InputTextAdmin label="Descrição" :modelValue="material.description" @action="material.description = $event"/>

        <InputUrlAdmin label="URL para material de estudo" :modelValue="material.field_name" @action="material.field_name = $event"/>

        <InputSelectAdmin
          label="Sistema"
          :modelValue="material.system"
          :options="systemStore.systems"
          @action="material.system = $event"
        />

        <div class="md:col-span-2 mb-10">
          <InputDocumentAdmin
            v-show="material.document_supporting_material"
            label="Substituir Documento"
            :modelValue="newDocument.file"
            @action="newDocument.file = $event"
          />
        </div>

        <div class="md:col-span-2 mb-10">
          <InputImageAdmin
            v-show="material.image_supporting_material"
            label="Substituir Imagem"
            :modelValue="newImage.file"
            @action="newImage.file = $event"
          />
        </div>
      </form>
    </div>
  </AdminGlobalContainer>
</template>
