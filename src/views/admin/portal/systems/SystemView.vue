<script setup>
import { onMounted } from 'vue'
import { useSystemStore } from '@/stores'
import {
  TableFilterContainer,
  TableFilterCard,
  ButtonActionAdmin,
  AdminGlobalContainer
} from '@/components/index'

import { useAdmin } from '@/stores/admin/filter_admin'
const systemStore = useSystemStore()
const { generalFilterData, changeActive } = useAdmin()

onMounted(async () => {
  await systemStore.getSystems()
  console.log(systemStore.systems)
})  

</script>

<template>
 
  <AdminGlobalContainer >

    <div class="flex gap-5 h-56 items-center justify-between ">
     <ButtonActionAdmin />
     <div class=" bg-blue-400 h-[80%] w-[40%] mr-[5%] mt-10 mb-10"></div>
    </div>
    
    
    <section>
      <div class="flex flex-col w-[90%] mx-auto">
        <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
        <TableFilterContainer :amount="generalFilterData.length">
          <TableFilterCard
            @change="changeActive(index, generalFilterData)"
            :active="i.active"
            :filter="i"
            v-for="(i, index) in generalFilterData"
            :key="index"
          />
        </TableFilterContainer>
      </div>

      <div class="p-16" v-for="(system, index) in systemStore.systems" :key="index">
        <p> {{system.id}} - {{ system.name }}</p>
        <img class=" w-24 h-24 object-cover" :src="system?.image?.url">
      </div>
    </section>
  </AdminGlobalContainer>
</template>
