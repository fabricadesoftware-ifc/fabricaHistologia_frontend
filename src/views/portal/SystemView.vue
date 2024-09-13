<script setup>
import { onMounted, computed } from 'vue';
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
    store.getSystem()
})

const systems = computed(() => {
    return store.state.systems
})

</script>

<template>
    <HeaderPortal class="mt-10" title="Selecione o Sistema" size="text-3xl md:text-center" />
    <CardsGlobal :datas="systems" />
    
    <ContainerGlobal class="mt-16 ">
        <AddInfoGlobal :datas="{}" />
        <div class="flex justify-end flex-row flex-wrap lg:justify-center gap-10 mt-10 mb-16">
            <BtnDefault background="bg-[#267A7A]" text="Acessar Aulas" />
            <BtnDefault background="bg-[#4B4BEB]" text="Acessar Conteúdos" />
            <BtnDefault background="bg-[#D94E4E]" text="Acessar Quiz" />
        </div>
    </ContainerGlobal>
    <Footer />
</template>