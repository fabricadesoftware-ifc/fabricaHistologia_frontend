<script setup>
import { HeaderPortal, SearchBar, SearchResults, SearchAddInfo, Footer } from '@/components';
import { computed, onMounted, ref } from 'vue';
import { useSupportingStore } from '@/stores';
import {setSystemFilter, cleanFilter, searchByName, saveHistory, nameNotFound, systemid} from '@/utils/search'
const supportingStore = useSupportingStore()

const returnSearchResults = computed(() => {
    return supportingStore.state.searchResults.length > 0 ? supportingStore.state.searchResults : supportingStore.state.searchResults.length <= 0 && nameNotFound.value != '' ? [] : supportingStore.state.materials
})

onMounted(()=>{
    supportingStore.getMaterials()
})

</script>

<template>
    <main class="min-h-screen-minus-80">
    <HeaderPortal size="text-3xl" title="Conteúdos" />
    <SearchBar @search="searchByName" @save="saveHistory" @searchByLast="searchByName" />
    <SearchResults @cleanFilter="cleanFilter" @filter="setSystemFilter" :data="returnSearchResults" />
    <SearchAddInfo />
    </main>
    <Footer />
</template>