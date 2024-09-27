<script setup>
const props = defineProps({
  datas: {
    type: Array,
    required: true
  },
})
</script>

<template>
  <div v-show='section.material.length > 0' class="w-full h-6/12 mt-4" v-for="(section,index) in props.datas" :key="index">
    <h4 class="text-xl font-medium">{{section.title}}</h4> 
    <ul>
      <li v-for="(item, index) in section.material" :key="index" class="mt-3">
        <a :href="item.field_name" target="_blank" class="text-stone-700 font-normal font-poppins hover:underline">{{ item.field_name }} {{ item.name }}</a>
        <ul class="list-disc ml-5">
          <li class="text-stone-700 font-normal font-poppins">{{ item.description }}</li>
        </ul>   
      </li>
    </ul>
  </div>
</template>
