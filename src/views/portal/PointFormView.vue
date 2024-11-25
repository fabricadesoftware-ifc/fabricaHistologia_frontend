<script setup>
import { ref, onMounted } from 'vue'
import { usePointStore, usePostStore, useNavigationStore, useAuthStore } from '@/stores'
import {
  HeaderPortal,
  ContainerGlobal,
  TitleGlobal,
  Footer,
  BtnDefault,
  MessageGlobal
} from '@/components/index'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const navigationStore = useNavigationStore()
const postsStore = usePostStore()
const pointStore = usePointStore()
const canvas = ref(null) // Referência ao canvas
const ctx = ref(null)
const isDrawing = ref(false)
const image = ref(null)
const label_title = ref('')
const description = ref('')
const post = ref(0)
const colors = [
  { select: 'Amarelo', value: 'yellow' },
  { select: 'Vermelho', value: 'red' },
  { select: 'Azul', value: 'blue' }
]
const color = ref('')
const analyzed_structures = ref(null)
const analyzed_functions = ref(null)
const BlockDrawn = ref(false)
const labeledAreas = ref([])

const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect()
  return {
    x: (evt.clientX - rect.left) * (canvas.width / rect.width),
    y: (evt.clientY - rect.top) * (canvas.height / rect.height)
  }
}

const startDrawing = (e) => {
  if (
    label_title.value === '' ||
    color.value === '' ||
    description.value === '' ||
    BlockDrawn.value
  )
    return
  isDrawing.value = true
  labeledAreas.value.push({ position: [] })
  ctx.value.strokeStyle = color.value
  ctx.value.lineWidth = 2
  ctx.value.beginPath()
  const pos = getMousePos(canvas.value, e)
  ctx.value.moveTo(pos.x, pos.y)
}

const draw = (e) => {
  if (
    label_title.value === '' ||
    color.value === '' ||
    description.value === '' ||
    BlockDrawn.value
  ) {
    return
  }
  if (!isDrawing.value) return
  const pos = getMousePos(canvas.value, e)
  ctx.value.lineTo(pos.x, pos.y)
  ctx.value.stroke()
  labeledAreas.value[labeledAreas.value.length - 1].position.push({
    id: labeledAreas.value.length - 1,
    x: pos.x,
    y: pos.y
  })
}

const endDrawing = () => {
  if (!isDrawing.value) return
  isDrawing.value = false
  ctx.value.closePath()
  labeledAreas.value[labeledAreas.value.length - 1].label_title = label_title.value
  labeledAreas.value[labeledAreas.value.length - 1].description = description.value
  labeledAreas.value[labeledAreas.value.length - 1].posts = post.value.id
  labeledAreas.value[labeledAreas.value.length - 1].color = color.value
  labeledAreas.value[labeledAreas.value.length - 1].analyzed_functions = analyzed_functions.value
  labeledAreas.value[labeledAreas.value.length - 1].analyzed_structures = analyzed_structures.value
  BlockDrawn.value = true
  redrawCanvas()
}

const redrawCanvas = () => {
  if (label_title.value === '') return
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.value.drawImage(image.value, 0, 0)
  labeledAreas.value.forEach((area) => {
    ctx.value.strokeStyle = color.value
    ctx.value.lineWidth = 2
    ctx.value.beginPath()
    area.position.forEach((point, index) => {
      if (index === 0) {
        ctx.value.moveTo(point.x, point.y)
      } else {
        ctx.value.lineTo(point.x, point.y)
      }
    })
    ctx.value.stroke()
    ctx.value.closePath()
    // Exibir rótulo
    if (area.label_title) {
      ctx.value.fillStyle = color.value
      ctx.value.font = 2
      ctx.value.fontWeight = '900' // Ensure fontWeight is a string
      const midpoint = area.position[Math.floor(area.position.length / 2)]
      ctx.value.fillText(area.label_title, midpoint.x, midpoint.y - 10)
    }
  })
}

const downloadImage = () => {
  redrawCanvas()
  const link = document.createElement('a')
  link.download = 'labeled-image.png'
  link.href = canvas.value.toDataURL()
  link.click()
}

const setDefaultImage = async () => {
  image.value = new Image()
  image.value.src = post.value.image.url
  image.value.onload = () => {
    canvas.value.width = image.value.width
    canvas.value.height = image.value.height
    ctx.value.drawImage(image.value, 0, 0)
  }
}

const deletePoint = () => {
  labeledAreas.value.pop()
  BlockDrawn.value = false
  redrawCanvas()
}

