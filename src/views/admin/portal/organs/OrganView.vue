<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { useAuthStore, useUploadStore, useSystemStore, useOrganStore } from '@/stores'
import {
  InputStringAdmin,
  InputTextAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin
} from '@/components/index'

import router from '@/router'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const uploadStore = useUploadStore()
const systemStore = useSystemStore()
const organStore = useOrganStore()

const route = useRoute()
const organId = route.params.id

const loading = ref(true)

const newOrgan = reactive({
  name: '',
  description: '',
  system: '',
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
  successAction.value === 'delete' ? 'Órgão Excluído' : 'Órgão Atualizado'
)

onMounted(async () => {
  try {
    loading.value = true
    await Promise.all([
      systemStore.getSystems(),
      organStore.getOrgansById(organId)
    ])

    Object.assign(newOrgan, organStore.selectedOrgan)
    console.log('Dados do órgão:', newOrgan)
  } finally {
    loading.value = false
  }
})

const send = async () => {
  try {
    if (newImage.file) {
      const uniqueId = crypto.randomUUID()
      newImage.description = `${newOrgan.name} - ${uniqueId}`
      const result = await uploadStore.createUpload('images', newImage)
      newOrgan.image = result.attachment_key
    } else {
      newOrgan.image = organStore.selectedOrgan.image?.attachment_key
    }   
    console.log('Dados do novo órgão:', newOrgan)
    await organStore.updateOrgan(newOrgan)
    successAction.value = 'edit'
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/organs')
    }, 1000)
  } catch (err) {
    console.error('Erro ao editar órgão:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao atualizar o órgão.'
    showErrorModal.value = true
  }
}

// abre modal de confirmação antes de deletar
const tryDelete = () => {
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    await organStore.deleteOrgan(organId)
    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/organs')
    }, 1000)
  } catch (err) {
    console.error('Erro ao deletar órgão:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao deletar o órgão.'
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
          @click="confirmDelete"
          class="mb-10 h-8 rounded-lg"
          text="Excluir"
          background="bg-[#E40000]"
          :hasLink="false"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <InputStringAdmin
          label="Nome"
          :modelValue="newOrgan.name"
          @action="newOrgan.name = $event"
        />
        <InputTextAdmin
          label="Descrição"
          :modelValue="newOrgan.description"
          @action="newOrgan.description = $event"
        />

        <InputSelectAdmin
          label="Sistema"
          :modelValue="newOrgan.system"
          :options="systemStore.systems"
          @action="newOrgan.system = $event"
        />

        <div class="md:col-span-2 mb-10">
          <InputImageAdmin label="Imagem" :modelValue="newImage.file" @action="newImage.file = $event" />
        </div>

        <div class="md:col-span-2 mb-10" v-if="newOrgan.image && !newImage.file">
          <img
            :src="organStore.selectedOrgan?.image?.url"
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
    title="Excluir Órgão"
    message="Tem certeza que deseja excluir este órgão? Esta ação não poderá ser desfeita."
    confirm-label="Sim, excluir"
    cancel-label="Cancelar"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="confirmDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>
