<script setup>
import { onMounted, onBeforeMount } from 'vue'
import { usePostStore } from '@/stores'
import {
  TableFilterContainer,
  TableFilterCard,
  ButtonActionAdmin,
  AdminGlobalContainer,
  ListTableAdmin,
  DataGraph
} from '@/components/index'

import { useAdmin } from '@/stores/admin/filter_admin'
const postStore = usePostStore()
const { generalFilterData, changeActive } = useAdmin()

onBeforeMount(async () => {
  await postStore.getPosts()
  console.log(postStore.posts)
})  

</script>

<template>
 
  <AdminGlobalContainer >

    <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center justify-between">
     <ButtonActionAdmin />
     <DataGraph
        title="Lâminas"
        :total="postStore.posts.length"
        seeMoreUrl="/admin/posts"
        :items="postStore.posts"
        groupBy="organ.name"
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
<section>

  <ListTableAdmin
  :rows="postStore.posts"
  :columns="[
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome', editable: true },
    { key: 'species.name', label: 'Espécie' },
    { key: 'image.url', label: 'Imagem', type: 'image' }
  ]"
  @update:cell="(e) => console.log('editou', e)"
/>
  
</section>
</section>
    </section>
  </AdminGlobalContainer>
</template>
