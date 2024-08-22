<script setup>
import { ref } from 'vue';

import ContainerDefault from '@/components/ContainerDefault.vue';
import AdditionalInfo from '@/components/AdditionalInfo.vue';
import BackButton from '../../components/BackButton.vue';
import DefaultTitle from '@/components/DefaultTitle.vue';
import CardsContainer from '@/components/CardsContainer.vue';
import SlideCard from '@/components/SlideCard.vue';
import FooterComp from '@/components/FooterComp.vue'

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

const objs = ref([
    {name: 'Nome da lâmina', date: ['10', 'agosto', '2028'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]}
])
</script>

<template>
    <main>
        <h1>Biblioteca de Componentes</h1>
        <div class="my-10">
          <AddInfoGlobal title="TITULO" description="lorem ispsum" :data="datas_AdditionalInfo" buttons />
        </div>
        <BackButton />
        <BoxButton />
        <BtnDefault />
        <BtnStroke />
        <CardsContainer />
        <ContainerGlobal />
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
        <hr>
        <p>Footer</p>
        <FooterComp />
        <hr>

    </main>
</template>
