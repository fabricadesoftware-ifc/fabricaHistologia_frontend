<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { useAuthStore, useUploadStore, useSystemStore } from '@/stores'
import {
  InputStringAdmin,
  InputTextAdmin,
  InputImageAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin
} from '@/components/index'

import router from '@/router'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const uploadStore = useUploadStore()
const systemStore = useSystemStore()

const route = useRoute()
const systemId = route.params.id

const loading = ref(true)

const newSystem = reactive({
  name: '',
  description: '',
  image: null,
})

const newImage = reactive({
  file: null,
  description: ''
})

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')
const successAction = ref('edit')

const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Sistema Excluído' : 'Sistema Atualizado'
)

onMounted(async () => {
  try {
    loading.value = true
    await systemStore.getSystemById(systemId)
    console.log('Dados do sistema:', systemStore.selectedSystem)
    Object.assign(newSystem, systemStore.selectedSystem)
    console.log('Dados iniciais do sistema:', newSystem)
  } finally {
    loading.value = false
  }
})

const send = async () => {
  try {
    if (newImage.file) {
      const uniqueId = crypto.randomUUID()
      newImage.description = `${newSystem.name} - ${uniqueId}`
      const result = await uploadStore.createUpload('images', newImage)
      newSystem.image = result.attachment_key
      console.log('imagem q deve ser', result.attachment_key)
    } else {
        
      newSystem.image = systemStore.selectedSystem.image?.attachment_key
      console.log('imagem não foi alterada, mantendo a original', systemStore.selectedSystem)
    }
    console.log('Sistema atualizado:', newSystem)
    await systemStore.updateSystem(newSystem);
    console.log('Sistema atualizado com sucesso:');
    successAction.value = 'edit'
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/systems')
    }, 1000)
  } catch (err) {
    console.error('Erro ao editar sistema:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao atualizar o sistema.'
    showErrorModal.value = true
  }
}

// abre modal de confirmação antes de deletar
const tryDelete = () => {
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    console.log(systemId)
    await systemStore.deleteSystem(systemId)
    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/systems')
    }, 1000)
  } catch (err) {
    console.error('Erro ao deletar sistema:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao deletar o sistema.'
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
        <InputStringAdmin
          label="Nome"
          :modelValue="newSystem.name"
          @action="newSystem.name = $event"
        />
        <InputTextAdmin
          label="Descrição"
          :modelValue="newSystem.description"
          @action="newSystem.description = $event"
        />

        <div class="md:col-span-2 mb-10">
          <InputImageAdmin label="Imagem" :modelValue="newImage.file" @action="newImage.file = $event" />
        </div>

        <div class="md:col-span-2 mb-10" v-if="newSystem.image && !newImage.file">
          <img
            :src="systemStore.selectedSystem?.image?.url"
            alt="Pré-visualização da imagem"
            class="max-h-80 object-contain mx-auto rounded-lg shadow"
          />
        </div>
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
    title="Excluir Sistema"
    message="Tem certeza que deseja excluir este sistema? Esta ação não poderá ser desfeita."
    confirm-label="Sim, excluir"
    cancel-label="Cancelar"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="confirmDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>
