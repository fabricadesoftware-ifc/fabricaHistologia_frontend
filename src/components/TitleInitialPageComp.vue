<script setup>
import InitialButtonComp from './InitialButtonComp.vue';
</script>
<template>
    <div class="w-auto h-auto flex flex-col gap-2 items-center justify-center xl:mb-24 md:mt-10">
        <h2 class="text-2xl font-normal font-poppins text-zinc-200 text-center xl:hidden tracking-widest">Instituto Federal Catarinense - Campus Araquari</h2>
        <h2 class="hidden text-3xl font-extralight font-poppins text-white text-center xl:block">IFC - Campus Araquari</h2>
        <h1 class="text-7xl font-semibold font-poppins text-white text-center leading-tight xl:hidden">Atlas Digital de Histologia</h1>
        <h1 class="hidden xl:block text-7xl font-semibold font-poppins text-white text-center leading-tight">Atlas de Histologia</h1>

        <InitialButtonComp :title="'Aproveite nosso sistema interativo'" class="z-10 mt-14 px-4 py-1.5 md:hidden" />
    </div>
</template>
<style scoped>

@media (max-width: 768px) {
    .btn-access {
        background-color: transparent;
    }
}
</style>