<script setup>
import TopicsAditionalInfoComp from './TopicsAditionalInfoComp.vue';

const objs = [
    {tittle: 'Aulas', informations: [{link: 'link para a aula 1', desc: 'breve descricao'}, {link: 'link para a aula 2', desc: 'breve descricao'}]},
    {tittle: 'PDF"s', informations: [{link: 'link para o mapa mental/documento 1', desc: 'breve descricao'}, {link: 'link para o mapa mental/documento 2', desc: 'breve descricao'}]}
] 

const props = defineProps({
  tittle: {
    type: String
  },
  description: {
    type: String
  }
})
</script>
<template>
  <section class="w-6/12 h-auto grid-cols-1 grid-rows-3">
    <div>
      <h3 class="text-2xl font-medium font-poppins">{{props.tittle}}</h3>
         <p class="text-stone-700 font-normal font-poppins">{{ props.description }}</p>
    </div>

    <TopicsAditionalInfoComp :informations="objs" />
  </section>
</template>

