<script setup>
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useSpecieStore } from '@/stores'
import {
  InputStringAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin,
  LoadingSpinner
} from '@/components/index'
import router from '@/router'
import { useRoute } from 'vue-router'

// Stores
const specieStore = useSpecieStore()

// Route params
const route = useRoute()
const specieId = route.params.id

// Estado de carregamento
const loading = ref(true)

// Dados do modelo
const specie = reactive({
  name: '',
  category: ''
})

// Modais de status
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')

const successAction = ref('edit')
const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Espécie Excluída' : 'Espécie Atualizada'
)

// Carrega dados iniciais
onBeforeMount(async () => {
  loading.value = true
  try {
    await specieStore.getSpeciesById(specieId)
    Object.assign(specie, specieStore.selectedSpecie)
  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = err?.message || 'Falha ao carregar os dados da espécie.'
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

// Atualiza espécie
const send = async () => {
  loading.value = true
  try {
    await specieStore.updateSpecie(specie)
    successAction.value = 'edit'
    showSuccessModal.value = true
    setTimeout(() => router.push('/admin/species'), 1000)
  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = err?.message || 'Erro inesperado ao atualizar a espécie.'
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

// Abre modal de confirmação de exclusão
const tryDelete = () => {
  showDeleteConfirm.value = true
}

// Confirma exclusão
const confirmDelete = async () => {
  loading.value = true
  try {
    await specieStore.deleteSpecie(specieId)
    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true
    setTimeout(() => router.push('/admin/species'), 1000)
  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = err?.message || 'Erro inesperado ao deletar a espécie.'
    }
    showDeleteConfirm.value = false
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

// Fecha modal de erro
const closeErrorModal = () => {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <!-- overlay de loading -->
    <div v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <LoadingSpinner class="mt-0" />
    </div>

    <!-- Conteúdo -->
    <div v-else class="w-[90%] mx-auto space-y-6">
      <!-- Botões de ação -->
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

      <!-- Formulário -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <InputStringAdmin
          label="Nome"
          :modelValue="specie.name"
          @action="specie.name = $event"
        />
        <InputStringAdmin
          label="Categoria"
          :modelValue="specie.category"
          @action="specie.category = $event"
        />
      </div>
    </div>
  </AdminGlobalContainer>

  <!-- Modal de sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    :title="successTitle"
    message="Ação realizada com sucesso."
    :cancel-label="null"
    :confirm-label="null"
    :duration="1"
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

  <!-- Modal de confirmação de exclusão -->
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
