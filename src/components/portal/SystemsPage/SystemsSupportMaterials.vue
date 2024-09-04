<script setup>
import ContainerGlobal from '@/components/layout/ContainerGlobal.vue';
import BtnDefault from '../buttons/BtnDefault.vue';

const props = defineProps({
    title: {
        type: String,
        default: "Materiais de Apoio"
    },
    description: {
        type: String,
        default: "Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materias adicionais"
    }
})
</script>

<template>
    <ContainerGlobal>
        <h3 class="text-2xl font-medium font-poppins mt-14">{{ props.title }}</h3>
        <p class="text-stone-700 mt-1 font-normal font-poppins">{{ props.description }}</p>
        <div class="flex justify-end flex-row gap-10 mt-10 mb-16">
            <BtnDefault background="bg-[#267A7A]" text="Acessar Aulas" />
            <BtnDefault background="bg-[#4B4BEB]" text="Acessar Conteúdos" />
            <BtnDefault background="bg-[#D94E4E]" text="Acessar Quiz" />
        </div>
    </ContainerGlobal>
</template>