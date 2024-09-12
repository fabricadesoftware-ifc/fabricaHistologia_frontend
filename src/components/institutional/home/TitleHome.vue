<script setup>
import { BoxButton } from '@/components/index';
</script>
<template>
    <div class="w-auto h-auto flex flex-col gap-2 items-center justify-center xl:mb-24 sm:mt-0">
        <h2 class="text-2xl font-normal font-poppins text-zinc-200 text-center xl:hidden tracking-widest">Instituto Federal Catarinense - Campus Araquari</h2>
        <h2 class="hidden text-3xl font-extralight font-poppins text-white text-center xl:block">IFC - Campus Araquari</h2>
        <h1 class="text-7xl font-semibold font-poppins text-white text-center leading-tight xl:hidden">Atlas Digital de Histologia</h1>
        <h1 class="hidden xl:block text-7xl font-semibold font-poppins text-white text-center leading-tight">Atlas de Histologia</h1>

        <router-link to="/portal" class="bg-gray-400 rounded-full w-16 h-16 mt-8 ease-in-out duration-100 hover:brightness-90  hidden md:block animation-rotate">
            <img src="@/assets/images/icons/arrowRight.svg" class="w-full h-full p-4" />
        </router-link>
        <BoxButton title="Aproveite nosso sistema interativo" link="/portal" class="z-10 mt-14 px-8 py-2 md:hidden" hasArrowIcon />
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