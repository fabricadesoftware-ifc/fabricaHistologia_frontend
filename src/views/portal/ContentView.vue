<script setup>
import { HeaderPortal, SearchBar, SearchResults, SearchAddInfo, Footer, LoadingSpinner, TablePagination } from '@/components';
import { computed, onMounted, ref, watch } from 'vue';
import { useSupportingStore } from '@/stores';
import { setSystemFilter, cleanFilter, searchByName, saveHistory, nameNotFound } from '@/utils/search';

const supportingStore = useSupportingStore()
const loading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 10

// Computed para exibir resultados da página atual
const returnSearchResults = computed(() => {
    if (supportingStore.state.searchResults.length > 0) {
        return supportingStore.state.searchResults
    } else if (supportingStore.state.searchResults.length <= 0 && nameNotFound.value != '') {
        return []
    } else {
        return supportingStore.state.materials
    }
})

// Função para carregar materiais de uma página
const loadPage = async (page) => {
    loading.value = true
    await supportingStore.getMaterials(page)  // <-- backend deve suportar paginação
    loading.value = false
}

// Carrega a primeira página
onMounted(() => loadPage(1))

// Watch para mudança de página
watch(currentPage, (page) => loadPage(page))

// Total de páginas (assumindo que supportingStore.count existe)
const totalPages = computed(() => 
    Math.max(1, Math.ceil(supportingStore.count / itemsPerPage))
)
</script>

<template>
<main class="min-h-screen-minus-80">
    <HeaderPortal size="text-3xl" title="Conteúdos" />
    
    <SearchBar @search="searchByName" @save="saveHistory" @searchByLast="searchByName" />

    <LoadingSpinner v-if="loading" class="my-10" />

    <template v-else>
        <SearchResults @cleanFilter="cleanFilter" @filter="setSystemFilter" :data="returnSearchResults" />

        <!-- Paginação -->
        <div class="flex justify-center mt-10">
            <TablePagination
                :current-page="currentPage"
                :total-pages="totalPages"
                @page-change="(page) => currentPage = page"
            />
        </div>

        <SearchAddInfo />
    </template>
</main>
<Footer />
</template>
