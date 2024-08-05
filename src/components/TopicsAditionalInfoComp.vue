<script setup>
const props = defineProps({
    tittle: {
        type: String
    },
    informations: {
        type: Object
    },
    subInformations: {
        type: Object
    }
})
</script>

<template>
  <div class="w-full h-6/12 mt-4" v-for="(item, index) in props.informations" :key="index">
    <h4 class="text-2xl font-medium">{{ props.tittle }}</h4> 

    <ul>
      <li v-for="(itens,index) in subInformations" :key="index">
        <a href="#">{{ itens }}</a>
        <ul class="list-disc ml-5">
            <li>{{ itens }}</li>
        </ul>   
      </li>
    </ul>
  </div>
</template>
