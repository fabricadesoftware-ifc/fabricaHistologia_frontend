<script setup>
import { onMounted } from 'vue'
import { usePostStore } from '@/stores'
import {
  TableFilterContainer,
  TableFilterCard,
  ButtonActionAdmin,
  AdminGlobalContainer
} from '@/components/index'

import { useAdmin } from '@/stores/admin/filter_admin'
const postStore = usePostStore()
const { generalFilterData, changeActive } = useAdmin()

onMounted(async () => {
  await postStore.getPosts()
  console.log(postStore.posts)
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

      <RouterLink :to="`/admin/posts/${posts.id}`" class="p-16" v-for="posts in postStore.posts">
        <p> {{posts.id}} - {{ posts.name }}</p>
        <img class=" w-24 h-24 object-cover" :src="posts?.image?.url">
      </RouterLink>
    </section>
  </AdminGlobalContainer>
</template>
