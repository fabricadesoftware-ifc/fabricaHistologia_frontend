<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { usePointStore, usePostStore, useAuthStore } from '@/stores'
import {
  AdminGlobalContainer,
  InputStringAdmin,
  InputSelectAdmin,
  BtnDefault,
  SucessModalAdmin
} from '@/components/index'
import router from '@/router'

const authStore = useAuthStore()
const pointStore = usePointStore()
const postsStore = usePostStore()

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

const postOptions = computed(()=> {
  console.log(postsStore.posts)
  return postsStore.posts.map(post => ({
    id: post?.id,
    name: post?.name
  }))
})

const canvas = ref(null)
const ctx = ref(null)
const image = ref(null)
const isDrawing = ref(false)
const BlockDrawn = ref(false)
const labeledAreas = ref([])

const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref("")

onMounted(async () => {
  await postsStore.getPosts()
  ctx.value = canvas.value.getContext('2d')
})

/* ==============================
   CARREGAR IMAGEM DO POST
================================ */
const setDefaultImage = () => {
  const postSelected = postsStore.posts.find(p => p.id === Number(newPoint.posts))
  console.log(postsStore.posts, newPoint.posts, postSelected)
  if (!postSelected || !postSelected.image?.url) return

  image.value = new Image()
  image.value.src = postSelected.image.url
  image.value.onload = () => {
    canvas.value.width = image.value.width
    canvas.value.height = image.value.height
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.value.drawImage(image.value, 0, 0)
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

const addPoint = async () => {
  try {
    if (!BlockDrawn.value) {
      throw new Error("Preencha os campos e desenhe o ponto antes de salvar.")
    }

    await pointStore.createPoint(newPoint)

    // sucesso → abre modal
    showSuccessModal.value = true
  } catch (err) {
    console.error("Erro ao criar ponto:", err)
    errorMessage.value = err?.message || "Erro inesperado ao cadastrar o ponto."
    showErrorModal.value = true
  }
}

/* ==============================
   AÇÕES DOS MODAIS
================================ */
function handleConfirm() {
  // limpar formulário para adicionar novo ponto
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
    <div class="w-[90%] mx-auto space-y-6">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full" @submit.prevent="send">
        
        <!-- inputs normais -->
        <InputStringAdmin label="Título" :modelValue="newPoint.label_title" @action="newPoint.label_title = $event"/>
        <InputStringAdmin label="Descrição" :modelValue="newPoint.description" @action="newPoint.description = $event"/>
        <InputSelectAdmin label="Cor" :modelValue="newPoint.color" :options="colors" optionLabel="name" optionValue="id" @action="newPoint.color = $event"/>
        
        <!-- POST com evento para carregar a imagem -->
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

        <!-- CANVAS -->
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

        <BtnDefault @click="addPoint" class="mb-10" text="Cadastrar" background="bg-[#29AC96]" :hasLink="false" />
      </form>
    </div>
  </AdminGlobalContainer>

  <!-- Modal de sucesso -->
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

<!-- Modal de erro -->
<SucessModalAdmin
  :show="showErrorModal"
  subtitle="Erro!"
  :title="errorMessage"
  message="Não foi possível cadastrar o ponto. Tente novamente ou contate o suporte."
  confirm-label="Fechar"
  :cancel-label="null"
  confirm-class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl"
  @confirm="closeErrorModal"
/>

</template>
