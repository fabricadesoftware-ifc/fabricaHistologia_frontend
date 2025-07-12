<script setup>
import {TableFilterContainer, TableFilterCard} from '@/components/index';
import { generalFilterData, changeActive } from '@/stores/admin/filter_admin';
</script>
<template>
    <TableFilterContainer class="mx-auto" :amount="generalFilterData.length">
        <TableFilterCard @change="changeActive(index, generalFilterData)" :active="i.active" :filter="i" v-for="(i, index) in generalFilterData" />
    </TableFilterContainer>

</template>