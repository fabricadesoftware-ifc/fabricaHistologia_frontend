<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useSpecieStore, useOrganStore, useAuthStore, useUploadStore, usePostStore } from '@/stores'
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

const specieStore = useSpecieStore()
const organStore = useOrganStore()
const authStore = useAuthStore()
const uploadStore = useUploadStore()
const postStore = usePostStore()

const newPost = reactive({
  name: '',
  type_post: '',
  species: '',
  organ: '',
  date_analysis: '',
  post_date: '',
  type_cut: '',
  increase: '',
  coloring: '',
  autor_user: null,
  is_verified: false,
  image: null
})

const newImage = reactive({
  file: null,
  description: '',
})

const postOptions = [
  {name: 'Histologia', id: 1},
  {name: 'Patologia', id: 2}
]

const formatedData = () => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  return `${year}-${month}-${day}`
}

onMounted(async ()=> {
  await specieStore.getSpecies()
  await organStore.getOrgans()
  console.log(authStore.userInfo)
  newPost.date_analysis = formatedData()
  newPost.post_date = formatedData()
})

const send = async () => {
  try {
    const imageUiqueDescriptionId = crypto.randomUUID()
    newImage.description = `${newPost.name} - ${imageUiqueDescriptionId}`
    newPost.autor_user = authStore.userInfo.id

    const result = await uploadStore.createUpload(`images`, newImage)
    console.log('imagem criada', result)

    newPost.image = result.attachment_key
    console.log(newPost)
    await postStore.createPost(newPost)

    router.push('/admin/posts')
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
        <InputStringAdmin label="Nome" :modelValue="newPost.name" @action="newPost.name = $event"/>

        <div class="w-full  flex justify-between gap-10">
    <InputDateAdmin class="w-[48%]" label="Data de Análise" :modelValue="newPost.date_analysis" @action="newPost.date_analysis = $event"/>

    <InputDateAdmin class="w-[48%]"  label="Data de Postagem" :modelValue="newPost.post_date" @action="newPost.post_date = $event"/>

      </div>

      <InputSelectAdmin label="Espécie" :modelValue="newPost.species" :options="specieStore.species" @action="newPost.species = $event"/>

      <InputStringAdmin label="Tipo de Corte" :modelValue="newPost.type_cut" @action="newPost.type_cut = $event"/>

      <InputStringAdmin label="Aumento" :modelValue="newPost.increase" @action="newPost.increase = $event"/>

      <InputStringAdmin label="Coloração" :modelValue="newPost.coloring" @action="newPost.coloring = $event"/>

      <InputSelectAdmin label="Tipo de Postagem" :modelValue="newPost.type_post" :options="postOptions" @action="newPost.type_post = $event"/>

      <InputSelectAdmin label="Órgão" :modelValue="newPost.organ" :options="organStore.organs" @action="newPost.organ = $event"/>
      

        <div class="md:col-span-2 mb-10">
          <InputImageAdmin label="Imagem" :modelValue="newImage.file" @action="newImage.file = $event"/>
        </div>

        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>
</template>
