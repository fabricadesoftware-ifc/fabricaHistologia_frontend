<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { useAuthStore, useSpecieStore } from '@/stores'
import {
  InputStringAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin
} from '@/components/index'

import router from '@/router'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const specieStore = useSpecieStore()

const route = useRoute()
const specieId = route.params.id

const loading = ref(true)

const newSpecies = reactive({
  name: '',
  category: '',
})

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')
const successAction = ref('edit')

const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Espécie Excluída' : 'Espécie Atualizada'
)

onMounted(async () => {
  try {
    loading.value = true
    await specieStore.getSpeciesById(specieId)
    console.log('Dados da espécie:', specieStore.selectedSpecie)
    Object.assign(newSpecies, specieStore.selectedSpecie)
    newSpecies.autor_user = authStore.userInfo.id
  } finally {
    loading.value = false
  }
})

const send = async () => {
  try {
    await specieStore.updateSpecie(newSpecies)
    successAction.value = 'edit'
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/species')
    }, 1000)
  } catch (err) {
    console.error('Erro ao editar espécie:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao atualizar a espécie.'
    showErrorModal.value = true
  }
}

// abre modal de confirmação antes de deletar
const tryDelete = () => {
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    await specieStore.deleteSpecie(specieId)
    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/species')
    }, 1000)
  } catch (err) {
    console.error('Erro ao deletar espécie:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao deletar a espécie.'
    showDeleteConfirm.value = false
    showErrorModal.value = true
  }
}

function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <!-- overlay de carregamento -->
    <div v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div
        class="animate-spin rounded-full h-16 w-16 border-4 border-[#29AC96] border-t-transparent"
      ></div>
    </div>

    <div v-else class="w-[90%] mx-auto space-y-6">
      <div class="absolute top-0 right-0 p-5 z-10 flex gap-5">
        <BtnDefault
          @click="send"
          class="mb-10 h-8 rounded-lg"
          text="Editar"
          background="bg-[#29AC96]"
          :hasLink="false"
        />
        <BtnDefault
          @click="tryDelete"
          class="mb-10 h-8 rounded-lg"
          text="Excluir"
          background="bg-[#E40000]"
          :hasLink="false"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <InputStringAdmin label="Nome" :modelValue="newSpecies.name" @action="newSpecies.name = $event" />
        <InputStringAdmin label="Categoria" :modelValue="newSpecies.category" @action="newSpecies.category = $event" />
      </div>
    </div>
  </AdminGlobalContainer>

  <!-- modal de sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    :title="successTitle"
    message="Operação realizada com sucesso."
    :cancel-label="null"
    :confirm-label="null"
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

  <!-- modal de confirmação delete -->
  <SucessModalAdmin
    :show="showDeleteConfirm"
    subtitle="Confirmação"
    title="Excluir Espécie"
    message="Tem certeza que deseja excluir esta espécie? Esta ação não poderá ser desfeita."
    confirm-label="Sim, excluir"
    cancel-label="Cancelar"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="confirmDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>
