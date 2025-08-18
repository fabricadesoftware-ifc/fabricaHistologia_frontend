
<script setup>
import {TableFilterContainer, TableFilterCard} from '@/components/index';
import { useAdmin } from '@/stores/admin/filter_admin';
import TableConfig from '@/components/admin/table/TableConfig.vue';
import TablePagination from "@/components/admin/table/TablePagination.vue";

const currentPage = ref(2);
const totalPages = ref(23);

function onPageChange(newPage) {
  currentPage.value = newPage;
}

const {
    generalFilterData, 
    changeActive
} = useAdmin()
</script>
<template>
    <TableFilterContainer :amount="generalFilterData.length">
        <TableFilterCard @change="changeActive(index, generalFilterData)" :active="i.active" :filter="i" v-for="(i, index) in generalFilterData" />
    </TableFilterContainer>
 <TableConfig :additional-filters="filters" @update-config="handleConfigUpdate" />
 <TablePagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @page-change="onPageChange"
  />
</template>
