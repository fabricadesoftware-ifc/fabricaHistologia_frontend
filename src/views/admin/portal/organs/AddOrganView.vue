<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useSystemStore, useOrganStore, useAuthStore, useUploadStore } from '@/stores'
import {
  NavLateralAdmin,
  ButtonActionAdmin,
  InputDateAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  InputStringAdmin,
  InputTextAdmin,
  AdminGlobalContainer,
  BtnDefault,
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

onMounted(async ()=> {
  await systemStore.getSystems()
  console.log(authStore.userInfo)

  console.log('Dados iniciais do post:', newOrgan)
})

const send = async () => {
  try {
    if (newImage.file) {
    const imageUniqueDescriptionId = crypto.randomUUID()
    newImage.description = `${newOrgan.name} - ${imageUniqueDescriptionId}`
    newOrgan.autor_user = authStore.userInfo.id

    const result = await uploadStore.createUpload(`images`, newImage)
    console.log('imagem criada', result)

    newOrgan.image = result.attachment_key
    console.log(newOrgan)
    }
    await organStore.createOrgan(newOrgan)

    router.push('/admin/organs')
  } catch (err) {
    console.error('Erro ao fazer upload da imagem:', err)
  }
}

onMounted(()=> {
  
})
</script>

<template>
  
    
    <AdminGlobalContainer>
    <div class="w-[90%] mx-auto space-y-6">

      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
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
</template>
