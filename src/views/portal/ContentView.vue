<script setup>
import { HeaderPortal, SearchBar, SearchResults, SearchAddInfo, Footer } from '@/components';
import { computed } from 'vue';
import { useSupportingStore } from '@/stores';

const supportingStore = useSupportingStore()

const searchByName = (name) => {
    supportingStore.searchMaterialsByName(name)
}

const returnSearchResults = computed(() => {
    return supportingStore.state.searchResults.length > 0 ? supportingStore.state.searchResults : []
})

</script>

<template>
    <HeaderPortal size="text-3xl" title="Conteúdos" />
    <SearchBar @search="searchByName" />
    <SearchResults :data="returnSearchResults" />
    <SearchAddInfo />
    <Footer class="mt-12"/>
</template>