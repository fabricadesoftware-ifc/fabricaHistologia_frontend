<script setup>
import TopicsAditionalInfoComp from './TopicsAditionalInfoComp.vue';

const objs = [
    {tittle: 'Aulas', informations: [{link: 'link para a aula 1', desc: 'breve descricao'}, {link: 'link para a aula 2', desc: 'breve descricao'}]},
    {tittle: 'PDF"s', informations: [{link: 'link para o mapa mental/documento 1', desc: 'breve descricao'}, {link: 'link para o mapa mental/documento 2', desc: 'breve descricao'}]}
] 
</script>
<template>
  <section class="w-7/12 h-auto grid-cols-1 grid-rows-3 ml-40 mt-40">
    <div>
      <h3 class="text-2xl font-medium font-poppins">Materiais de Apoio</h3>
         <p class="text-stone-700 font-normal font-poppins"> Que tal estudar com um quiz interativo ou talvez com um mapa mental. Clique no botão e
          aproveite nossos materias adicionais</p>
    </div>

    <TopicsAditionalInfoComp :informations="objs" />
  </section>
</template>

