<script setup>
import { BoxButton } from '@/components/index';
</script>
<template>
    <div class="w-auto h-auto flex flex-col gap-2 items-center justify-center xl:mb-24 md:mb-10 sm:mt-0">
        <h2 class="text-2xl font-normal font-poppins text-zinc-200 text-center xl:hidden tracking-widest  ">Instituto Federal Catarinense - Campus Araquari</h2>
        <h2 class="hidden text-3xl font-extralight font-poppins text-white text-center xl:block xsm:text-2xl">IFC - Campus Araquari</h2>
        <h1 class="text-7xl font-semibold font-poppins text-white text-center leading-tight xl:hidden w-10/12 2xl:w-9/12">Atlas Digital de Histologia e Patologia</h1>
        <h1 class="xsm:text-red-600 hidden w-10/12 xl:block text-7xl font-semibold font-poppins text-white text-center leading-tight sm:text-6xl sm:leading-snug xsm:text-5xl xsm:leading-normal">Atlas de Histologia e Patologia</h1>

        <router-link to="/portal" class="bg-gray-400 rounded-full w-16 h-16 xsm:w-14 xsm:h-14 mt-8 ease-in-out duration-100 hover:brightness-90  hidden 2md:block animation-rotate">
            <img src="@/assets/images/icons/arrowRight.svg" class="w-full h-full p-4" />
        </router-link>
        <BoxButton title="Aproveite nosso sistema interativo" link="/portal" class="z-10 mt-14 px-8 py-2 2md:hidden" hasArrowIcon />
    </div>
</template>
<style scoped>

.animation-rotate {
    transition: 0.3s;
    & img {
        transition: 0.3s;
    }

    &:hover img {
        width: 200px;
        transform: scale(1.2);
    }

    &:active {
        transform: scale(1.1);
    }
}

@media (max-width: 768px) {
    .btn-access {
        background-color: transparent;
    }
}
</style>