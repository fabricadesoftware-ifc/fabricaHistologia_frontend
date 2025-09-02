<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useAuthStore, useUploadStore, useSpecieStore } from '@/stores'
import {
  AdminGlobalContainer,
  BtnDefault,
  InputStringAdmin,
  SucessModalAdmin,
  LoadingSpinner
} from '@/components/index'
import router from '@/router'

const authStore = useAuthStore()
const uploadStore = useUploadStore()
const speciesStore = useSpecieStore()

const newSpecies = reactive({
  name: '',
  category: '',
})

const loading = ref(false)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")

onMounted(async ()=> {
  console.log('Dados iniciais da espécie:', newSpecies)
})

const send = async () => {
  loading.value = true
  try {
    await speciesStore.createSpecie(newSpecies)
    showSuccessModal.value = true
    setTimeout(()=> {
      router.push('/admin/species')
    },1000)
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

function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>  
  <AdminGlobalContainer>
    <!-- overlay de loading -->
    <div v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <LoadingSpinner class="mt-0" />
    </div>

    <div v-else class="w-[90%] mx-auto space-y-6">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
        <InputStringAdmin label="Nome" :modelValue="newSpecies.name" @action="newSpecies.name = $event"/>
        <InputStringAdmin label="Categoria" :modelValue="newSpecies.category" @action="newSpecies.category = $event"/>
        <BtnDefault class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>

  <!-- modal de sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Espécie Cadastrada"
    :duration="1"
    confirm-label=""
    cancel-label=""
  />

  <!-- modal de erro -->
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
