<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useOrganStore, useSystemStore, useSupportingStore } from '@/stores';
import { HeaderPortal, CardsGlobal, ContainerGlobal, AddInfoGlobal, BtnDefault, Footer  } from '@/components';
import { useQuizStore } from '@/stores/blog/quiz';
import { resetAll } from '@/utils/quiz';
const quizStore = useQuizStore()

const route = useRoute();
const id = route.params.id;
const organStore = useOrganStore()
const systemStore = useSystemStore()
const supportingStore = useSupportingStore()

const additionalData = ref([
    {title: 'Aulas', material: []},
    {title: 'PDFs', material: []}
])

// Function to filter if the material is a class our pdf based on this: If documents or images are null the material is a class, if they're not null is a pdf

const setAdditionalInfo = computed(()=>{
    additionalData.value[0].material = supportingStore.state.materialsBySystem.filter(s => s.image_supporting_material == null && s.document_supporting_material == null)

    additionalData.value[1].material = supportingStore.state.materialsBySystem.filter(s => s.image_supporting_material != null || s.document_supporting_material != null)
})


onMounted(async () => {
    await organStore.getOrgansBySystem(id)
    await systemStore.getSystemById(id)
    await supportingStore.getMaterialsBySystem(id)
    setAdditionalInfo.value
})

const push = async(id) => { 
    resetAll()
    quizStore.getQuizBySystem(id, '') 
}

onMounted(()=>{
    console.log()
})
</script>

<template>
    <main class=" min-h-screen-minus-80 relative">
    <HeaderPortal class="mt-10" :title="systemStore.selectedSystem.name" size="text-3xl md:text-center" />
    <CardsGlobal :justify="'start'" :datas="organStore.organsBySystem" context="organ" />
    <ContainerGlobal class="mt-16 ">
        <AddInfoGlobal :data='additionalData' />
        <div class="my-10">
            <BtnDefault @click="push(id)" text="Acessar Quiz deste Sistema" :link="'/portal/quiz/' + id" background="bg-[#267A7A]" block />
        </div>
    </ContainerGlobal>
</main>
    <Footer />
</template>