<script setup>
import {ref} from 'vue'
import { useNavigationStore } from '@/stores/blog/navigation';
const navigationStore = useNavigationStore()
import {CardsContainer, ContainerGlobal, DefaultTitle, MediumCardDefault} from '@/components/index';

const getWidthScreenSize = ref(window.innerWidth)
</script>
<template>
    <main class="w-dvw h-dvh overflow-x-hidden">
            <ContainerGlobal class="flex justify-center items-center flex-col gap-16">
            <DefaultTitle class=" mt-16 sm:text-center":color="'text-black'" :weight="'font-medium'" :content="getWidthScreenSize < 1100 ? 'Bem-vindo ao portal!' : 'Bem-vindo ao Portal! Explore nossos recursos'" :size="'text-3xl'" :position="'justify-center'" />
            <CardsContainer class="justify-between mb-16 2xl:justify-center 2xl:gap-16 xl:mb-0 xl:pb-5 xl:gap-6" >
                <MediumCardDefault v-for="(item, index) in navigationStore.state.navPortal" :key="index" :icon="item.icon" :title="item.name" />
            </CardsContainer>
            </ContainerGlobal>
    </main>
</template>