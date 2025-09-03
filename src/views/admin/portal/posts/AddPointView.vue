<script setup>
import { ref, reactive, onBeforeMount, computed } from 'vue'
import { usePointStore, usePostStore } from '@/stores'
import {
  AdminGlobalContainer,
  InputStringAdmin,
  InputTextAdmin,
  InputSelectAdmin,
  BtnDefault,
  SucessModalAdmin,
  LoadingSpinner
} from '@/components/index'
import router from '@/router'

const pointStore = usePointStore()
const postsStore = usePostStore()

const loading = ref(false)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")

const newPoint = reactive({
  label_title: '',
  description: '',
  position: [],
  color: '',
  posts: null,
  analyzed_structures: '',
  analyzed_functions: ''
})

const colors = [
  { name: 'Amarelo', id: 'yellow' },
  { name: 'Vermelho', id: 'red' },
  { name: 'Azul', id: 'blue' }
]

const postOptions = computed(() => postsStore.posts.map(post => ({
  id: post?.id,
  name: post?.name
})))

const canvas = ref(null)
const ctx = ref(null)
const image = ref(null)
const isDrawing = ref(false)
const BlockDrawn = ref(false)
const labeledAreas = ref([])

// Inicializa canvas
onBeforeMount(async () => {
  try {
    loading.value = true
    await postsStore.getAllPosts()
    ctx.value = canvas.value.getContext('2d')
  } catch (err) {
    errorMessage.value = "Erro ao carregar os posts."
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

/* ==============================
   CARREGAR IMAGEM DO POST
================================ */
const setDefaultImage = () => {
  const postSelected = postsStore.posts.find(p => p.id === Number(newPoint.posts))
  if (!postSelected || !postSelected.image?.url) return

  image.value = new Image()
  image.value.src = postSelected.image.url
  image.value.onload = () => {
    canvas.value.width = image.value.width
    canvas.value.height = image.value.height
    ctx.value?.clearRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.value?.drawImage(image.value, 0, 0)
  }
}

/* ==============================
   FUNÇÕES DE DESENHO
================================ */
const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect()
  return {
    x: (evt.clientX - rect.left) * (canvas.width / rect.width),
    y: (evt.clientY - rect.top) * (canvas.height / rect.height)
  }
}

const startDrawing = (e) => {
  if (!newPoint.label_title || !newPoint.color || !newPoint.description || BlockDrawn.value) return
  isDrawing.value = true
  labeledAreas.value.push({ position: [] })
  ctx.value.strokeStyle = newPoint.color
  ctx.value.lineWidth = 2
  ctx.value.beginPath()
  const pos = getMousePos(canvas.value, e)
  ctx.value.moveTo(pos.x, pos.y)
}

const draw = (e) => {
  if (!isDrawing.value) return
  const pos = getMousePos(canvas.value, e)
  ctx.value.lineTo(pos.x, pos.y)
  ctx.value.stroke()
  labeledAreas.value[labeledAreas.value.length - 1].position.push(pos)
}

const endDrawing = () => {
  if (!isDrawing.value) return
  isDrawing.value = false
  ctx.value.closePath()
  labeledAreas.value[labeledAreas.value.length - 1] = {
    ...newPoint,
    position: labeledAreas.value[labeledAreas.value.length - 1].position
  }
  newPoint.position = labeledAreas.value[0].position
  BlockDrawn.value = true
}

const deletePoint = () => {
  labeledAreas.value.pop()
  newPoint.position = []
  BlockDrawn.value = false
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  if (image.value) ctx.value.drawImage(image.value, 0, 0)
}

/* ==============================
   ADICIONAR PONTO
================================ */
const addPoint = async () => {
  if (loading.value) return
  try {
    if (!BlockDrawn.value) {
      throw new Error("Preencha os campos e desenhe o ponto antes de salvar.")
    }
    loading.value = true
    await pointStore.createPoint(newPoint)
    showSuccessModal.value = true
  } catch (err) {
    console.error("Erro ao criar ponto:", err)
    errorMessage.value = err?.message || "Erro inesperado ao cadastrar o ponto."
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
}

/* ==============================
   MODAIS
================================ */
function handleConfirm() {
  newPoint.label_title = ''
  newPoint.description = ''
  newPoint.color = ''
  newPoint.analyzed_structures = ''
  newPoint.analyzed_functions = ''
  newPoint.position = []
  labeledAreas.value = []
  BlockDrawn.value = false
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  if (image.value) ctx.value.drawImage(image.value, 0, 0)
  showSuccessModal.value = false
}

function handleCancel() {
  router.push('/admin/posts')
}

function closeErrorModal() {
  showErrorModal.value = false
}
</script>

<template>
  <AdminGlobalContainer>
    <div class="w-[90%] mx-auto space-y-6 relative">

      <!-- Overlay de Loading -->
      <div v-if="loading" class="mt-20">
        <LoadingSpinner />
      </div>

      <form v-else class="flex flex-col gap-10 w-full" @submit.prevent="addPoint">
        
        <InputStringAdmin label="Título" :modelValue="newPoint.label_title" @action="newPoint.label_title = $event"/>
        <InputTextAdmin label="Descrição" :modelValue="newPoint.description" @action="newPoint.description = $event"/>
        <InputSelectAdmin label="Cor" :modelValue="newPoint.color" :options="colors" optionLabel="name" optionValue="id" @action="newPoint.color = $event"/>
        
        <InputSelectAdmin 
          label="Post" 
          :modelValue="newPoint.posts" 
          :options="postOptions" 
          optionLabel="name" 
          optionValue="id" 
          @action="val => { newPoint.posts = val; setDefaultImage(); }"
        />

        <InputStringAdmin label="Estruturas Analisadas" :modelValue="newPoint.analyzed_structures" @action="newPoint.analyzed_structures = $event"/>
        <InputStringAdmin label="Funções Analisadas" :modelValue="newPoint.analyzed_functions" @action="newPoint.analyzed_functions = $event"/>

        <div class="md:col-span-2 mb-10 flex flex-col items-center">
          <p class="mb-2 text-sm text-gray-600">Desenhe o ponto no canvas abaixo</p>
          <canvas
            class=" w-8/12 border-2 rounded-lg"
            ref="canvas"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="endDrawing"
          ></canvas>
          <p class="mt-2 text-xs text-gray-500">Errou? 
            <span class="text-[#267A7A] underline cursor-pointer" @click="deletePoint()">Clique aqui para refazer</span>
          </p>
        </div>

        <BtnDefault :disabled="loading" @click="addPoint" class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>

  <SucessModalAdmin
    :show="showSuccessModal"
    subtitle="Sucesso!"
    title="Ponto cadastrado com sucesso!"
    message="Deseja adicionar mais pontos?"
    confirm-label="Sim"
    cancel-label="Não"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />

  <SucessModalAdmin
    :show="showErrorModal"
    subtitle="Erro!"
    :title="errorMessage"
    message="Não foi possível carregar o ponto. Tente novamente ou contate o suporte."
    confirm-label="Fechar"
    :cancel-label="null"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="closeErrorModal"
  />
</template>
