<script setup>
import { TitleGlobal } from '@/components';
</script>

<template>
    <form class="shadow-xl w-2/3 mx-auto bg-white p-14">
        <TitleGlobal content="Torne-se um Colaborador"/>
        <div class="relative p-0 pt-3">
            <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2">Nome</p>
            <input type="text" class="border-2 rounded-md w-full h-10" >
        </div>
    </form>
</template>