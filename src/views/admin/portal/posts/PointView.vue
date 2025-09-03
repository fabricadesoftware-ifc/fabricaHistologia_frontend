<script setup>
import { onMounted, reactive, ref, computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import { usePointStore, usePostStore } from '@/stores'
import {
  InputStringAdmin,
  InputTextAdmin,
  InputSelectAdmin,
  AdminGlobalContainer,
  BtnDefault,
  SucessModalAdmin,
  LoadingSpinner
} from '@/components/index'

const route = useRoute()
const pointStore = usePointStore()
const postStore = usePostStore()

const canvasRef = ref(null)
const loading = ref(true)
const pointId = route.params.id
const loadedImage = ref(null) // guarda a imagem carregada

// desenho
const isDrawing = ref(false)

const newPoint = reactive({
  id: null,
  label_title: '',
  description: '',
  analyzed_structures: '',
  analyzed_functions: '',
  color: 'blue',
  posts: null,
  position: [], // [{x,y}, ...]
  visible: true
})

const colorOptions = [
  { name: 'Azul', id: 'blue' },
  { name: 'Vermelho', id: 'red' },
  { name: 'Verde', id: 'green' },
  { name: 'Amarelo', id: 'yellow' }
]

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')
const successAction = ref('edit')

const successTitle = computed(() =>
  successAction.value === 'delete' ? 'Ponto Excluído' : 'Ponto Atualizado'
)

/* ==============================
   Helpers de desenho
================================ */
const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect()
  // traduz coord da tela -> coord do canvas real (resolvido por width/height do canvas)
  return {
    x: (evt.clientX - rect.left) * (canvas.width / rect.width),
    y: (evt.clientY - rect.top) * (canvas.height / rect.height),
  }
}

/* ==============================
   REDRAW CANVAS
================================ */
const redrawCanvas = () => {
  if (!canvasRef.value || !loadedImage.value) {
    return
  }

  const canvas = canvasRef.value
  const ctx = canvas.getContext("2d")

  canvas.width = loadedImage.value.width
  canvas.height = loadedImage.value.height

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(loadedImage.value, 0, 0)

  // 🔹 desenhar linha contínua (desenho livre)
  if (newPoint.visible && newPoint.position?.length) {
    ctx.strokeStyle = newPoint.color || "blue"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(newPoint.position[0].x, newPoint.position[0].y)

    for (let i = 1; i < newPoint.position.length; i++) {
      ctx.lineTo(newPoint.position[i].x, newPoint.position[i].y)
    }

    ctx.stroke()
  }
}


/* ==============================
   SET DEFAULT IMAGE
================================ */
const setDefaultImage = () => {
  const postSelected = postStore.posts.find(p => p.id === Number(newPoint.posts))
  if (!postSelected) return

  const imageUrl = postSelected?.image?.file || postSelected?.image?.url
  if (!imageUrl) return

  const fullUrl = imageUrl.startsWith('http')
    ? imageUrl
    : `${import.meta.env.VITE_API_URL}${imageUrl}`

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = fullUrl

  img.onload = () => {
    loadedImage.value = img
    redrawCanvas()
  }

  img.onerror = (err) => {
    console.error('Erro ao carregar imagem:', fullUrl, err)
  }
}

/* ==============================
   TOGGLE VISIBILIDADE (sem chamar store)
================================ */
const onToggleVisible = () => {
  // NÃO chamamos pointStore.visibleLabel aqui para não disparar o redraw da store (que quebra).
  redrawCanvas()
}

/* ==============================
   Eventos de desenho no canvas
================================ */
const startDrawing = (e) => {
  if (!loadedImage.value || !canvasRef.value) return
  isDrawing.value = true
  // ao começar a desenhar, zera o polígono atual pra redesenhar do zero
  newPoint.position = []
  const pos = getMousePos(canvasRef.value, e)
  newPoint.position.push(pos)
  redrawCanvas() // desenha fundo limpo
}

const draw = (e) => {
  if (!isDrawing.value || !canvasRef.value) return
  const pos = getMousePos(canvasRef.value, e)
  newPoint.position.push(pos)

  // desenha rápido (incremental) sobre a imagem
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(loadedImage.value, 0, 0)

  if (newPoint.visible && newPoint.position.length) {
    ctx.strokeStyle = newPoint.color || 'blue'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(newPoint.position[0].x, newPoint.position[0].y)
    for (let i = 1; i < newPoint.position.length; i++) {
      ctx.lineTo(newPoint.position[i].x, newPoint.position[i].y)
    }
    ctx.stroke()
  }
}

const endDrawing = () => {
  if (!isDrawing.value) return
  isDrawing.value = false
  // fecha polígono no redraw completo
  redrawCanvas()
}

const resetDrawing = () => {
  newPoint.position = []
  redrawCanvas()
}

