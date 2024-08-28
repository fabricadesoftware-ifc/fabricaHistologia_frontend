<script setup>
import { useNavigationStore } from '@/stores/blog/navigation';
const navigationStore = useNavigationStore()
import {CardsContainer, ContainerGlobal, DefaultTitle, MediumCardDefault} from '@/components/index';
</script>
<template>
    <main class="w-dvw h-dvh">
            <ContainerGlobal class="flex justify-center items-center flex-col gap-16">
            <DefaultTitle :color="'text-black'" :weight="'font-medium'" :content="'Bem-vindo ao Portal! Explore nossos recursos'" :size="'text-3xl'" :position="'justify-center'" />
            <CardsContainer class="justify-between mb-16" >
                <MediumCardDefault v-for="(item, index) in navigationStore.state.navPortal" :key="index" :icon="item.icon" :title="item.name" />
            </CardsContainer>
            </ContainerGlobal>
    </main>
</template>