<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useAuthStore, useUploadStore, useSystemStore } from '@/stores'
import {
  NavLateralAdmin,
  ButtonActionAdmin,
  InputDateAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  InputStringAdmin,
  AdminGlobalContainer,
  BtnDefault,
} from '@/components/index'
import router from '@/router'

const authStore = useAuthStore()
const uploadStore = useUploadStore()
const systemsStore = useSystemStore()

const newSystem = reactive({
  name: '',
  description: '',
  image: null
})

const newImage = reactive({
  file: null,
  description: '',
})

onMounted(async ()=> {
  console.log('Dados iniciais do sistema:', newSystem)
})

const send = async () => {
  try {
    if (newImage.file) {
    const imageUiqueDescriptionId = crypto.randomUUID()
    newImage.description = `${newSystem.name} - ${imageUiqueDescriptionId}`
    newSystem.autor_user = authStore.userInfo.id

    const result = await uploadStore.createUpload(`images`, newImage)
    console.log('imagem criada', result)

    newSystem.image = result.attachment_key
    console.log(newSystem)
    }
    await systemsStore.createSystem(newSystem)

    router.push('/admin/systems')
  } catch (err) {
    console.error('Erro ao fazer upload da imagem:', err)
  }
}
</script>

<template>  
    
    <AdminGlobalContainer>
    <div class="w-[90%] mx-auto space-y-6">

      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
        <InputStringAdmin label="Nome" :modelValue="newSystem.name" @action="newSystem.name = $event"/>

        <InputStringAdmin label="Descrição" :modelValue="newSystem.description" @action="newSystem.description = $event"/>


        <div class="md:col-span-2 mb-10">
          <InputImageAdmin label="Imagem" :modelValue="newImage.file" @action="newImage.file = $event"/>
        </div>

        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>
</template>