/* ==============================
   WATCHERS
================================ */
watch(loading, async (val) => {
  if (!val) {
    await nextTick()
    if (canvasRef.value) {
      // expõe canvas/ctx pra store se ela usar, mas a gente controla o redraw local
      pointStore.canvas = canvasRef.value
      pointStore.ctx = canvasRef.value.getContext('2d')
      setDefaultImage()
    }
  }
})

watch(() => newPoint.visible, () => {
  redrawCanvas()
})

watch(() => newPoint.position, () => {
  // sempre que mudar posição por algum outro lugar, redesenha
  redrawCanvas()
}, { deep: true })

/* ==============================
   ONMOUNTED
================================ */
onMounted(async () => {
  try {
    loading.value = true
    await pointStore.getPoints()
    const point = await pointStore.getPointsById(pointId)
    Object.assign(newPoint, point[0] || {})

    if (newPoint.posts) {
      await postStore.getPostsById(newPoint.posts)
    }
  } finally {
    loading.value = false
  }
})

/* ==============================
   SEND UPDATE
================================ */
const send = async () => {
  try {
    await pointStore.updatePoints(newPoint, route.params.id)
    successAction.value = 'edit'
    showSuccessModal.value = true
    setTimeout(() => {
      router.push(`/admin/posts/`)
    }, 1000)
  } catch (err) {
  if (err?.response?.data) {
    const data = err.response.data
    errorMessage.value = Object.values(data)
      .map(v => Array.isArray(v) ? v.join(', ') : v)
      .join('\n')
  } else {
    errorMessage.value = err?.message || 'Erro inesperado ao atualizar ponto.'
  }
  showErrorModal.value = true
}
}

/* ==============================
   DELETE
================================ */
const tryDelete = () => {
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  try {
    await pointStore.deletePoints(newPoint.id)
    successAction.value = 'delete'
    showDeleteConfirm.value = false
    showSuccessModal.value = true
    setTimeout(() => {
      router.push(`/admin/posts/${newPoint.posts}`)
    }, 1000)
  } catch (err) {
    console.error('Erro ao deletar ponto:', err)
    errorMessage.value = err?.message || 'Erro inesperado ao deletar ponto.'
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
    <!-- loading overlay -->
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
          @click="tryDelete"
          class="mb-10 h-8 rounded-lg"
          text="Excluir"
          background="bg-[#E40000]"
          :hasLink="false"
        />
      </div>

      <div class="flex flex-col gap-10 w-full">
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
        <InputSelectAdmin
          label="Cor"
          :modelValue="newPoint.color"
          :options="colorOptions"
          @action="newPoint.color = $event"
        />
      </div>

      <!-- Canvas + visibilidade -->
      <div class="flex flex-col gap-10">
        <div class="flex justify-center flex-col items-center">
          <canvas
            class="w-8/12 border rounded-lg shadow"
            ref="canvasRef"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="endDrawing"
            @mouseleave="endDrawing"
          ></canvas>

          <div class="mt-2 text-right">
            <button
              type="button"
              class="text-sm text-[#267A7A] underline"
              @click="resetDrawing"
            >
              Refazer desenho
            </button>
          </div>
        </div>

        <div>
          <h2 class="font-semibold text-lg mb-4 text-[#267A7A]">Visibilidade do Ponto</h2>
          <label class="flex cursor-pointer select-none items-center gap-4 pb-2 hover:brightness-95">
            <div class="relative">
              <input
                v-model="newPoint.visible"
                type="checkbox"
                class="sr-only"
                @change="onToggleVisible"
              />
              <div class="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
              <div
                :class="{ 'translate-x-full !bg-[#8181FF]': newPoint.visible }"
                class="dot absolute left-1 top-1 h-6 w-6 bg-white rounded-full transition-all"
              ></div>
            </div>
            <p class="font-normal text-lg">
              {{ newPoint.label_title }}
            </p>
          </label>
          <p class="text-left text-gray-400 transition" v-show="newPoint.visible">
            {{ newPoint.description }}
          </p>
        </div>
      </div>
    </div>
  </AdminGlobalContainer>

  <!-- sucesso -->
 <SucessModalAdmin
  :show="showSuccessModal"
  subtitle="Sucesso!"
  :title="successTitle"
  message="Ação concluída com sucesso!"
  :cancel-label="null"
  :confirm-label="null"
  :duration="1"
/>

  <!-- erro -->
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

  <!-- confirmação -->
  <SucessModalAdmin
    :show="showDeleteConfirm"
    subtitle="Confirmação"
    title="Excluir Ponto"
    message="Tem certeza que deseja excluir este ponto? Esta ação não poderá ser desfeita."
    confirm-label="Sim, excluir"
    cancel-label="Cancelar"
    confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
    @confirm="confirmDelete"
    @cancel="showDeleteConfirm = false"
  />
</template>
