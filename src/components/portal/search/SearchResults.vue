<script setup>
import { ContainerGlobal } from '@/components/index';

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <ContainerGlobal>
        <div class="w-3/4 mx-auto flex flex-col my-4 font-poppins">
            <div v-if="props.data.length > 0" v-for="(result, index) in props.data" :key="index" class="w-full flex h-auto my-4 justify-between md:flex-col">
                <div class="flex flex-col my">
                    <a :href="result.field_name" target="_blank" class="text-xl sm:text-lg hover:text-zinc-600">{{ result.name }}</a>
                    <ul class="text-[#787878] list-disc ml-4 text-lg sm:text-base">
                        <li>{{ result.description }}</li>
                    </ul>
                </div>
                <RouterLink class="my-auto text-[#267A7A] text-base sm:text-base md:mt-3 hover:brightness-75">ver relacionados</RouterLink>
            </div>
            <div class="w-3/4 mx-auto flex flex-col my-4 font-poppins items-center" v-else>
                <p class="text-xl text-[#787878]">Este material não existe</p>
            </div>
        </div>
    </ContainerGlobal>
</template>