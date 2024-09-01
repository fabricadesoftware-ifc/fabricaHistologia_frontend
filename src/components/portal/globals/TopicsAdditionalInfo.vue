<script setup>
const props = defineProps({
  datas: {
    type: Object,
    required: false
  },
})
</script>

<template>
  <div class="w-full h-6/12 mt-4" v-for="(item, index) in props.datas" :key="index">
    <h4 class="text-xl font-medium">{{ item.title }}</h4> 
    <ul>
      <li v-for="(ref, index) in item.refs" :key="index" class="mt-3">
        <a href="#" class="text-stone-700 font-normal font-poppins">{{ ref.link }}</a>
        <ul class="list-disc ml-5">
          <li class="text-stone-700 font-normal font-poppins">{{ ref.desc }}</li>
        </ul>   
      </li>
    </ul>
  </div>
</template>
