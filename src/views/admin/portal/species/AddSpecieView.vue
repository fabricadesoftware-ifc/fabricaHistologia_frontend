<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useAuthStore, useUploadStore, useSpecieStore } from '@/stores'
import {
  NavLateralAdmin,
  ButtonActionAdmin,
  InputDateAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  InputStringAdmin,
  AdminGlobalContainer,
  SucessModalAdmin,
  BtnDefault,
} from '@/components/index'
import router from '@/router'

const authStore = useAuthStore()
const uploadStore = useUploadStore()
const speciesStore = useSpecieStore()

const newSpecies = reactive({
  name: '',
  category: '',
})

onMounted(async ()=> {
  console.log('Dados iniciais da espécie:', newSpecies)
})

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")

const send = async () => {
  try {
    await speciesStore.createSpecie(newSpecies)

    showSuccessModal.value = true
    setTimeout(()=> {
    router.push('/admin/species')
    },1000)
  } catch (err) {
    console.error('Erro ao salvar especie:', err)
    errorMessage.value = err?.message || "Erro inesperado ao cadastrar a Espécie."
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
        <InputStringAdmin label="Nome" :modelValue="newSpecies.name" @action="newSpecies.name = $event"/>

        <InputStringAdmin label="Categoria" :modelValue="newSpecies.category" @action="newSpecies.category = $event"/>

        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>

    <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Espécie Cadastrada"
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
