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
    </div>
    <CardsContainer :gap="'gap-10'" :justify="'justify-start'" class="mb-8 mt-8">
      <SlideCards :data="postStore.postByOrganAndType" />
    </CardsContainer>
    <ContainerGlobal class="flex justify-center flex-col">
      <AddInfoGlobal />
      <BtnDefault :text="'Acessar Quiz deste Órgão'" :block="true" class="mt-12" />
    </ContainerGlobal>
  </main>
  <Footer class="mt-12" />
</template>
