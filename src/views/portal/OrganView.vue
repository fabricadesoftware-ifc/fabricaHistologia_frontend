<script setup>
import  {ContainerGlobal, CardsContainer, SlideCard, AddInfoGlobal, BtnDefault, FooterComp, HeaderPortal} from '@/components/index';

const data = [

        {title: 'Aulas', refs: [
            {link: 'link 1 Nome da aula', desc: 'breve descrição'},
            {link: 'link 2 Nome da aula', desc: 'breve descrição'}
        ]},
        {title: 'PDFS', refs: [
            {link: 'link 1 Nome do mapa mental/documento', desc: 'breve descrição'},
            {link: 'link 2 Nome do mapa mental/documento', desc: 'breve descrição'}
        ]}

]

const objs = [
    {name: 'Nome da lâmina', date: ['10', 'agosto', '2028'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]},

    {name: 'Pulmão', date: ['10', 'junho', '2024'], tags: [{color: 'text-white', background: 'bg-purple-700', content: '2x'}, {color: 'text-white', background: 'bg-green-600', content: 'Boi'}, {color: 'text-black', background: 'bg-gray-400', content: 'tag'} ]}
]
</script>
<template>
<main class="w-dvh">
    <ContainerGlobal class="flex justify-center flex-col">
        <HeaderPortal :title="'Estômago'" />
        <CardsContainer class=" mt-3">
            <SlideCard :details="objs" />
        </CardsContainer>

        <AddInfoGlobal :title="'Materiais de Apoio'" :description="'Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materias adicionais'" :data="data"/>

        <BtnDefault :text="'Acessar Quiz deste Órgão'" :block="true" class=" mt-12"/>
    </ContainerGlobal>
    <FooterComp class=" mt-12" />
</main>
</template>