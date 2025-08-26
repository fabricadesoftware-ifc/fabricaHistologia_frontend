<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
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
  SucessModalAdmin,
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
  autor_user: Number(authStore.userInfo.id),
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

// controla os modais
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")

onBeforeMount(async ()=> {
  await specieStore.getSpecies()
  await organStore.getOrgans()
  newPost.date_analysis = formatedData()
  newPost.post_date = formatedData()
})

const send = async () => {
  try {
    if (newImage.file) {
      const imageUiqueDescriptionId = crypto.randomUUID()
      newImage.description = `${newPost.name} - ${imageUiqueDescriptionId}`
      newPost.autor_user = authStore.userInfo.id

      // Cria FormData
      const formData = new FormData()
      formData.append('file', newImage.file)
      formData.append('description', newImage.description)

      const result = await uploadStore.createUpload(`images`, formData)
      newPost.image = result.attachment_key
    }
    await postStore.createPost(newPost)

    // abre modal de sucesso
    showSuccessModal.value = true
  } catch (err) {
    console.error('Erro ao criar post:', err)
    errorMessage.value = err?.message || "Erro inesperado ao cadastrar a lâmina."
    showErrorModal.value = true
  }
}

// ações do modal de sucesso
function handleConfirm() {
  router.push('/admin/posts/add-point') // vai para tela de pontos
}
function handleCancel() {
  router.push('/admin/posts') // vai para lista de posts
}

// fechar modal de erro
function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <div class="w-[90%] mx-auto space-y-6">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
        <InputStringAdmin label="Nome" :modelValue="newPost.name" @action="newPost.name = $event"/>

        <div class="w-full flex justify-between gap-10">
          <InputDateAdmin class="w-[48%]" label="Data de Análise" :modelValue="newPost.date_analysis" @action="newPost.date_analysis = $event"/>
          <InputDateAdmin class="w-[48%]" label="Data de Postagem" :modelValue="newPost.post_date" @action="newPost.post_date = $event"/>
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

  <!-- Modal de sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Lâmina cadastrada"
    message="Deseja criar pontos a lâmina?"
    confirm-label="Sim"
    cancel-label="Não"
    @confirm="handleConfirm"
    @cancel="handleCancel"
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