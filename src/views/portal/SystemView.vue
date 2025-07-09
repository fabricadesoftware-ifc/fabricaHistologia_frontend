<script setup>
import { onMounted, computed } from 'vue';
import { useSystemStore, useOrganStore } from '@/stores';
import { 
    HeaderPortal,
    CardsGlobal,
    ContainerGlobal,
    AddInfoGlobal,
    BtnDefault,
    Footer
} from '@/components';
import { useGlobalComposable } from '@/composables/global/global';

const store = useSystemStore()
const organStore = useOrganStore()

const {
     listAnalysis,
     countItems
} = useGlobalComposable(computed(() => store.systems), organStore.getOrgansBySystem)

onMounted(async () => {
    await store.getSystems()
    await listAnalysis()
})

</script>

<template>
    <main class=" min-h-screen-minus-80 relative">
    <HeaderPortal class="mt-10" title="Selecione o Sistema" size="text-3xl md:text-center" />
    <CardsGlobal :analisys_datas="countItems" :gap="'gap-10'" :justify="'justify-start'" :datas="store.systems" />
    
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