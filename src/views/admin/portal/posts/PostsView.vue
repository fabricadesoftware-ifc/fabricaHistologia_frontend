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

onBeforeMount(async () => {
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


      <section>
 <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-[95%] mx-auto mt-8">
  <RouterLink
    v-for="posts in postStore.posts"
    :key="posts.id"
    :to="`/admin/posts/${posts.id}`"
    class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-3 flex flex-col items-center group border border-zinc-200 hover:border-[#29AC96] min-h-[160px]"
  >
    <img
      class="w-12 h-12 object-cover rounded-md mb-2 border border-zinc-100 group-hover:border-[#29AC96]"
      :src="posts?.image?.url"
      :alt="posts.name"
    />
    <p class="font-semibold text-[#267A7A] group-hover:text-[#29AC96] text-sm mb-0.5 text-center truncate w-full">
      {{ posts.name }}
    </p>
    <span class="text-[10px] text-zinc-500 mb-0.5">ID: {{ posts.id }}</span>
    <span class="text-[10px] text-zinc-400 truncate w-full text-center">{{ posts.species?.name }}</span>
  </RouterLink>
</div>
</section>

    </section>
  </AdminGlobalContainer>
</template>
