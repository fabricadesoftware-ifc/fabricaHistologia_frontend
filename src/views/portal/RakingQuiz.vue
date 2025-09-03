<script setup>
import { TablePagination, Footer, TableRanking, ButtonsRanking } from '@/components/index'
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
    <div class="w-[50%] flex flex-col gap-2 items-center justify-center min-h-screen mx-auto">
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
