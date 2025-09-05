<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useSystemStore, useOrganStore } from '@/stores';
import { 
    HeaderPortal,
    CardsGlobal,
    ContainerGlobal,
    AddInfoGlobal,
    BtnDefault,
    Footer,
    TablePagination,
} from '@/components';
import { useGlobalComposable } from '@/composables/global/global';

const store = useSystemStore()
const organStore = useOrganStore()
const loading = ref(true)

const {
     listAnalysis,
     countItems
} = useGlobalComposable(computed(() => store.systems), organStore.getAllOrgansBySystem)

onMounted(async () => {
  loading.value = true
  await store.getSystems(1)       // pega só a página 1
  await listAnalysis()            // pega os órgãos só da página carregada
  loading.value = false
})

const currentPage = ref(1)
const itemsPerPage = 10
const totalPages = computed(() =>
  Math.max(1, Math.ceil(store.count / itemsPerPage))
)
const paginatedSystems = computed(() => store.systems)

watch(currentPage, async (page) => {
  loading.value = true
  await store.getSystems(page)     // busca sistemas da página atual
  await listAnalysis()             // atualiza countItems ou órgãos dessa página
  loading.value = false
})
</script>

<template>
    <main class=" min-h-screen-minus-80 relative">
    <HeaderPortal class="mt-10" title="Selecione o Sistema" size="text-3xl md:text-center" />
    <CardsGlobal  :analisys_datas="countItems" :gap="'gap-10'" :justify="'justify-start'" :datas="paginatedSystems" />
    <div class="flex justify-center mt-10">
      <TablePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="(page) => (currentPage = page)"
          />
    </div>
    <ContainerGlobal class="mt-16 mb-4">
        <AddInfoGlobal :link="'/portal/quiz/'" :datas="{}" />
        <div class="flex justify-end flex-row flex-wrap lg:justify-center gap-10 mt-10">
            <BtnDefault to="/portal/content" background="bg-[#4B4BEB]" text="Acessar Conteúdos" />
            <BtnDefault :link="'/portal/quiz'" background="bg-[#D94E4E]" text="Acessar Quiz" />
        </div>
    </ContainerGlobal>
   
    </main>
    <Footer />
</template>