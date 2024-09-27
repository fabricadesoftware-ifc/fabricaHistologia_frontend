<script setup>
import { HeaderPortal, SearchBar, SearchResults, SearchAddInfo, Footer } from '@/components';
import { computed, onMounted, ref } from 'vue';
import { useSupportingStore } from '@/stores';

const supportingStore = useSupportingStore()
const nameNotFound = ref('')

const searchByName = (name) => {
    supportingStore.searchMaterialsByName(name)
    nameNotFound.value = name
}

function saveHistory(name) {
   supportingStore.searchMaterialsByName(name)
    supportingStore.state.nameHistory = name
    nameNotFound.value = name
}

onMounted(()=>{
    supportingStore.getMaterials()
})

const returnSearchResults = computed(() => {
    return supportingStore.state.searchResults.length > 0 ? supportingStore.state.searchResults : supportingStore.state.searchResults.length <= 0 && nameNotFound.value != '' ? [] : supportingStore.state.materials
})

</script>

<template>
    <HeaderPortal size="text-3xl" title="Conteúdos" />
    <SearchBar @search="searchByName" @save="saveHistory" @searchByLast="searchByName" />
    <SearchResults :data="returnSearchResults" />
    <SearchAddInfo />
    <Footer class="mt-12"/>
</template>