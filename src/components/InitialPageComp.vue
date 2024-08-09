<script setup>
import TitleInitialPageComp from '@/components/TitleInitialPageComp.vue'
import IFC_LogoComp from '@/components/IFC_LogoComp.vue'
import BoxButtonComp from '@/components/BoxButtonComp.vue'
import InitialSearchButtonComp from './InitialSearchButtonComp.vue'
</script>
<template>
    <main class="w-dvw h-dvh bg-cover bg-top flex justify-center items-center sm:flex-col sm:justify-normal main-Initial-Page">

        <BoxButtonComp class="right-5 top-10 sm:relative sm:right-0 sm:top-16 z-10" />
        <TitleInitialPageComp  class="z-10 absolute top-64" />
        <IFC_LogoComp class="m-10 left-0 bottom-0 sm:m-6" />
        <InitialSearchButtonComp class="absolute bottom-0 right-0 mb-10 mr-10 z-10" />
        <div class="absolute w-dvw h-dvh z-0 overlay"></div> 

    </main>
</template>
<style scoped>
.main-Initial-Page {
    background-image: url('@/assets/media/intialBgImage.png');
    z-index: 10;
}

.overlay {
    background-color: rgba(0, 0, 0, 0.03);
}

</style>