const addPoint = () => {
  if (BlockDrawn.value) {
    pointStore.createPoint(labeledAreas.value[0])
    navigationStore.activeError = true
    navigationStore.messageBody.title = 'Sucesso ao Enviar o Ponto'
  } else {
    navigationStore.activeError = true
    navigationStore.messageBody.title = 'Erro ao Enviar o Ponto!'
    navigationStore.messageBody.description = 'Preencha corretamente todos os Campos!!'
  }
}

onMounted(async () => {
  await postsStore.getPosts()
  ctx.value = canvas.value.getContext('2d') // Inicializa o contexto do canvas corretamente
  redrawCanvas()

  if (!authStore.activeUser) {
    navigationStore.messageBody.title = 'Não Autorizado'
    navigationStore.messageBody.description =
      'Isso ocorre porquê você não iniciou sessão, volte para a página inicial e inicie sessão com sua conta'
    navigationStore.activeError = !navigationStore.activeError
  }
  else if (!authStore.userInfo.is_verified) {
    navigationStore.messageBody.title = 'Usuário não autorizado'
    navigationStore.messageBody.description =
      'Isso ocorre porquê você ainda não é um colaborador! Somente colaboradores podem gerenciar o conteúdo do portal.'
    navigationStore.activeError = !navigationStore.activeError
   
  } else {
    navigationStore.activeError = false
  }
})

const setAction = () => {
    if (navigationStore.message.title == 'Não Autorizado' || navigationStore.message.title == 'Usuário não autorizado') {
        router.push('/')
    } else {
        window.location.reload()
    }
}
</script>

<template>
  <main class="min-h-screen-minus-80 relative">
    <MessageGlobal @action="setAction" />
    <HeaderPortal title="Adicão de pontos de interesse!" />
    <ContainerGlobal class="mb-12">
      <form
        class="shadow-xl w-3/5 mx-auto bg-white px-20 py-8 flex flex-col items-center border rounded-lg lg:w-5/6 sm:w-full md:px-10"
      >
        <TitleGlobal
          class="mb-10 text-center"
          content="Informações"
          size="text-3xl xl:text-2xl sm:text-xl"
        />
        <div class="relative p-0 pt-3 mt-5 w-full">
          <p
            class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4"
          >
            Título
          </p>
          <input type="text" class="border-2 rounded-md w-full h-10 pl-3" v-model="label_title" />
        </div>
        <div class="relative p-0 pt-3 mt-5 w-full">
          <p
            class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4"
          >
            Descrição
          </p>
          <textarea
            type="text"
            class="border-2 rounded-md w-full h-50 pl-3 pt-3"
            v-model="description"
          ></textarea>
        </div>
        <div class="relative p-0 pt-3 mt-5 w-full">
          <p
            class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4"
          >
            Cor
          </p>
          <select
            v-model="color"
            class="border-2 rounded-md w-full h-10 bg-white cursor-pointer appearance-none pl-3"
          >
            <option v-for="(cor, index) in colors" :key="index" :value="cor.value">
              {{ cor.select }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center mt-3 px-2 text-gray-700"
          >
            <svg
              class="fill-current h-7 w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>
        <div class="relative p-0 pt-3 mt-5 w-full">
          <p
            class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4"
          >
            Post
          </p>
          <select
            class="border-2 rounded-md w-full h-10 bg-white cursor-pointer appearance-none pl-3"
            v-model="post"
            @change="setDefaultImage()"
          >
            <option v-for="post in postsStore.posts" :key="post.id" :value="post">
              {{ post.name }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center mt-3 px-2 text-gray-700"
          >
            <svg
              class="fill-current h-7 w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-xs text-gray-500">
          Aviso: preencha os campos acima antes de desenhar os focos e faça apenas 1 foco por vez
        </p>
        <canvas
          class="w-full border-2"
          ref="canvas"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="endDrawing"
        ></canvas>
        <p class="mt-2 text-xs text-gray-500">Errou? não tem problema.</p>
        <p class="text-xs text-[#267A7A] underline cursor-pointer" @click="deletePoint()">
          Clique aqui para refazer
        </p>
        <div class="w-full flex justify-between">
          <div class="mt-14 w-3/6" @click="downloadImage()">
            <BtnDefault text="Download" link="#" color="text-white" :block="true" />
          </div>
          <div class="mt-14 w-2/6" @click="addPoint">
            <BtnDefault text="Enviar" link="#" color="text-white" :block="true" />
          </div>
        </div>
      </form>
    </ContainerGlobal>
  </main>
  <Footer />
</template>
