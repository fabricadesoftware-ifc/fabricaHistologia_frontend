<script setup>
import { TablePagination, Footer, TableRankin0, ButtonsRanking } from '@/components/index'
import { ref } from 'vue'

const currentPage = ref(1)
const totalPages = ref(5)

// função que troca de página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>
<template>
    <div class="w-full flex flex-col items-center">
<ButtonsRanking />
  <TableRanking />

  <TablePagination
    class="mt-6"
    :current-page="currentPage"
    :total-pages="totalPages"
    @page-change="(page) => (currentPage = page)"
  />

  <Footer />
  </div>
</template>
