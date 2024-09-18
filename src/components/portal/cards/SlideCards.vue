<script setup>
const props = defineProps({
  data: {
    type: Array
  }
})
</script>
<template>
    <router-link v-for="(item, index) in props.data" :key="index" :to="'/portal/post/' + item.id ">
      <div
        class="group/container mb-4 w-52 h-64 flex flex-col rounded-2xl shadow-lg duration-200 ease-out hover:cursor-pointer hover:shadow-xl cursor-default"
      >
        <div class="w-full h-3/6 rounded-t-xl">
          <img :src="item.image.file" class="rounded-t-2xl" alt="" />
        </div>
        <div
          class="group/boxtext w-full h-3/6 flex flex-col rounded-b-xl bg-white p-3 group-hover/container:bg-zinc-100"
        >
          <div class="w-full h-2/6 flex items-center">
            <ul class="flex list-none w-full justify-around text-white font-poppins text-xs">
              <li
                class="`bg-purple-700 text-white px-3 py-1 rounded-lg`"
              >
                <p>{{ item.increase }}</p>
              </li>

              <li
                class="`bg-green-600 text-white px-3 py-1 rounded-lg`"
              >
                <p>{{ item.species }}</p>
              </li>

              <li
                class="`bg-gray-400 text-black px-3 py-1 rounded-lg`"
              >
                <p>{{ item.type_cut }}</p>
              </li> 
            </ul>
          </div>
          <div
            class="w-full h-4/6 flex flex-col items-center justify-evenly font-poppins text-center"
          >
            <div class="w-full overflow-x-hidden overflow-y-hidden">
              <p class="font-normal text-xl mb-2">{{ item.name }}</p>
            </div>
            <p class="text-sm italic text-slate-600">
              {{ item.date_analysis }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
</template>
