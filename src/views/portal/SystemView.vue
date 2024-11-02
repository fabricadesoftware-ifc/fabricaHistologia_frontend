<script setup>
import { onMounted } from 'vue';
import { useSystemStore } from '@/stores';
import { 
    HeaderPortal,
    CardsGlobal,
    ContainerGlobal,
    AddInfoGlobal,
    BtnDefault,
    Footer
} from '@/components';

const store = useSystemStore()

onMounted(() => {
    store.getSystems()
})
</script>

<template>
    <main class=" min-h-screen-minus-80 relative">
    <HeaderPortal class="mt-10" title="Selecione o Sistema" size="text-3xl md:text-center" />
    <CardsGlobal :gap="'gap-10'" :justify="'justify-start'" :datas="store.systems" />
    
    <ContainerGlobal class="mt-16">
        <AddInfoGlobal :link="'/portal/quiz/'" :datas="{}" />
        <div class="flex justify-end flex-row flex-wrap lg:justify-center gap-10 mt-10">
            <BtnDefault to="/portal/content" background="bg-[#4B4BEB]" text="Acessar Conteúdos" />
            <BtnDefault :link="'/portal/quiz'" background="bg-[#D94E4E]" text="Acessar Quiz" />
        </div>
    </ContainerGlobal>
    </main>
    <Footer />
</template>