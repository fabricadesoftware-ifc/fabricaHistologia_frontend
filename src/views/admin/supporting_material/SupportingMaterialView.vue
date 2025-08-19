<script setup>
import { onBeforeMount } from 'vue'
import { useSupportingStore } from '@/stores'
import {
  TableFilterContainer,
  TableFilterCard,
  ButtonActionAdmin,
  AdminGlobalContainer,
  ListTableAdmin,
  DataGraph
} from '@/components/index'

import { useAdmin } from '@/stores/admin/filter_admin'
const supportingStore = useSupportingStore()
const { generalFilterData, changeActive } = useAdmin()

onBeforeMount(async () => {
  await supportingStore.getMaterials()
  console.log(supportingStore.materials)
})
</script>

<template>
  <AdminGlobalContainer>
    <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center justify-between">
      <ButtonActionAdmin />
      <DataGraph
        title="Materiais de Apoio"
        :total="supportingStore.materials.length"
        seeMoreUrl="/admin/supporting-materials"
        :items="supportingStore.materials"
        groupBy="system.name" 
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
          :rows="supportingStore.materials"
          :columns="[
            { key: 'name', label: 'Nome', editable: true },
            { key: 'document_supporting_material.description', label: 'Descrição', editable: true },
            { key: 'system.name', label: 'Sistema', editable: true },
          ]"
          @update:cell="(e) => console.log('editou', e)"
        />
      </section>
    </section>
  </AdminGlobalContainer>
</template>
