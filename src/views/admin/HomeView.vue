<script setup>
import {TableFilterContainer, TableFilterCard} from '@/components/index';
import { useAdmin } from '@/stores/admin/filter_admin';

const {
    generalFilterData, 
    changeActive
} = useAdmin()
</script>
<template>
    <TableFilterContainer :amount="generalFilterData.length">
        <TableFilterCard @change="changeActive(index, generalFilterData)" :active="i.active" :filter="i" v-for="(i, index) in generalFilterData" />
    </TableFilterContainer>

</template>