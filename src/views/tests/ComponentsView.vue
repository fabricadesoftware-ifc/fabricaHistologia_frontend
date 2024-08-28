<script setup>
import { ref } from 'vue';
import {
  AddInfoGlobal,
  BackButton,
  BoxButton,
  BtnDefault,
  BtnStroke,
  CardsContainer,
  ContainerGlobal,
  DefaultTitle,
  InitialSearchButton,
  MediumCardDefault,
  NavbarHome,
  SearchBar,
  SearchButtonGlobal,
  SearchResults,
  SlideCard,
  SmallCardDefault,
  TitleGlobal,
  TitleHome,
  TopicsAdditionalInfo
} from '@/components/index'

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
        <InitialSearchButton />
        <MediumCardDefault />
        <NavbarHome />
        <SearchBar />
        <SearchButtonGlobal />
        <SearchResults />
        <SlideCard />
        <SmallCardDefault />
        <TitleGlobal />
        <TitleHome />
        <TopicsAdditionalInfo />
    </main>
</template>
