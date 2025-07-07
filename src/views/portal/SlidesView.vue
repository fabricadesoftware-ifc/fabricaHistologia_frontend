<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SpecieFilterComponent } from '@/components/index';
import { useOrganStore, usePostStore, useNavigationStore, useSystemStore, useQuizStore } from '@/stores';
import { resetAll } from '@/utils/quiz';
import {
  ContainerGlobal,
  CardsContainer,
  SlideCards,
  AddInfoGlobal,
  BtnDefault,
  Footer,
  HeaderPortal,
} from '@/components/index'
const systemStore = useSystemStore()
const organStore = useOrganStore()
const postStore = usePostStore()
const quizStore = useQuizStore()
const router = useRoute()
const routerUse = useRouter()

const organ_id = router.params.id
const system_id = systemStore.selectedSystem.id
const specieFilterRef = ref(null)

const buttons = ref([
  {text: 'Histologia', selected: true, post: 1},
  {text: 'Patologia', selected: false, post: 2}
])

const selectPostType = (item) => {
  for (let state of buttons.value) {
    state.selected = !state.selected
    postStore.typeSelection = state.post
  }
  postStore.getPostsByOrganAndType(organ_id, item.post, '')
  specieFilterRef.value?.clearFilters()
}

watch(()=> buttons.value.find((s) => s.selected == true).post, (newVal) => {
  postStore.typeSelection = newVal
})

onMounted(async()=>{
  await organStore.getOrgansById(organ_id)
  await postStore.getPostsByOrganAndType(organ_id, 1, '')
  postStore.typeSelection = 1
})

const push = async(id) => {
    resetAll(quizStore)
    quizStore.getQuizBySystem(id, '')
    routerUse.push('/portal/quiz/' + id)
}

</script>
<template>
  <main class=" min-h-screen-minus-80 relative">
    <HeaderPortal :title="organStore.selectedOrgan.name" />
   
    <SpecieFilterComponent ref="specieFilterRef" />

     <div class=" flex justify-center gap-10">
      <p @click="selectPostType(button)" :class="button.selected ? 'text-[#267A7A] text-[18px] font-semibold selectedType' : ' hover:opacity-75' + ' duration-200 ease-in-out cursor-pointer'" v-for="(button, index) in buttons" :key="index" >{{ button.text }}</p>
      
    </div>
   
    <div class="w-full h-96 flex justify-center items-center flex-col" v-if="postStore.postByOrganAndType.length  == 0">
    <h1 class="text-3xl md:text-5xl text-center break-all">Lâminas não encontradas</h1>
    </div>
    <section v-else>
      
    <CardsContainer :gap="'gap-10'" :justify="'justify-start'" class="mb-8 mt-8 sm:mt-16">
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

<style scooped>
.selectedType::before {
content: '•   ';
animation: appear 0.3s linear;
}

@keyframes appear {
  from {
    content: '•   ';
    font-size: 10px;
  }
  to {
    content: '•   ';
    font-size: 18px;
    transform: scale(1.1);
  }
}
</style>
