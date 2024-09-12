<script setup>
import { HeaderPortal, SearchBar, SearchResults, SearchAddInfo, Footer } from '@/components';
</script>

<template>
    <HeaderPortal size="text-3xl" title="Conteúdos" />
    <SearchBar />
    <SearchResults />
    <SearchAddInfo />
    <Footer class="mt-12"/>
</template>