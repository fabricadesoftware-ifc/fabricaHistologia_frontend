<script setup>
import ContainerDefault from './ContainerDefault.vue';
import TopicsAdditionalInfo from './TopicsAdditionalInfo.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  data: {
    type: Object,
    required: false
  }
})
</script>
<template>
  <ContainerDefault>
    <div>
      <h3 class="text-2xl font-medium font-poppins">{{ props.title }}</h3>
      <p class="text-stone-700 mt-1 font-normal font-poppins">{{ props.description }}</p>
    </div>
    <TopicsAdditionalInfo :datas="props.data" />
  </ContainerDefault>
</template>
