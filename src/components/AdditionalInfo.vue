<script setup>
import ContainerDefault from './ContainerDefault.vue';
import TopicsAdditionalInfo from './TopicsAdditionalInfo.vue'

const datas = [
  {
    title: 'Aulas',
    refs: [
      { link: 'link para a aula 1', desc: 'breve descricao' },
      { link: 'link para a aula 2', desc: 'breve descricao' }
    ]
  },
  {
    title: 'PDF"s',
    refs: [
      { link: 'link para o mapa mental/documento 1', desc: 'breve descricao' },
      { link: 'link para o mapa mental/documento 2', desc: 'breve descricao' }
    ]
  }
]

const props = defineProps({
  title: {
    type: String
  },
  description: {
    type: String
  }
})
</script>
<template>
  <ContainerDefault>
    <div>
      <h3 class="text-2xl font-medium font-poppins">{{ props.title }}</h3>
      <p class="text-stone-700 font-normal font-poppins">{{ props.description }}</p>
    </div>
    <TopicsAdditionalInfo :datas="datas" />
  </ContainerDefault>
</template>
