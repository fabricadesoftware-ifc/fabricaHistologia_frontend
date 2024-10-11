<script setup>
import { ref } from 'vue'
import { useNavigationStore } from '@/stores/blog/navigation';
import { CardsContainer, DefaultTitle, MediumCardDefault, ContainerGlobal, Footer } from '@/components/index';

const navigationStore = useNavigationStore()
const getWidthScreenSize = ref(window.innerWidth)
</script>
<template>
    <main class="w-full sm:h-auto md:h-auto h-dvh flex flex-col justify-between sm:gap-16">
       <ContainerGlobal class=" lg:h-auto flex justify-center items-center h-full">
            <div class="w-full flex flex-col gap-16 mb-16 lg:mb-10 sm:mb-0">
                <DefaultTitle class="mt-16 text-center" :color="'text-black'" :weight="'font-medium'" :content="getWidthScreenSize < 1100 ? 'Bem-vindo ao portal!' : 'Bem-vindo ao Portal! Explore nossos recursos'" :size="'text-3xl'" :position="'justify-center'" />
                <CardsContainer :gap="'gap-0'" :justify="'justify-center'" class="justify-between w-11/12 lg:w-8/12 lg:flex-col lg:items-center
                 lg:h-screen lg:gap-10 lg:flex-nowrap mb-16 2xl:justify-center xl:mb-0 xl:pb-5 sm:w-11/12" >
                    <MediumCardDefault class="lg:w-9/12 sm:w-10/12" v-for="(item, index) in navigationStore.state.navPortal" :key="index" :item="item" />
                </CardsContainer>
            </div>
        </ContainerGlobal>
        <Footer />
    </main>
</template>