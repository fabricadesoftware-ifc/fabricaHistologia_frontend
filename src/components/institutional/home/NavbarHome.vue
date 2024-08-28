<script setup>
import { BoxButton } from '@/components/index';
</script>

<template>
    <div class="w-auto h-8 flex gap-5 items-center absolute top-10 right-8">
        <router-link to="/about" class="font-poppins text-white text-lg hover:text-gray-200 ease-in duration-100">Sobre o Projeto</router-link>
        <BoxButton link="/login" class="p-5"/>
    </div>
</template>