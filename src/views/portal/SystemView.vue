<script setup>
import { 
    HeaderPortal,
    CardsGlobal,
    ContainerGlobal,
    AddInfoGlobal,
    BtnDefault,
    FooterComp
} from '@/components';


const SystemsTest = [
    {
        id: '1',
        name: 'Sistema 1',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/1'
    },
    {
        id: '2',
        name: 'Sistema 2',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/2'
    },
    {
        id: '3',
        name: 'Sistema 3',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/3'
    },
    {
        id: '4',
        name: 'Sistema 4',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/4'
    },
    {
        id: '5',
        name: 'Sistema 5',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/5'
    },
    {
        id: '6',
        name: 'Sistema 6',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/6'
    },
    {
        id: '7',
        name: 'Sistema 7',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/7'
    },
    {
        id: '8',
        name: 'Sistema 8',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/8'
    },
    {
        id: '9',
        name: 'Sistema 9',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/9'
    },
    {
        id: '10',
        name: 'Sistema 10',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/10'
    },
    {
        id: '11',
        name: 'Sistema 11',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/11'
    },
    {
        id: '12',
        name: 'Sistema 12',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/system/12'
    },
]
</script>

<template>
    <HeaderPortal class="mt-10" title="Sistema Digestivo" size="text-3xl md:text-center" />
    <CardsGlobal :datas="SystemsTest"/>
    <ContainerGlobal class="mt-16 ">
        <AddInfoGlobal :datas="{}" />
        <div class="flex justify-end flex-row flex-wrap lg:justify-center gap-10 mt-10 mb-16">
            <BtnDefault background="bg-[#267A7A]" text="Acessar Aulas" />
            <BtnDefault background="bg-[#4B4BEB]" text="Acessar Conteúdos" />
            <BtnDefault background="bg-[#D94E4E]" text="Acessar Quiz" />
        </div>
    </ContainerGlobal>
    <FooterComp />
</template>