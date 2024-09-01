<script setup>
import { ref } from 'vue'
import { useNavigationStore } from '@/stores/blog/navigation';
import { CardsContainer, ContainerGlobal, DefaultTitle, MediumCardDefault, FooterComp } from '@/components/index';

const navigationStore = useNavigationStore()
const getWidthScreenSize = ref(window.innerWidth)
</script>
<template>
    <main class="w-full sm:h-auto md:h-auto h-dvh flex flex-col justify-between sm:gap-16">
        <section class="sm:block flex justify-center items-center h-full">
            <div class="w-full flex flex-col gap-16">
                <DefaultTitle class="mt-16 text-center" :color="'text-black'" :weight="'font-medium'" :content="getWidthScreenSize < 1100 ? 'Bem-vindo ao portal!' : 'Bem-vindo ao Portal! Explore nossos recursos'" :size="'text-3xl'" :position="'justify-center'" />
                <CardsContainer class="justify-between mb-16 2xl:justify-center xl:mb-0 xl:pb-5" >
                    <MediumCardDefault v-for="(item, index) in navigationStore.state.navPortal" :key="index" :icon="item.icon" :title="item.name" />
                </CardsContainer>
            </div>
        </section>
        <FooterComp />
    </main>
</template>