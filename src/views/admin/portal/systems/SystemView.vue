<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import {
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

const systemStore = useSystemStore()
const uploadStore = useUploadStore()
const authStore = useAuthStore()

const route = useRoute()
const systemId = route.params.id

// estado de carregamento
const loading = ref(true)

// objeto reativo para o formulário
const newSystem = reactive({
  id: '',
  name: '',
  description: '',
  image: null
})

// opções de imagens carregadas
const imagesOptions = computed(() => {
  return (
    uploadStore.allUploads?.map((upload) => ({
      name: upload.description,
      value: upload.attachment_key,
      url: upload.url,
      attachment_key: upload.attachment_key
    })) || []
  )
})

const imageKey = ref(null)

// observa alteração na imagem
watch(imageKey, (val) => {
  const selected = uploadStore.allUploads?.find((img) => img.description === val)
  if (selected) {
    newSystem.image = {
      description: selected.description,
      url: selected.url,
      attachment_key: selected.attachment_key
    }
  }
})

// estados de modais e mensagens
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')
const successAction = ref('edit')

const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Sistema Excluído' : 'Sistema Atualizado'
)

// carregamento inicial
onMounted(async () => {
  try {
    loading.value = true
    await uploadStore.getAllUploads('images')

    if (systemId) {
      const fetchedSystem = await systemStore.getSystemById(systemId)
      if (fetchedSystem) {
        Object.assign(newSystem, fetchedSystem)
        if (fetchedSystem.image) {
          newSystem.image = {
            description: fetchedSystem.image.description,
            value: fetchedSystem.image.attachment_key,
            url: fetchedSystem.image.url,
            attachment_key: fetchedSystem.image.attachment_key
          }
          console.log(newSystem.image)
          imageKey.value = newSystem.image.description
        }
      }
    }
  } finally {
    loading.value = false
  }
})

// função de salvar ou atualizar
const send = async () => {
  try {
    newSystem.image = newSystem.image.attachment_key
    console.log(newSystem)

    await systemStore.updateSystem(newSystem)
    successAction.value = 'edit'
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/systems')
    }, 1000)
  } catch (err) {
    console.error('Erro ao editar System:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao atualizar a Sistema.'
    showErrorModal.value = true
  }
}

// confirmar exclusão
const tryDelete = () => {
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
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
    <!-- Overlay de carregamento -->
    <div v-if="loading" class="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-[#29AC96] border-t-transparent"></div>
    </div>

    <div v-else class="w-[90%] mx-auto space-y-6">
      <div class="absolute top-0 right-0 p-5 z-10 flex gap-5">
        <BtnDefault
          @click="send"
          class="mb-10 h-8 rounded-lg"
          text="Salvar"
          background="bg-[#29AC96]"
          :hasLink="false"
        />
        <BtnDefault
          v-if="systemId"
          @click="tryDelete"
          class="mb-10 h-8 rounded-lg"
          text="Excluir"
          background="bg-[#E40000]"
          :hasLink="false"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <!-- Nome -->
        <InputStringAdmin label="Nome" :modelValue="newSystem.name" @action="newSystem.name = $event" />

        <!-- Descrição -->
        <InputStringAdmin label="Descrição" :modelValue="newSystem.description" @action="newSystem.description = $event" />

        <!-- Selecionar Imagem -->
        <InputSelectAdmin
          label="Imagem"
          :modelValue="imageKey"
          :options="imagesOptions"
          @action="imageKey = $event"
        />

        <!-- Pré-visualização -->
        <div class="md:col-span-2 mb-10" v-if="newSystem.image?.url">
          <img
            :src="newSystem.image?.url"
            alt="Pré-visualização da imagem"
            class="max-h-80 object-contain mx-auto rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  </AdminGlobalContainer>

  <!-- Modal de Sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    :title="successTitle"
    message="Operação concluída com sucesso."
    :cancel-label="null"
    :confirm-label="null"
  />

  <!-- Modal de Erro -->
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

  <!-- Modal de Confirmação de Exclusão -->
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
