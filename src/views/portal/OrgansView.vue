<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useOrganStore, useSystemStore, useSupportingStore, usePostStore } from '@/stores';
import { HeaderPortal, CardsGlobal, ContainerGlobal, AddInfoGlobal, BtnDefault, Footer, TablePagination } from '@/components';
import { useQuizStore } from '@/stores/blog/quiz';
import { resetAll } from '@/utils/quiz';
import { useGlobalComposable } from '@/composables/global/global';

const quizStore = useQuizStore()
const route = useRoute();
const id = route.params.id;

const organStore = useOrganStore()
const systemStore = useSystemStore()
const supportingStore = useSupportingStore()
const postStore = usePostStore()

const loading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 10

// Composable para análise de órgãos
const { listAnalysis, countItems } = useGlobalComposable(
  computed(() => organStore.organsBySystem),
  postStore.getAllPostsByOrgan
)

// Dados adicionais (PDFs / Aulas)
const additionalData = ref([
  {title: 'Aulas', material: []},
  {title: 'PDFs', material: []}
])

const setAdditionalInfo = computed(() => {
  additionalData.value[0].material = supportingStore.state.materialsBySystem.filter(
    s => s.image_supporting_material == null && s.document_supporting_material == null
  )
  additionalData.value[1].material = supportingStore.state.materialsBySystem.filter(
    s => s.image_supporting_material != null || s.document_supporting_material != null
  )
})

// Função para carregar órgãos da página atual
const loadPage = async (page) => {
  loading.value = true
  await organStore.getOrgansBySystem(id, page)   // <-- backend deve suportar paginação
  await systemStore.getSystemById(id)
  await supportingStore.getMaterialsBySystem(id)
  setAdditionalInfo.value
  await listAnalysis()
  loading.value = false
}

// Carrega a primeira página
onMounted(() => loadPage(1))

// Atualiza quando muda a página
watch(currentPage, (page) => loadPage(page))

// Total de páginas
const totalPages = computed(() =>
  Math.max(1, Math.ceil(organStore.count / itemsPerPage))  // organStore.count deve ser total de órgãos
)

// Acessar quiz
const push = async (id) => {
  resetAll(quizStore)
  quizStore.getQuizBySystem(id, '')
}
</script>

<template>
  <main class="min-h-screen-minus-80 relative">
    <HeaderPortal class="mt-10" :title="systemStore.selectedSystem.name" size="text-3xl md:text-center" />

      <CardsGlobal :analisys_datas="countItems" :justify="'start'" :datas="organStore.organsBySystem" context="organ" />

      <!-- Paginação -->
      <div class="flex justify-center mt-10">
        <TablePagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="(page) => currentPage = page"
        />
      </div>

      <ContainerGlobal class="mt-16">
        <AddInfoGlobal v-if="additionalData[0].material.length > 0 || additionalData[1].material.length > 0" :data="additionalData" />

        <div class="my-10">
          <BtnDefault @click="push(id)" text="Acessar Quiz deste Sistema" :link="'/portal/quiz/' + id" background="bg-[#267A7A]" block />
        </div>
      </ContainerGlobal>
    
  </main>
  <Footer />
</template>
