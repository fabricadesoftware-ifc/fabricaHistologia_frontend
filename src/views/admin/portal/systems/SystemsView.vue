<script setup>
import { onBeforeMount } from 'vue'
import { useSystemStore } from '@/stores'
import {
  TableFilterContainer,
  TableFilterCard,
  ButtonActionAdmin,
  AdminGlobalContainer,
  ListTableAdmin,
  DataGraph
} from '@/components/index'

import { useAdmin } from '@/stores/admin/filter_admin'
const systemStore = useSystemStore()
const { generalFilterData, changeActive } = useAdmin()

onBeforeMount(async () => {
  await systemStore.getSystems()
  console.log(systemStore.systems)
})  
</script>

<template>
  <AdminGlobalContainer>
    <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center justify-between">
      <ButtonActionAdmin />
      <DataGraph
        title="Sistemas"
        :total="systemStore.systems.length"
        seeMoreUrl="/admin/systems"
        :items="systemStore.systems"
        groupBy="category"
      />
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

      <section>
        <ListTableAdmin
          :rows="systemStore.systems"
          :columns="[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Nome', editable: true },
            { key: 'description', label: 'Descrição', editable: true },
            { key: 'image.url', label: 'Imagem', type: 'image' }
          ]"
          @update:cell="(e) => console.log('editou', e)"
        />
      </section>
    </section>
  </AdminGlobalContainer>
</template>
