<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrganStore, useSystemStore } from '@/stores';
import { HeaderPortal, CardsGlobal, ContainerGlobal, AddInfoGlobal, BtnDefault, Footer  } from '@/components';

const router = useRoute();
const id = router.params.id;
const organStore = useOrganStore()
const systemStore = useSystemStore()

onMounted(() => {
    organStore.getOrgansBySystem(id)
    systemStore.getSystemById(id)
})
</script>

<template>
    <HeaderPortal class="mt-10" :title="systemStore.selectedSystem.name" size="text-3xl md:text-center" />
    <CardsGlobal :datas="organStore.organsBySystem" context="organ" />
    <ContainerGlobal class="mt-16 ">
        <AddInfoGlobal />
        <div class="my-10">
            <BtnDefault text="Acessar Quiz deste Sistema" background="bg-[#267A7A]" block />
        </div>
    </ContainerGlobal>
    <Footer />
</template>