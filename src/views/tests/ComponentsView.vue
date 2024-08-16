<script setup>
import { ref } from 'vue';

import ContainerDefault from '@/components/ContainerDefault.vue';
import AdditionalInfo from '@/components/AdditionalInfo.vue';
import BackButton from '../../components/BackButton.vue';
import DefaultTitle from '@/components/DefaultTitle.vue';
import CardsContainer from '@/components/CardsContainer.vue';
import SlideCard from '@/components/SlideCard.vue';
import SearchBar from '@/components/search/SearchBar.vue'
import SearchResults from '@/components/search/SearchResults.vue';

const objs = ref([
    {name: 'Nome da lâmina', date: ['10', 'agosto', '2028'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},
    {name: 'Nome da lâmina', date: ['10', 'agosto', '2028'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},
    {name: 'Nome da lâmina', date: ['10', 'agosto', '2028'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},
    {name: 'Nome da lâmina', date: ['10', 'agosto', '2028'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},
    {name: 'Nome da lâmina', date: ['10', 'agosto', '2028'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},
])

const datas_AdditionalInfo = [
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
</script>

<template>
    <main>
        <h1>Biblioteca de Componentes</h1>
        <!-- <hr> -->
        <!-- <p>component name</p> -->
        <!-- <Component -->
        <!-- <hr> -->

        <hr class="mt-10">
        <p class="py-4">Main Container</p>
        <ContainerDefault>
            test
        </ContainerDefault>
        <hr>
            
        <hr class="mt-10">
        <p class="py-4">AditionalInfo</p>
        <AdditionalInfo title="Materiais de Apoio" description="Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materias adicionais" :datas="datas_AdditionalInfo" />
        <hr>

        <hr class="mt-10">
        <p class="py-4">AditionalInfo with BUTTONS <span class="text-red-500">(INCOMPLETO)</span></p>
        <AdditionalInfo title="Não Achou oque procurava?" description="Nós ajude a melhorar fazendo parte do grupo de colaboradores! acesse o link a baixo e solicite uma conta. Nós ajude a melhorar fazendo parte do grupo de colaboradores! acesse o link a baixo e solicite uma conta. " buttons />
        <hr>
        
        <hr class="mt-10">
        <p class="py-4">Back Button</p> 
        <BackButton />
        <hr>

        <hr class="mt-10">
        <p class="py-4">Title Component</p>
        <DefaultTitle />
        <hr>

        <br>

        <hr>
        <p>CardsContainer with SlideCard</p>
        <CardsContainer>
          <SlideCard :details="objs" />
        </CardsContainer>
        <hr>
        <br>

        <hr class="mt-10">
        <p class="py-4">Search Bar</p>
        <SearchBar />
        <hr>

        <br>

        <hr class="mt-10">
        <p class="py-4">Search Results</p>
        <SearchResults />
        <hr>
    </main>
</template>