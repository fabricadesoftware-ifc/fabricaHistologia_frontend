<script setup>
import { HeaderPortal, CardsGlobal, ContainerGlobal, AddInfoGlobal, BtnDefault, Footer  } from '@/components';

const OrgansTest = [
    {
        id: '1',
        name: 'Orgão 1',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/1'
    },
    {
        id: '2',
        name: 'Orgão 2',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/2'
    },
    {
        id: '3',
        name: 'Orgão 3',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/3'
    },
    {
        id: '4',
        name: 'Orgão 4',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/4'
    },
    {
        id: '5',
        name: 'Orgão 5',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/5'
    },
    {
        id: '6',
        name: 'Orgão 6',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/6'
    },
    {
        id: '7',
        name: 'Orgão 7',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/7'
    },
    {
        id: '8',
        name: 'Orgão 8',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/8'
    },
    {
        id: '9',
        name: 'Orgão 9',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/9'
    },
    {
        id: '10',
        name: 'Orgão 10',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/10'
    },
    {
        id: '11',
        name: 'Orgão 11',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/11'
    },
    {
        id: '12',
        name: 'Orgão 12',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        link: '/portal/organ/12'
    },
]
</script>

<template>
    <HeaderPortal class="mt-10" title="Sistema Digestivo" size="text-3xl md:text-center" />
    <CardsGlobal :datas="OrgansTest" />
    <ContainerGlobal class="mt-16 ">
        <AddInfoGlobal />
        <div class="my-10">
            <BtnDefault text="Acessar Quiz deste Sistema" background="bg-[#267A7A]" block />
        </div>
    </ContainerGlobal>
    <Footer />
</template>