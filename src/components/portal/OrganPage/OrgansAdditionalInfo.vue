<script setup>
import { AddInfoGlobal, ContainerGlobal, BtnDefault } from '@/components';

const props = defineProps({
    dados: {
        type: Object,
        required: false
    }
})
</script>

<template>
    <ContainerGlobal class="mt-16 ">
        <AddInfoGlobal :data="props.dados.data" :title="props.dados.title" :description="props.dados.description"/>
        <div class="my-10">
            <BtnDefault class="my-10" :block="true" text="Acessar Quiz deste Sistema" background="bg-[#267A7A]" />
        </div>
    </ContainerGlobal>
</template>