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
  InputTextAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin,
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


const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")

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
    showSuccessModal.value = true
    setTimeout(()=> {
    router.push('/admin/systems')
    }, 1000)
  } catch (err) {
    console.error('Erro ao fazer upload da imagem:', err)
    errorMessage.value = err?.message || "Erro inesperado ao cadastrar a Sistema."
    showErrorModal.value = true
  }
}

function closeErrorModal() {
  showErrorModal.value = false
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

        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>

     <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Sistema cadastrado"
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
