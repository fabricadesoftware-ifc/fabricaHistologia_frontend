<script setup>
import TitleInitialPageComp from '@/components/TitleInitialPageComp.vue'
</script>
<template>
    <main class="grid grid-cols-5 grid-rows-3 w-dvw h-dvh bg-cover bg-bottom main-Initial-Page">
        <div class="col-1 col-start-2 col-end-5 row-span-3 flex flex-col items-center justify-center">
            <TitleInitialPageComp  />
            <button class="flex items-center p-4 gap-5 mt-12 rounded-md text-base font-medium text-white font-poppins tracking-wide leading-4 btn-access">Aproveite Nosso Sistema Interativo <a href="#">-></a></button>
        </div>
    </main>
</template>
<style scoped>
.main-Initial-Page {
    background-image: url('@/assets/media/intialBgImage.png')
}

.btn-access {
    background-color: rgba(255, 255, 255, 0.3);
}
</style>