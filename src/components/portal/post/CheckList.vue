<script setup>
import { ref } from 'vue';
const isCe = ref(true)

const datas = ref([
    {
        title: 'Desenho na imagem',
        description: 'Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materiais adicionais',
        checked: false
    },
    {
        title: 'Desenho na imagem',
        description: 'Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materiais adicionais',
        checked: false
    },
    {
        title: 'Desenho na imagem',
        description: 'Que tal estudar com um quiz interativo ou talvez com um mapa menta. Clique no botão e aproveite nossos materiais adicionais',
        checked: true
    },
])
</script>
<template>
    <div v-for="check in datas" :key="check">
        <label class="flex cursor-pointer select-none items-center gap-4 pb-4">
            <div class="relative">
                <input v-model="check.checked" type="checkbox" class="sr-only" />
                <div class="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
                <div
                    :class="{ 'translate-x-full !bg-[#8181FF]': check.checked }"
                    class="dot absolute left-1 top-1 h-6 w-6 bg-white rounded-full transition"
                ></div>
            </div>
            <p class="font-normal text-lg">
                {{ check.title }}
            </p>
        </label>
        <p class="text-left text-gray-400 pb-6" v-if="check.checked">
            {{ check.description }}
        </p>
    </div>
</template>