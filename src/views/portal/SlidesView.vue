<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useOrganStore, usePostStore } from '@/stores';
import {
  ContainerGlobal,
  CardsContainer,
  SlideCards,
  AddInfoGlobal,
  BtnDefault,
  Footer,
  HeaderPortal
} from '@/components/index'

const organStore = useOrganStore()
const postStore = usePostStore()
const router = useRoute()
const organ_id = router.params.id

const buttons = ref([
  {text: 'Patologia', selected: true, post: 2},
  {text: 'Histologia', selected: false, post: 1}
])

const selectPostType = (item) => {
  for (let state of buttons.value) {
    state.selected = !state.selected
  }
  postStore.getPostsByOrganAndType(organ_id, item.post)
}

onMounted(async()=>{
  await postStore.getPostsByOrganAndType(organ_id, 1)
  await organStore.getOrgansById(organ_id)
})
</script>
<template>
  <main class="w-dvh">
    <HeaderPortal class=" " :title="organStore.selectedOrgan.name" />
    <div class=" flex justify-center gap-10">
      <button @click="selectPostType(item)" v-for="(item,index) in buttons" class="rounded-2xl h-14 font-poppins px-16 ease-in duration-100" :class="item.selected ? 'bg-transparent border-2  text-[#267A7A] border-[#267A7A] hover:bg-[#b9dada]' : 'text-white  bg-[#267A7A] hover:bg-[#b9dada] hover:border-2 hover:border-[#267A7A] hover:text-[#267A7A] ' " >{{ item.text }}</button>
    </div>
    <CardsContainer class="mb-8 mt-8" noFlex>
      <SlideCards :data="postStore.postByOrganAndType" />
    </CardsContainer>
    <ContainerGlobal class="flex justify-center flex-col">
      <AddInfoGlobal />
      <BtnDefault :text="'Acessar Quiz deste Órgão'" :block="true" class="mt-12" />
    </ContainerGlobal>
    <Footer class="mt-12" />
  </main>
</template>
