<script setup>
import TitleInitialPageComp from '@/components/TitleInitialPageComp.vue'
import InitialButtonComp from '@/components/InitialButtonComp.vue'
import IFC_LogoComp from '@/components/IFC_LogoComp.vue'
import BoxButtonComp from '@/components/BoxButtonComp.vue'
</script>
<template>
    <main class=" grid grid-cols-5 grid-rows-3 w-dvw h-dvh bg-cover bg-top md:flex main-Initial-Page">
        <div class="row-start-1 col-start-3 col-end-6 md:hidden flex items-start justify-end absolute w-full z-10">
        <div class="h-20 w-12/12 flex items-center mt-5 mr-8">
        <BoxButtonComp />
        </div>
        </div>
        <div class="col-start-2 col-end-5 row-span-3 md:justify-between flex flex-col items-center justify-center">
            <TitleInitialPageComp  class="z-10" />
            <InitialButtonComp :title="'Aproveite nosso sistema interativo'" class="z-10 mt-14 p-4 md:hidden" />
            <InitialButtonComp :title="'LOW'" class="hidden z-10 mb-14 p-4 md:flex" :hasArrowIcon="false" />
        </div>
        <div class="col-start-1 row-start-3 flex items-end z-10 md:hidden">
            <IFC_LogoComp :isGreen="false" :margin="'0px 0px 50px 30px'" />
        </div>
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

@media (max-width: 768px) {
    .btn-access {
        background-color: transparent;
    }
}



.overlay {
    background-color: rgba(0, 0, 0, 0.03);
}

</style>