<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SpecieFilterComponent } from '@/components/index';
import { useOrganStore, usePostStore, useSystemStore, useQuizStore, useSupportingStore } from '@/stores';
import { resetAll } from '@/utils/quiz';
import {
  ContainerGlobal,
  CardsContainer,
  SlideCards,
  AddInfoGlobal,
  BtnDefault,
  Footer,
  HeaderPortal,
  LoadingSpinner
} from '@/components/index'

const systemStore = useSystemStore()
const organStore = useOrganStore()
const postStore = usePostStore()
const quizStore = useQuizStore()
const supportingStore = useSupportingStore()

const router = useRoute()
const routerUse = useRouter()

const loading = ref(false)
const specieFilterRef = ref(null)

const organ_id = router.params.id
const system_id = systemStore.selectedSystem.id

const selectPostType = async (item) => {
  loading.value = true
  try {
    for (let state of postStore.buttons) {
      state.selected = !state.selected
      postStore.typeSelection = state.post
    }
    await postStore.getPostsByOrganAndType(organ_id, item.post, '')
    specieFilterRef.value?.clearFilters()
  } finally {
    loading.value = false
  }
}

watch(() => postStore.buttons.find((s) => s.selected == true)?.post, (newVal) => {
  postStore.typeSelection = newVal
})

onMounted(async () => {
  loading.value = true
  try {
    await organStore.getOrgansById(organ_id)
    await postStore.getAllPostsByOrganAndType(organ_id, 1, '')
    await supportingStore.getAllMaterialsBySystem(organStore.organs[0].system.id)
    setAdditionalInfo.value
    postStore.typeSelection = 1
  } catch (err) {
    console.error('[ERROR] onMounted', err)
  } finally {
    loading.value = false
  }
})

const additionalData = ref([
    {title: 'Aulas', material: []},
    {title: 'PDFs', material: []}
])

const setAdditionalInfo = computed(() => {
    additionalData.value[0].material = supportingStore.state.materialsBySystem.filter(
      s => !s.image_supporting_material && !s.document_supporting_material
    )
    additionalData.value[1].material = supportingStore.state.materialsBySystem.filter(
      s => s.image_supporting_material || s.document_supporting_material
    )
})

const push = async (id) => {
    resetAll(quizStore)
    await quizStore.getQuizBySystem(id, '')
    routerUse.push('/portal/quiz/' + id)
}

onBeforeUnmount(() => {
  for (let state of postStore.buttons) {
    postStore.buttons[0].selected = true
    postStore.buttons[1].selected = false
    postStore.typeSelection = state.post
  }
})
</script>

<template>
  <main class=" min-h-screen-minus-80 relative">
    <HeaderPortal :title="organStore.selectedOrgan.name" />

    <!-- Loading overlay -->
    <div v-if="loading" class="absolute inset-0 bg-white/70 z-50 flex justify-center items-center">
      <LoadingSpinner />
    </div>

    <SpecieFilterComponent ref="specieFilterRef" />

    <div class=" flex justify-center gap-10">
      <p
        @click="selectPostType(button)"
        :class="button.selected ? 'text-[#267A7A] text-[18px] font-semibold selectedType' : ' hover:opacity-75' + ' duration-200 ease-in-out cursor-pointer'"
        v-for="(button, index) in postStore.buttons"
        :key="index"
      >
        {{ button.text }}
      </p>
    </div>

    <div class="w-full h-96 flex justify-center items-center flex-col" v-if="postStore?.postByOrganAndType?.length == 0">
      <h1 class="text-3xl md:text-5xl sm:text-xl text-center break-all">Lâminas não encontradas</h1>
    </div>

    <section v-else>
      <CardsContainer :gap="'gap-10'" :justify="'justify-start'" class="mb-8 mt-8 sm:mt-16">
        <SlideCards v-if="!loading" :data="postStore?.postByOrganAndType" />
      </CardsContainer>

      <ContainerGlobal class="flex justify-center flex-col">
        <div v-if="additionalData[0].material.length > 0 || additionalData[1].material.length > 0">
        <AddInfoGlobal
          
          :data="additionalData"
        />
        </div>
        <BtnDefault
          @click="push(system_id)"
          :text="'Acessar Quiz deste Órgão'"
          :link="'/portal/quiz/' + system_id"
          :block="true"
          class="mt-12 mb-5"
        />
      </ContainerGlobal>
    </section>
  </main>

  <Footer class="relative bottom-0" />
</template>

<style scoped>
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
