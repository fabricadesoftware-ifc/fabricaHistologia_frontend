<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed } from 'vue'
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
const errorMessage = ref('')

// novo ponto
const newPoint = reactive({
  label_title: '',
  description: '',
  position: [],
  color: '',
  posts: null,
  analyzed_structures: '',
  analyzed_functions: ''
})

// opções de cor
const colors = [
  { name: 'Amarelo', id: 'yellow' },
  { name: 'Vermelho', id: 'red' },
  { name: 'Azul', id: 'blue' }
]

// opções de posts
const postOptions = computed(() => {
  return postsStore.posts.map((post) => ({
    id: post?.id,
    name: post?.name
  }))
})

// canvas e desenho
const canvas = ref(null)
const ctx = ref(null)
const image = ref(null)
const isDrawing = ref(false)
const BlockDrawn = ref(false)
const labeledAreas = ref([])
const scale = ref(1) // escala do canvas em relação à imagem original

// Carregar posts antes do mount (sem tocar no DOM)
onBeforeMount(async () => {
  loading.value = true
  try {
    await postsStore.getAllPosts()
  } catch (error) {
    console.error('[DEBUG] Erro ao carregar os posts:', error)
    errorMessage.value = 'Erro ao carregar os posts. Tente novamente mais tarde.'
    showErrorModal.value = true
  } finally {
    loading.value = false
  }
})

// Inicializa canvas/ctx após o DOM montar
onMounted(() => {
  if (!canvas.value) return
  ctx.value = canvas.value.getContext('2d')
  if (newPoint.posts) setDefaultImage()
})

/* ==============================
   CARREGAR IMAGEM DO POST
================================ */
const setDefaultImage = () => {
  const postSelected = postsStore.posts.find((p) => p.id === Number(newPoint.posts))
  if (!postSelected || !postSelected.image?.url) {
    console.warn('[WARN] Post não encontrado ou sem imagem')
    if (ctx.value && canvas.value) ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
    return
  }

  image.value = new Image()
  image.value.crossOrigin = 'anonymous'
  image.value.src = postSelected.image.url

  image.value.onload = () => {
    if (!canvas.value) return
    if (!ctx.value) ctx.value = canvas.value.getContext('2d')

    // definir canvas com tamanho da imagem original
    canvas.value.width = image.value.naturalWidth
    canvas.value.height = image.value.naturalHeight
    scale.value = 1

    // limitar tamanho de exibição se muito grande
    const maxDisplayWidth = canvas.value.parentElement?.clientWidth || 800
    if (canvas.value.width > maxDisplayWidth) {
      scale.value = maxDisplayWidth / canvas.value.width
      canvas.value.width = Math.round(canvas.value.width * scale.value)
      canvas.value.height = Math.round(canvas.value.height * scale.value)
    }

    redrawCanvas()
  }

  image.value.onerror = (e) => {
    console.error('[DEBUG] Falha ao carregar a imagem:', e)
  }
}

/* ==============================
   FUNÇÕES DE DESENHO
================================ */
const getMousePos = (canvasEl, evt) => {
  const rect = canvasEl.getBoundingClientRect()
  const x = (evt.clientX - rect.left) * (canvasEl.width / rect.width)
  const y = (evt.clientY - rect.top) * (canvasEl.height / rect.height)
  // normaliza para coordenadas da imagem original
  return {
    x: Math.round(x / scale.value),
    y: Math.round(y / scale.value)
  }
}

const startDrawing = (e) => {
  if (!ctx.value) return
  if (!newPoint.label_title || !newPoint.color || !newPoint.description || BlockDrawn.value) return
  isDrawing.value = true
  labeledAreas.value.push({ position: [] })
  ctx.value.strokeStyle = newPoint.color
  ctx.value.lineWidth = 4
  ctx.value.beginPath()
  const pos = getMousePos(canvas.value, e)
  ctx.value.moveTo(pos.x * scale.value, pos.y * scale.value)
  labeledAreas.value[labeledAreas.value.length - 1].position.push(pos)
}

const draw = (e) => {
  if (!isDrawing.value || !ctx.value) return
  const pos = getMousePos(canvas.value, e)
  const last = labeledAreas.value[labeledAreas.value.length - 1]
  if (!last) return
  last.position.push(pos)
  ctx.value.lineTo(pos.x * scale.value, pos.y * scale.value)
  ctx.value.stroke()
}

