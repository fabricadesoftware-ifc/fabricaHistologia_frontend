<script setup>
import ContainerDefault from '@/components/ContainerDefault.vue';
import AdditionalInfo from '@/components/AdditionalInfo.vue';
import BackButton from '../../components/BackButton.vue';
import MainButton from '../../components/MainButton.vue';

</script>

<template>
    <main>
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
        <AdditionalInfo :title="'Materiais de Apoio'" :description="'Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materias adicionais'" />
        <hr>
        
        <hr>
        <p>Back Button</p> 
        <BackButton />
        <hr>
        <br>
        <hr>
        <p>Main button</p>
        <MainButton text="Dificil" :background="'red'" :stroke="true" :color="'blue'" />
    </main>
</template>
