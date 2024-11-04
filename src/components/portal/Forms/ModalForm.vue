<script setup>
import { TitleGlobal } from '@/components'
</script>

<template>
    <div class="bg-black/50 w-screen h-screen fixed top-0 flex justify-center items-center">
        <div class="w-5/12 h-44 bg-[#D9D9D9] rounded-xl relative flex flex-col items-center p-5 text-center lg:h-56 md2:w-6/12 md:w-8/12 md:h-40 sm:h-52">
            <TitleGlobal content="Dados enviados com sucesso!" color="text-[#33962A]" size="text-xl md:text-base "/>
            <p class="font-semibold mt-6 md:text-sm">Será enviado um email com seus dados para os colaboradores, aguarde até ser confirmado.</p>
            <div class="w-full h-2 left-0 bottom-0 absolute bg-green-600 rounded-b-lg loading"></div>
        </div>
    </div>
</template>

<style scoped>
.loading{
    animation: timeout 5s ease-in-out 1;
}

@keyframes timeout {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}
</style>