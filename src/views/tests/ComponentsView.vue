<script setup>
import ContainerDefault from '@/components/ContainerDefault.vue';
import AditionalInfoComp from '@/components/AditionalInfoComp.vue';
</script>

<template>
    <h1>Biblioteca de Componentes</h1>
    <!-- <hr> -->
    <!-- <p>component name</p> -->
    <!-- <Component -->
    <!-- <hr> -->

    <hr>
    <p>Main Container</p>
     <ContainerDefault>
        test
    </ContainerDefault>
    <hr>

    <hr>
    <p>AditionalInfo</p>
    <AditionalInfoComp :tittle="'Materiais de Apoio'" :description="'Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materias adicionais'" />
    <hr>
</template>