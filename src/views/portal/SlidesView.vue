<script setup>
import { onMounted } from 'vue';
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

onMounted(async()=>{
  await postStore.getPostsByOrgan(organ_id)
  await organStore.getOrgansById(organ_id)
  console.log(organStore.state.selectedOrgan)
})
</script>
<template>
  <main class="w-dvh">
    <HeaderPortal :title="organStore.selectedOrgan.name" />
    <CardsContainer class="mb-8" noFlex>
      <SlideCards :data="postStore.state.postsByOrgan" />
    </CardsContainer>
    <ContainerGlobal class="flex justify-center flex-col">
      <AddInfoGlobal />
      <BtnDefault :text="'Acessar Quiz deste Órgão'" :block="true" class="mt-12" />
    </ContainerGlobal>
    <Footer class="mt-12" />
  </main>
</template>
