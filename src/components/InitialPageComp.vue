<script setup>
import TitleInitialPageComp from '@/components/TitleInitialPageComp.vue'
import InitialButtonComp from '@/components/InitialButtonComp.vue'
import IFC_LogoComp from '@/components/IFC_LogoComp.vue'
import BoxButtonComp from '@/components/BoxButtonComp.vue'
import InitialSearchButtonComp from './InitialSearchButtonComp.vue'
</script>
<template>
    <main class=" grid grid-cols-5 grid-rows-3 w-dvw h-dvh bg-cover bg-top md:flex main-Initial-Page">
        <div class="row-start-1 col-start-3 col-end-6 xl:hidden flex items-start justify-end absolute w-full z-10">
        <div class="h-20 w-12/12 flex items-center mt-5 mr-8">
        <BoxButtonComp />
        </div>
        </div>
        <div class="col-start-1 col-end-6 w-full h-full row-span-3 md:justify-between flex flex-col items-center justify-center absolute">
            <TitleInitialPageComp  class="z-10" />
            <InitialButtonComp :title="'Aproveite nosso sistema interativo'" class="z-10 mt-14 px-4 py-1.5 xl:hidden" />
            <InitialButtonComp class="hidden z-10 mb-12 p-4 xl:flex xl:absolute xl:bottom-0 xl:mb-5" :hasArrowIcon="true" />
        </div>
        <div class="col-start-1 row-start-3 flex items-end z-10 xl:hidden">
            <IFC_LogoComp :isGreen="false" :margin="'0px 0px 50px 30px'" />
        </div>
       <InitialSearchButtonComp class="absolute bottom-0 right-0 mb-10 mr-10 z-10" />
        <div class="absolute w-dvw h-dvh z-0 overlay"></div> 
    </main>
</template>
<style scoped>
.main-Initial-Page {
    background-image: url('@/assets/media/intialBgImage.png');
    z-index: 10;
}

.btn-access {
    background-color: rgba(255, 255, 255, 0.23);
}

@media (max-width: 1280px) {
    .btn-access {
        background-color: transparent;
    }
}



.overlay {
    background-color: rgba(0, 0, 0, 0.03);
}

</style>