<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import {
  useSupportingStore,
  useUploadStore,
  useAuthStore,
  useSystemStore
} from '@/stores'

import {
  InputStringAdmin,
  InputSelectAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin,
  LoadingSpinner
} from '@/components/index'

// Stores
const supportingMaterialStore = useSupportingStore()
const uploadStore = useUploadStore()
const systemStore = useSystemStore()
const authStore = useAuthStore()

// Router
const route = useRoute()
const materialId = route.params.id

// State
const loading = ref(true)
const actionLoading = ref(false)

const material = reactive({
  name: '',
  description: '',
  field_name: '',
  system: '',
  image_supporting_material: null,
  document_supporting_material: null
})

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')
const successAction = ref('edit')

const successTitle = computed(() =>
  successAction.value === 'delete'
    ? 'Material Excluído'
    : 'Material Atualizado'
)

// Options for selects
const imagesOptions = computed(() =>
  uploadStore.images?.map((upload) => ({
    name: upload.description,
    id: upload.attachment_key,
    url: upload.url
  })) || []
)

const documentsOptions = computed(() =>
  uploadStore.documents?.map((doc) => ({
    name: doc.description,
    id: doc.attachment_key,
    url: doc.url
  })) || []
)

// Load data
onMounted(async () => {
  try {
    loading.value = true
    await Promise.all([
      uploadStore.getAllUploads('images'),
      uploadStore.getAllUploads('documents'),
      supportingMaterialStore.getMaterialsById(materialId),
      systemStore.getAllSystems()
    ])

    Object.assign(material, supportingMaterialStore.selectedMaterial)
    material.image_supporting_material =
      supportingMaterialStore.selectedMaterial.image_supporting_material?.attachment_key || null
    material.document_supporting_material =
      supportingMaterialStore.selectedMaterial.document_supporting_material?.attachment_key || null
    material.system = supportingMaterialStore.selectedMaterial.system?.id || ''
  } catch (err) {
    console.error('Erro ao carregar material:', err)
    errorMessage.value =
      err?.response?.data
        ? Object.values(err.response.data)
            .map(v => Array.isArray(v) ? v.join(', ') : v)
            .join('\n')
        : err?.message || 'Erro ao carregar o material para edição.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

// Actions
const send = async () => {
  actionLoading.value = true
  try {
    await supportingMaterialStore.updateMaterial(material)
    successAction.value = 'edit'
    showSuccessModal.value = true
    setTimeout(() => router.push('/admin/supporting'), 1000)
  } catch (err) {
    console.error('Erro ao editar material:', err)
    errorMessage.value =
      err?.response?.data
        ? Object.values(err.response.data)
            .map(v => Array.isArray(v) ? v.join(', ') : v)
            .join('\n')
        : err?.message || 'Erro inesperado ao atualizar o material.'
    showErrorModal.value = true
  } finally {
    actionLoading.value = false
  }
}

const confirmDelete = async () => {
  actionLoading.value = true
  try {
    await supportingMaterialStore.deleteSupportingMaterial(materialId)
    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true
    setTimeout(() => router.push('/admin/supporting-materials'), 1000)
  } catch (err) {
    console.error('Erro ao deletar material:', err)
    errorMessage.value =
      err?.response?.data
        ? Object.values(err.response.data)
            .map(v => Array.isArray(v) ? v.join(', ') : v)
            .join('\n')
        : err?.message || 'Erro inesperado ao deletar o material.'
    showErrorModal.value = true
  } finally {
    actionLoading.value = false
  }
}

function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <!-- Loading geral -->
    <div v-if="loading || actionLoading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <LoadingSpinner class="mt-0" />
    </div>

    <!-- Form -->
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
          @click="showDeleteConfirm = true"
          class="mb-10 h-8 rounded-lg"
          text="Excluir"
          background="bg-[#E40000]"
          :hasLink="false"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <InputStringAdmin label="Nome" :modelValue="material.name" @action="material.name = $event" />

        <InputStringAdmin label="Descrição" :modelValue="material.description" @action="material.description = $event" />

        <InputStringAdmin label="Link para o conteúdo" :modelValue="material.field_name" @action="material.field_name = $event" />

        <InputSelectAdmin label="Sistema" :modelValue="material.system" :options="systemStore.systems" @action="material.system = $event" />

        <InputSelectAdmin label="Imagem" :modelValue="material.image_supporting_material" :options="imagesOptions" @action="material.image_supporting_material = $event" />

        <InputSelectAdmin label="Documento" :modelValue="material.document_supporting_material" :options="documentsOptions" @action="material.document_supporting_material = $event" />
      </div>
    </div>
  </AdminGlobalContainer>

  <!-- Modais -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    :title="successTitle"
    message="Operação realizada com sucesso!"
    confirm-label=""
    cancel-label=""
    :duration="1"
  />

  <SucessModalAdmin
    :show="showErrorModal"
    subtitle="Erro!"
    :title="errorMessage"
    message="Tente novamente ou contate o suporte."
    confirm-label="Fechar"
    cancel-label=""
    @confirm="closeErrorModal"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
  />

  <SucessModalAdmin
    :show="showDeleteConfirm"
    subtitle="Confirmação"
    title="Excluir Material"
    message="Tem certeza que deseja excluir este material? Esta ação não poderá ser desfeita."
    confirm-label="Sim, excluir"
    cancel-label="Cancelar"
    @confirm="confirmDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>
