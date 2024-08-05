<script setup>
const props = defineProps({
    informations: {
        type: Object
    },
})
</script>

<template>
  <div class="w-full h-6/12 mt-4" v-for="(item, index) in props.informations" :key="index">
    <h4 class="text-xl font-medium">{{ item.tittle }}</h4> 

    <ul>
      <li v-for="(itens,index) in item.informations" :key="index" class="mt-3">
        <a href="#" class="text-stone-700 font-normal font-poppins">{{ itens.link }}</a>
        <ul class="list-disc ml-5">
            <li class="text-stone-700 font-normal font-poppins">{{ itens.desc }}</li>
        </ul>   
      </li>
    </ul>
  </div>
</template>
