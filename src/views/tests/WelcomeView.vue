<script setup>
import { useNavigationStore } from '@/stores/blog/navigation';
const navigationStore = useNavigationStore()
import {CardsContainer, ContainerGlobal, DefaultTitle, MediumCardDefault} from '@/components/index';
</script>
<template>
    <main class="w-dvw h-dvh bg-green-200">
            <ContainerGlobal class="flex justify-center items-center flex-col gap-10">
            <DefaultTitle :color="'text-black'" :weight="'font-medium'" :content="'Bem-vindo ao Portal! Explore nossos recursos'" :size="'text-3xl'" :position="'justify-center'" />
            <CardsContainer class="bg-gray-300 justify-between" >
                <MediumCardDefault v-for="(item, index) in navigationStore.state.navPortal" :key="index" :icon="item.icon" :title="item.name" />
            </CardsContainer>
            </ContainerGlobal>
    </main>
</template>