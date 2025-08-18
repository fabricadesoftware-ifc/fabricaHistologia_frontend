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

const send = async () => {
  try {
    await speciesStore.createSpecie(newSpecies)

    router.push('/admin/species')
  } catch (err) {
    console.error('Erro ao salvar especie:', err)
  }
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
</template>
