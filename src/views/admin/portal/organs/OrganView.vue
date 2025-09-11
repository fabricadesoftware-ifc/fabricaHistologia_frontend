<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import {
  useOrganStore,
  useSystemStore,
  useUploadStore,
  useAuthStore
} from '@/stores'
import {
  InputStringAdmin,
  InputSelectAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin
} from '@/components/index'

import router from '@/router'
import { useRoute } from 'vue-router'

// Stores
const organStore = useOrganStore()
const systemStore = useSystemStore()
const uploadStore = useUploadStore()
const authStore = useAuthStore()

// Route params
const route = useRoute()
const organId = route.params.id

const loading = ref(true)

// Modelo do órgão
const organ = reactive({
  name: '',
  description: '',
  system: '',
  image: null
})

// Options para imagens
const imagesOptions = computed(() => {
  return (
    uploadStore.allUploads?.map((upload) => ({
      name: upload.description,
      value: upload.attachment_key,
      url: upload.url
    })) || []
  )
})

// Controle da imagem selecionada
const imageKey = ref(null)
watch(imageKey, (val) => {
  const selected = uploadStore.allUploads?.find((img) => img.description === val)
  if (selected) {
    organ.image = {
      name: selected.description,
      url: selected.url,
      attachment_key: selected.attachment_key
    }
  }
})

// Modais de status

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')


const successAction = ref('edit')

const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Órgão Excluído' : 'Órgão Atualizado'
)

// Carrega dados iniciais

onMounted(async () => {
  try {
    loading.value = true
    await Promise.all([

      uploadStore.getAllUploads('images'),

      systemStore.getAllSystems(),
      organStore.getOrgansById(organId)
    ])

    Object.assign(organ, organStore.selectedOrgan)
    organ.system = organStore.selectedOrgan.system?.id || ''

    if (organStore.selectedOrgan.image) {
      organ.image = {
        name: organStore.selectedOrgan.image.description,
        value: organStore.selectedOrgan.image.attachment_key,
        url: organStore.selectedOrgan.image.url,
        attachment_key: organStore.selectedOrgan.image.attachment_key
      }
      imageKey.value = organ.image.name
    }
  } finally {
    loading.value = false
  }
})

// Atualiza órgão

const send = async () => {
  try {
    organ.image = organ.image?.attachment_key
    await organStore.updateOrgan(organ)
    successAction.value = 'edit'
    showSuccessModal.value = true
      setTimeout(() => {
      router.push('/admin/organs')
    }, 1000)
  } catch (err) {
    console.error('Erro ao editar órgão:', err)
    if (err?.response?.data) {
      const data = err.response.data
      // transforma valores das chaves em string legível
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = 'Erro inesperado ao atualizar o órgão.'
    }
    showErrorModal.value = true
  }
}

// Confirma exclusão
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
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = err?.message || 'Erro inesperado ao deletar o órgão.'
    }
    showDeleteConfirm.value = false
    showErrorModal.value = true
  }
}


// Tenta excluir órgão

const tryDelete = () => {
  showDeleteConfirm.value = true
}

// Fecha modal de erro

function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <!-- Overlay de carregamento -->
    <div v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-[#29AC96] border-t-transparent"></div>
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

      <div class="flex flex-col gap-10 w-full">
        <!-- Nome -->
        <InputStringAdmin
          label="Nome"
          :modelValue="organ.name"
          @action="organ.name = $event"
        />

        <!-- Sistema -->
        <InputSelectAdmin
          label="Sistema"
          :modelValue="organ.system"
          :options="systemStore.systems"
          @action="organ.system = $event"
        />

        <!-- Descrição -->
        <div class="md:col-span-2">
          <InputStringAdmin
            label="Descrição"
            :modelValue="organ.description"
            @action="organ.description = $event"
          />
        </div>

        <!-- Imagem -->
        <InputSelectAdmin
          label="Imagem"
          :modelValue="imageKey"
          :options="imagesOptions"
          @action="imageKey = $event"
        />

        <div class="md:col-span-2 mb-10">
          <img
            v-if="organ.image?.url"
            :src="organ.image?.url"
            alt="Pré-visualização da imagem"
            class="max-h-80 object-contain mx-auto rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  </AdminGlobalContainer>

  <!-- Modal de sucesso -->

  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    :title="successTitle"
    message="Ação realizada com sucesso."
    :duration="1"
    :cancel-label="null"
    :confirm-label="null"
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