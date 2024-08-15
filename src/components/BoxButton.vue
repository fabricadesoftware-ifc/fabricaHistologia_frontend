<script setup>
import InitialButton from '@/components/InitialButton.vue'
</script>
<template>
    <div class="w-auto h-8 flex gap-5 items-center absolute">
        <router-link to="#" class="font-poppins text-white text-lg hover:text-gray-200 ease-in duration-100">Sobre o Projeto</router-link>
        <InitialButton :title="'Acessar Portal'" :has-arrow-icon="false" class="p-5"/>
    </div>
</template>