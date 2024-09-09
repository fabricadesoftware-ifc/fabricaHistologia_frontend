<script setup>
import { HeaderPortal, SearchBar, SearchResults, SearchAddInfo, FooterComp } from '@/components';
</script>

<template>
    <HeaderPortal size="text-3xl" title="Conteúdos" />
    <SearchBar />
    <SearchResults />
    <SearchAddInfo />
    <FooterComp class="mt-12"/>
</template>