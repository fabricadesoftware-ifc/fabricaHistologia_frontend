<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrganStore, usePostStore, useNavigationStore, useSystemStore } from '@/stores';
const navigationStore = useNavigationStore()
import {
  ContainerGlobal,
  CardsContainer,
  SlideCards,
  AddInfoGlobal,
  BtnDefault,
  Footer,
  HeaderPortal,
  MessageGlobal
} from '@/components/index'
const systemStore = useSystemStore()
const organStore = useOrganStore()
const postStore = usePostStore()
const router = useRoute()
const routerUse = useRouter()
const organ_id = router.params.id
const system_id = systemStore.selectedSystem.id

const buttons = ref([
  {text: 'Patologia', selected: true, post: 2},
  {text: 'Histologia', selected: false, post: 1}
])

// const selectPostType = (item) => {
//   for (let state of buttons.value) {
//     state.selected = !state.selected
//   }
//   postStore.getPostsByOrganAndType(organ_id, item.post)
// }


onMounted(async()=>{
  await organStore.getOrgansById(organ_id)
  await postStore.getPostsByOrganAndType(organ_id, 1)
})

const push = async(id) => {
    resetAll()
    quizStore.getQuizBySystem(system_id, '')
    // routerUse.push('/portal/quiz/' + id)
}

</script>
<template>
  <main class=" min-h-screen-minus-80 relative">
    <HeaderPortal class=" " :title="organStore.selectedOrgan.name" />
    <div class=" flex justify-center gap-10">
    </div>
    <div class="w-full h-96 flex justify-center items-center flex-col" v-if="postStore.postByOrganAndType.length  == 0">
    <h1 class="text-3xl md:text-5xl">Lâminas não encontradas</h1>
    <p class="text-xl">Não há nenhuma lâmina registrada no portal</p>
    </div>
    <section v-else>
    <CardsContainer :gap="'gap-10'" :justify="'justify-start'" class="mb-8 mt-8">
      <SlideCards :data="postStore.postByOrganAndType" />
    
    </CardsContainer>
    <ContainerGlobal class="flex justify-center flex-col">
      <AddInfoGlobal />
      <BtnDefault @click='push(system_id)' :text="'Acessar Quiz deste Órgão'" :link="'/portal/quiz/' + system_id" :block="true" class="mt-12 mb-5" />
    </ContainerGlobal>
  </section>
   
  </main>
  <Footer class="relative bottom-0" />
</template>
