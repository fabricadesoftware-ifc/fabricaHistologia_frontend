<script setup>
import InitialButtonComp from '@/components/InitialButtonComp.vue'
</script>
<template>
    <div class="w-auto h-8 flex gap-5 items-center">
        <router-link to="#" class="font-poppins text-white text-lg">Sobre o Projeto</router-link>
        <InitialButtonComp :title="'Acessar Portal'" :has-arrow-icon="false" class="p-5"/>
    </div>
</template>

<style scoped>

.btn-access {
    background-color: rgba(255, 255, 255, 0.3);
}
</style>