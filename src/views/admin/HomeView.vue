<script setup>
import {
  NavLateralAdmin,
  TableFilterContainer,
  TableFilterCard,
  AdminGlobalContainer,
  TableConfig,
  TablePagination,
} from '@/components/index'
import { useAdmin } from '@/stores/admin/filter_admin'
import { ref } from 'vue';

const { generalFilterData, changeActive } = useAdmin()
</script>
<template>
  <!-- <TableFilterContainer :amount="generalFilterData.length">
        <TableFilterCard @change="changeActive(index, generalFilterData)" :active="i.active" :filter="i" v-for="(i, index) in generalFilterData" />
    </TableFilterContainer> -->
  <AdminGlobalContainer subtitle="Veja um resumo do que há cadastrado no portal">

    <div class="w-[90%] bg-blue-400 h-56 mx-auto mt-10 mb-10"></div>
    <section>
      <div class="flex flex-col w-[90%] mx-auto">
        <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
        <TableFilterContainer :amount="generalFilterData.length">
          <TableFilterCard
            @change="changeActive(index, generalFilterData)"
            :active="i.active"
            :filter="i"
            v-for="(i, index) in generalFilterData"
          />
        </TableFilterContainer>
      </div>
    </section>
  </AdminGlobalContainer>
</template>
