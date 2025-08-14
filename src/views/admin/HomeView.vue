<script setup>
import { ref } from "vue";
import TablePagination from "@/components/admin/table/TablePagination.vue";

const currentPage = ref(2);
const totalPages = ref(23);

function onPageChange(newPage) {
  currentPage.value = newPage;
}
</script>

<template>
  <TablePagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @page-change="onPageChange"
  />
</template>
