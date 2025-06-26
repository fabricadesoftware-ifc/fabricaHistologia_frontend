<script setup>
import { onMounted } from 'vue';
import { adjusteSize } from '@/utils/quiz';

const props = defineProps({
  data: {
    type: Array
  }
})

</script>
<template>
    <router-link v-for="(item, index) in props.data" :key="index" :to="'/portal/post/' + item.id ">
      <div
        class="group/container mb-4 w-56 h-64 flex flex-col rounded-2xl shadow-lg duration-200 ease-out hover:cursor-pointer hover:shadow-xl cursor-default"
      >
        <div class="w-full h-3/6 rounded-t-xl">
          <img :src="item.image.url" class="rounded-t-2xl h-full w-full" alt="" />
        </div>
        <div
          class="group/boxtext w-full h-3/6 flex flex-col rounded-b-xl bg-white p-3 group-hover/container:bg-zinc-100"
        >
          <div class="w-full h-2/6 flex items-center">
            <ul class="flex list-none w-full justify-around text-white font- gap-3 text-xs"> 
              <li
                class="bg-green-600 overflow-hidden max-h-[25px] text-white px-1 py-1 rounded-lg flex items center justify-start"
              >
                <p class="">{{ item.species.name }}</p>
              </li>

            </ul>
          </div>
          <div
            class="w-full h-5/6 flex flex-col items-center justify-evenly font-poppins text-center"
          >
            <div class="w-full overflow-x-hidden overflow-y-hidden">
              <p class="font-normal text-lg ">{{ adjusteSize(item.name, 38, 38) }}</p>
            </div>
            <p class="text-sm italic text-slate-600">
              {{ item.post_date }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
</template>
