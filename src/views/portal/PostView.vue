<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore, usePointStore, useQuizStore, useSystemStore } from '@/stores';
import {
  HeaderPortal,
  ContainerGlobal,
  CheckList,
  PostInfo,
  AddInfoGlobal,
  Footer,
  BtnDefault
} from '@/components/index';
import { resetAll } from '@/utils/quiz';

const showInfo = ref(false);
const canvasRef = ref(null);
const router = useRoute();
const id = router.params.id;

const postsStore = usePostStore();
const pointStore = usePointStore();
const quizStore = useQuizStore();
const systemStore = useSystemStore()
const system_id = systemStore.selectedSystem.id
const image = ref(null)

onMounted(async () => {
  await postsStore.getPostsById(id)
  image.value = postsStore.selectedPost.image.file
  if (canvasRef.value) {
    pointStore.ctx = canvasRef.value.getContext('2d');
    pointStore.canvas = canvasRef.value;
    if (pointStore.canvas && pointStore.ctx) {
    pointStore.loadCanvas(image.value);
    pointStore.redrawCanvas();
  }
  }
});

const push = async(id) => { 
    resetAll(quizStore)
    quizStore.getQuizBySystem(id, '') 
}
</script>

<template>
  <main class="min-h-screen-minus-80 relative">
    <HeaderPortal :title="postsStore.selectedPost ? postsStore.selectedPost.type_cut : 'Carregando...'" />
    <div class="w-full h-96 flex justify-center items-center flex-col" v-if="postsStore.selectedPost == null">
    <h1 class="text-3xl md:text-5xl">Lâminas não encontradas</h1>
    <p class="text-xl">Não há nenhuma lâmina registrada no portal</p>
    </div>
    <ContainerGlobal v-else class=" mb-10">
      <section class="w-full md:block flex gap-8 relative">
        <div class="md:w-full w-1/2">
            <canvas class="w-full" ref="canvasRef"></canvas>
        </div>
        <div class="md:w-full w-1/2 pb-16 pr-8 relative md:mt-8 text-center">
          <CheckList />
          <div class="absolute top-0 right-0 flex gap-4 items-center">
            <p class="text-center text-gray-500">
              +infomações
            </p>
            <button v-if="!showInfo"  class="bg-[#267A7A] p-2 rounded-full shadow-lg open-icon hover:brightness-90" @click="showInfo = true">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="h-6 w-6" viewBox="0 0 24 24" fill="#fff">
                <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
              </svg>
            </button>
          </div>
            <PostInfo @close="showInfo = false" v-if="showInfo" />
        </div>
      </section>
      <section>
        <div class="mt-12">
          <AddInfoGlobal />
        </div>
      </section>
      <section class="mt-8">
        <BtnDefault @click="push(system_id)" :link="'/portal/quiz/' + system_id" text="Acessar Quiz deste Sistema" block />
      </section>
    </ContainerGlobal>
  </main>
  <Footer :class="!postsStore.selectedPost == null ? 'mt-12' : ''" />
</template>

<style scoped>
.open-icon {
  animation: rotateRight 0.3s;
}

@keyframes rotateRight {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>