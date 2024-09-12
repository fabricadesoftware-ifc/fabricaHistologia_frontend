<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  HeaderPortal,
  ContainerGlobal,
  CheckList,
  PostInfo,
  AddInfoGlobal,
  Footer,
  BtnDefault
} from '@/components/index'

const showInfo = ref(true)
const router = useRoute()
const id = router.params.id
</script>

<template>
  <main>
    <HeaderPortal :title="`Dados da Lâmina ${id}`" />
    <ContainerGlobal class="mb-12">
      <section class="w-full md:block flex gap-8 relative">
        <div class="md:w-full w-1/2">
          <div class="rounded-xl overflow-hidden">
            <img
              src="https://th.bing.com/th/id/R.70f72e90f21fa0b9a884ba9b2a9e72c7?rik=5gT0EQaWi7iYew&riu=http%3a%2f%2fcv.udl.cat%2fcursos%2f100302%2fhistologia%2fbasicos%2f3.1.jpg&ehk=3Z8Bs%2f8b7ok3P2ODm7080hnW8Q5LgxSaPrVvQACAiKE%3d&risl=&pid=ImgRaw&r=0"
              class="w-full"
            />
          </div>
        </div>
        <div class="md:w-full w-1/2 pb-16 pr-8 relative md:mt-8">
          <CheckList />
          <div class="absolute top-0 right-0">
            <button v-if="!showInfo"  class="bg-[#267A7A] p-2 rounded-full shadow-lg open-icon" @click="showInfo = true">
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