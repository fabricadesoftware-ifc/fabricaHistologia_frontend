<script setup>
import { TitleGlobal, BtnDefault } from '@/components';

const fields = [
    'Nome',
    'Registro',
    'Telefone',
    'Universidade',
    ]
</script>

<template>
    <form class="shadow-xl w-3/5 mx-auto bg-white px-20 py-8 flex flex-col items-center border mt-14 rounded-lg lg:w-5/6 sm:w-full md:px-10">
        <TitleGlobal class="mb-10 text-center" content="Torne-se um Colaborador!" size="text-3xl xl:text-2xl sm:text-xl"/>
        <div v-for="(field, id) in fields" :key="id" class="relative p-0 pt-3 mt-5 w-full">
            <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">{{ field }}</p>
            <input type="text" class="border-2 rounded-md w-full h-10" >
        </div>
        <div class="relative p-0 pt-3 mt-5 w-full">
            <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">Nascimento</p>
            <input type="date" class="border-2 rounded-md w-full h-10" >
        </div>
        <div class="relative p-0 pt-3 mt-5 w-full">
            <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">Escolaridade</p>
            <select class="border-2 rounded-md w-full h-10 bg-white cursor-pointer appearance-none" >

            </select >
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center mt-3 px-2 text-gray-700">
                <svg class="fill-current h-7 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
        </div>
        <div class="mt-14 w-3/5" >
            <BtnDefault text="Enviar" color="text-white " :block="true"/>
        </div>
    </form>
</template>