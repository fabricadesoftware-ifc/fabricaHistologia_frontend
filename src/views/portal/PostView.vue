<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSlideStore } from '@/stores/blog/slide';
import {
  HeaderPortal,
  ContainerGlobal,
  CheckList,
  PostInfo,
  AddInfoGlobal,
  Footer,
  BtnDefault
} from '@/components/index';

const showInfo = ref(true);
const canvasRef = ref(null);
const router = useRoute();
const id = router.params.id;
const sliceStore = useSlideStore();

onMounted(() => {
  if (canvasRef.value) {
    sliceStore.ctx = canvasRef.value.getContext('2d');
    sliceStore.canvas = canvasRef.value;
    sliceStore.loadCanvas();
    sliceStore.redrawCanvas();
  }
});
</script>

<template>
  <main>
    <HeaderPortal :title="`Dados da Lâmina ${id}`" />
    <ContainerGlobal class="mb-12">
      <section class="w-full md:block flex gap-8 relative">
        <div class="md:w-full w-1/2">
            <canvas class="w-full" ref="canvasRef"></canvas>
        </div>
        <div class="md:w-full w-1/2 pb-16 pr-8 relative md:mt-8 text-center">
          <CheckList />
          <div class="absolute top-0 right-0">
            <button v-if="!showInfo"  class="bg-[#267A7A] p-2 rounded-full shadow-lg open-icon hover:brightness-90" @click="showInfo = true">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="h-6 w-6" viewBox="0 0 24 24" fill="#fff">
                <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
              </svg>
            </button>
            <p class="text-center text-gray-500 mt-2">
              MAIS INFO
            </p>
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
        <BtnDefault text="Acessar Quiz deste Sistema" block />
      </section>
    </ContainerGlobal>
    <Footer />
  </main>
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