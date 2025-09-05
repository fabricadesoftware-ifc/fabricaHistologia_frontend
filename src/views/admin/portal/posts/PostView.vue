<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import {
  useSpecieStore,
  useOrganStore,
  useAuthStore,
  useUploadStore,
  usePostStore,
  usePointStore
} from '@/stores'
import {
  InputDateAdmin,
  InputSelectAdmin,
  InputStringAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin,
  LoadingSpinner
} from '@/components/index'

import router from '@/router'
import { useRoute } from 'vue-router'

const specieStore = useSpecieStore()
const organStore = useOrganStore()
const authStore = useAuthStore()
const uploadStore = useUploadStore()
const postStore = usePostStore()
const pointStore = usePointStore()

const route = useRoute()
const postId = route.params.id

const loading = ref(false)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref('')
const showDeleteConfirm = ref(false) // modal de confirmação delete

const newPost = reactive({
  name: '',
  type_post: '',
  species: '',
  organ: '',
  date_analysis: '',
  post_date: '',
  type_cut: '',
  increase: '',
  coloring: '',
  autor_user: Number(authStore.userInfo.id),
  is_verified: false,
  image: null
})

const postOptions = [
  { name: 'Histologia', id: 1 },
  { name: 'Patologia', id: 2 }
]

const imagesOptions = computed(() => {
  return (
    uploadStore.allUploads?.map((upload) => ({
      name: upload.description,
      value: upload.attachment_key,
      file: upload.file,
      attachment_key: upload.attachment_key
    })) || []
  )
})

const imageKey = ref(null)
watch(imageKey, (val) => {
  const selected = uploadStore.allUploads?.find((img) => img.description === val)
  if (selected) {
    newPost.image = {
      name: selected.description,
      url: selected.url,
      attachment_key: selected.attachment_key
    }
  }
})

const successAction = ref('edit')
const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Lâmina Excluída' : 'Lâmina Atualizada'
)

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      uploadStore.getAllUploads('images'),
      specieStore.getAllSpecies(),
      organStore.getAllOrgans(),
      postStore.getPostsById(postId),
      pointStore.getAllPointsByPosts(postId)
    ])

    Object.assign(newPost, postStore.selectedPost)
    newPost.autor_user = authStore.userInfo.id
    newPost.species = postStore.selectedPost.species?.id || ''
    newPost.organ = postStore.selectedPost.organ?.id || ''
    newPost.type_post = postStore.selectedPost.type_post || ''

    if (postStore.selectedPost.image) {
      newPost.image = {
        name: postStore.selectedPost.image.description,
        value: postStore.selectedPost.image.attachment_key,
        url: postStore.selectedPost.image.file,
        attachment_key: postStore.selectedPost.image.attachment_key
      }
      imageKey.value = newPost.image.name
    }
  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = "Erro inesperado ao carregar dados."
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

const send = async () => {
  loading.value = true
  try {
    newPost.image = newPost.image.attachment_key
    await postStore.updatePosts(newPost, route.params.id)
    successAction.value = 'edit'
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/posts')
    }, 1000)
  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = err?.message || "Erro inesperado ao atualizar a lâmina."
    }
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

const tryDelete = () => {
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  loading.value = true
  try {
    await postStore.deletePosts(postId)
    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true
    setTimeout(() => {
      router.push('/admin/posts')
    }, 1000)
  } catch (err) {
    if (err?.response?.data) {
      const data = err.response.data
      errorMessage.value = Object.values(data)
        .map(v => Array.isArray(v) ? v.join(', ') : v)
        .join('\n')
    } else {
      errorMessage.value = err?.message || "Erro inesperado ao deletar a lâmina."
    }
    showDeleteConfirm.value = false
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
    <!-- overlay de carregamento -->
    <LoadingSpinner v-if="loading" class="mt-20" />

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

      <div class="flex flex-col gap-10 w-full">
        <InputStringAdmin label="Nome" :modelValue="newPost.name" @action="newPost.name = $event" />
        <div class="w-full flex justify-between gap-10">
          <InputDateAdmin
            class="w-[48%]"
            label="Data de Análise"
            :modelValue="newPost.date_analysis"
            @action="newPost.date_analysis = $event"
          />
          <InputDateAdmin
            class="w-[48%]"
            label="Data de Postagem"
            :modelValue="newPost.post_date"
            @action="newPost.post_date = $event"
          />
        </div>

        <InputSelectAdmin
          label="Espécie"
          :modelValue="newPost.species"
          :options="specieStore.allSpecies"
          @action="newPost.species = $event"
        />
        <InputStringAdmin
          label="Tipo de Corte"
          :modelValue="newPost.type_cut"
          @action="newPost.type_cut = $event"
        />
        <InputStringAdmin
          label="Aumento"
          :modelValue="newPost.increase"
          @action="newPost.increase = $event"
        />
        <InputStringAdmin
          label="Coloração"
          :modelValue="newPost.coloring"
          @action="newPost.coloring = $event"
        />
        <InputSelectAdmin
          label="Tipo de Postagem"
          :modelValue="newPost.type_post"
          :options="postOptions"
          @action="newPost.type_post = $event"
        />
        <InputSelectAdmin
          label="Órgão"
          :modelValue="newPost.organ"
          :options="organStore.organs"
          @action="newPost.organ = $event"
        />

        <InputSelectAdmin
          label="Imagem"
          :modelValue="imageKey"
          :options="imagesOptions"
          @action="imageKey = $event"
        />

        <div class="flex flex-col mb-10">
          <img
            :src="newPost.image?.url"
            alt="Pré-visualização da imagem"
            class="max-h-80 object-contain mx-auto rounded-lg shadow"
          />
        </div>

        <div v-if="pointStore.pointsByPosts.length > 0">
        <h2 class="font-semibold text-lg mb-2 mt-4 text-[#267A7A]">Pontos da Lâmina</h2>
        <ul class="space-y-2">
          <li
            v-for="(points, index) in pointStore.pointsByPosts"
            @click="router.push(`/admin/posts/points/${points.id}`)"
            :key="index"
            class="cursor-pointer mb-5 bg-[#F5F5F5] hover:bg-[#29AC96]/90 transition-colors duration-150 rounded-lg px-4 py-3 shadow-sm flex items-center gap-2 group"
          >
            <span class="mdi mdi-map-marker text-[#267A7A] group-hover:text-white text-xl"></span>
            <span class="font-medium text-[#267A7A] group-hover:text-white">{{
              points.label_title
            }}</span>
          </li>
        </ul>
        </div>
      </div>
    </div>
  </AdminGlobalContainer>

  <!-- modal de sucesso -->
  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    :title="successTitle"
    :message="successMessage"
    :cancel-label="null"
    :confirm-label="null"
    :duration="1"
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
    title="Excluir Lâmina"
    message="Tem certeza que deseja excluir esta lâmina? Esta ação não poderá ser desfeita."
    confirm-label="Sim, excluir"
    cancel-label="Cancelar"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="confirmDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>
