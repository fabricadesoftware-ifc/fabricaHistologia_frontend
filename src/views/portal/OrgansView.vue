<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useOrganStore, useSystemStore, useSupportingStore } from '@/stores';
import { HeaderPortal, CardsGlobal, ContainerGlobal, AddInfoGlobal, BtnDefault, Footer  } from '@/components';
import { data } from 'autoprefixer';

const router = useRoute();
const id = router.params.id;
const organStore = useOrganStore()
const systemStore = useSystemStore()
const supportingStore = useSupportingStore()

const additionalData = ref([
    {title: 'Aulas', material: []},
    {title: 'PDFs', material: []}
])

// Function to filter if the material is a class our pdf based on this: If documents or images are null the material is a class, if they're not null is a pdf

const setAdditionalInfo = computed(()=>{
    additionalData.value[0].material = supportingStore.state.materialsBySystem.filter(s => s.image_supporting_material == null || s.document_supporting_material == null)

    additionalData.value[1].material = supportingStore.state.materialsBySystem.filter(s => s.image_supporting_material != null || s.document_supporting_material != null)
})


onMounted(async () => {
     organStore.getOrgansBySystem(id)
     systemStore.getSystemById(id)
    await supportingStore.getMaterialsBySystem(id)
    setAdditionalInfo.value
    setTimeout(()=>{console.log(additionalData.value)},1000)
})

</script>

<template>
    <HeaderPortal class="mt-10" :title="systemStore.selectedSystem.name" size="text-3xl md:text-center" />
    <CardsGlobal :datas="organStore.organsBySystem" context="organ" />
    <ContainerGlobal class="mt-16 ">
        <AddInfoGlobal :data='additionalData' />
        <div class="my-10">
            <BtnDefault text="Acessar Quiz deste Sistema" background="bg-[#267A7A]" block />
        </div>
    </ContainerGlobal>
    <Footer />
</template>