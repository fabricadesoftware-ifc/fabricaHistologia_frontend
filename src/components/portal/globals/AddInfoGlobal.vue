<script setup>
import { ContainerGlobal, TopicsAdditionalInfo, BtnDefault, BtnStroke} from '@/components/index';

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
  },
  buttons: {
    type: Boolean,
    required: false
  }
})
</script>
<template>
    <div>
      <h3 class="text-2xl font-medium font-poppins">{{ props.title }}</h3>
      <p class="text-stone-700 mt-1 font-normal font-poppins">{{ props.description }}</p>
    </div>
    <TopicsAdditionalInfo :datas="props.data" />
    <div class="w-full flex justify-end gap-6 flex-wrap min-w-4/5 sm:justify-center" v-show="props.buttons">
      <BtnStroke :text="'Perguntas Frequentes'" :border="'border-black'" :color="'text-black'" /> 
      <BtnDefault :text="'Ser um Colaborador'" :color="'text-white'" :background="'bg-black'" />
    </div>
</template>