const endDrawing = () => {
  if (!isDrawing.value || !ctx.value) return
  isDrawing.value = false
  ctx.value.closePath()
  const last = labeledAreas.value[labeledAreas.value.length - 1]
  if (!last) return
  labeledAreas.value[labeledAreas.value.length - 1] = {
    ...newPoint,
    position: last.position
  }
  newPoint.position = last.position
  BlockDrawn.value = true
}

const deletePoint = () => {
  labeledAreas.value.pop()
  newPoint.position = []
  BlockDrawn.value = false
  redrawCanvas()
}

const redrawCanvas = () => {
  if (!ctx.value || !canvas.value || !image.value) return
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.value.drawImage(image.value, 0, 0, canvas.value.width, canvas.value.height)

  labeledAreas.value.forEach((area) => {
    if (!area.position || !area.position.length) return
    ctx.value.strokeStyle = area.color
    ctx.value.lineWidth = 4
    ctx.value.beginPath()
    area.position.forEach((p, i) => {
      const x = p.x * scale.value
      const y = p.y * scale.value
      if (i === 0) ctx.value.moveTo(x, y)
      else ctx.value.lineTo(x, y)
    })
    ctx.value.stroke()
    ctx.value.closePath()
  })
}

/* ==============================
   ADICIONAR PONTO
================================ */
const addPoint = async () => {
  if (loading.value) return
  try {
    if (!BlockDrawn.value) throw new Error('Preencha os campos e desenhe o ponto antes de salvar.')
    loading.value = true

    const payload = {
      label_title: newPoint.label_title,
      description: newPoint.description,
      position: JSON.stringify(newPoint.position), // posição original da imagem
      color: newPoint.color,
      posts: Number(newPoint.posts),
      analyzed_structures: newPoint.analyzed_structures,
      analyzed_functions: newPoint.analyzed_functions
    }

    await pointStore.createPoint(payload)
    showSuccessModal.value = true
  } catch (err) {
    console.error('[ERROR] Erro ao criar ponto:', err)
    if (err?.response?.data) errorMessage.value = JSON.stringify(err.response.data)
    else errorMessage.value = err?.message || 'Erro inesperado ao cadastrar o ponto.'
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
  redrawCanvas()
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
        <InputStringAdmin
          label="Título"
          :modelValue="newPoint.label_title"
          @action="newPoint.label_title = $event"
        />
        <InputTextAdmin
          label="Descrição"
          :modelValue="newPoint.description"
          @action="newPoint.description = $event"
        />
        <InputSelectAdmin
          label="Cor"
          :modelValue="newPoint.color"
          :options="colors"
          optionLabel="name"
          optionValue="id"
          @action="newPoint.color = $event"
        />

        <InputSelectAdmin
          label="Post"
          :modelValue="newPoint.posts"
          :options="postOptions"
          optionLabel="name"
          optionValue="id"
          @action="
            (val) => {
              newPoint.posts = val
              setDefaultImage()
            }
          "
        />

        <InputStringAdmin
          label="Estruturas Analisadas"
          :modelValue="newPoint.analyzed_structures"
          @action="newPoint.analyzed_structures = $event"
        />
        <InputStringAdmin
          label="Funções Analisadas"
          :modelValue="newPoint.analyzed_functions"
          @action="newPoint.analyzed_functions = $event"
        />

        <div class="md:col-span-2 mb-10 flex flex-col items-center">
          <p class="mb-2 text-sm text-gray-600">Desenhe o ponto no canvas abaixo</p>
          <canvas
            class="w-8/12 border-2 rounded-lg"
            ref="canvas"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="endDrawing"
          ></canvas>
          <p class="mt-2 text-xs text-gray-500">
            Errou?
            <span class="text-[#267A7A] underline cursor-pointer" @click="deletePoint()"
              >Clique aqui para refazer</span
            >
          </p>
        </div>

        <BtnDefault
          :disabled="loading"
          @click="addPoint"
          class="mb-10"
          text="Cadastrar"
          background="bg-[#29AC96]"
          :hasLink="false"
        />
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
