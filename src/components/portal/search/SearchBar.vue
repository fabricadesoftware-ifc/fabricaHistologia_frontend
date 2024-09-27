<script setup>
import ContainerGlobal from '@/components/layout/ContainerGlobal.vue'
import { ref } from 'vue';

const history = ref('Pulmão de Cachorro')
const name = ref('')
const emits = defineEmits([
    'search'
])
</script>

<template>
    <ContainerGlobal>
        <div class="w-3/4 mx-auto">
            <div class="bg-[#F1F1F1] w-full rounded-lg h-12 flex">
                <input type="text" v-model="name" @keyup="emits('search', name)" placeholder="pesquisar..." class="bg-transparent my-auto ml-10 sm:ml-5 outline-none w-5/6">
                <i class="mdi mdi-magnify text-black text-4xl m-auto" />
            </div>
            <div class="w-full flex justify-end mt-2 sm:mt-3">
                <span class="text-[#787878] text-end mr-2 text-sm sm:text-xs">Ultima Pesquisa:</span>
                <RouterLink to="#" class="text-[#787878] underline decoration-1 text-sm sm:text-xs hover:brightness-75">{{ history }}</RouterLink>
            </div>
        </div>
    </ContainerGlobal>
</template>