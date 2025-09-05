<script setup>
import { computed, ref } from 'vue'
import { useSupportingStore } from '@/stores';
import { ContainerGlobal } from '@/components/index';

const emits = defineEmits([
    'filter', 'cleanFilter'
])
const filterBySystem = ref(null)
const returnFilterBySystem = computed(() => filterBySystem.value)

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

// Array para controlar se cada descrição está expandida
const expandedItems = ref([])

// Inicializa o estado de cada item
expandedItems.value = props.data.map(() => false)

// Função para alternar "ver mais / ver menos"
const toggleExpand = (index) => {
    expandedItems.value[index] = !expandedItems.value[index]
}
</script>

<template>
    <ContainerGlobal>
        <div class="w-3/4 mx-auto flex flex-col my-4 font-poppins">
            <div v-if="returnFilterBySystem != null" class="flex justify-center mb-3">
                <button @click="filterBySystem = null, emits('cleanFilter')" class="bg-gray-300 p-2 rounded-md flex gap-3 items-center hover:brightness-[80%] duration-300 bounce-appear">
                    Limpar Filtros 
                    <img class="w-4 h-4" src="@/assets/images/icons/close.svg" alt="close button">
                </button>
            </div>

            <div v-if="props.data.length > 0" v-for="(result, index) in props.data" :key="index" class="w-full flex h-auto my-4 justify-between md:flex-col">
                <div class="flex flex-col my">
                    <a :href="result.field_name" target="_blank" class="text-xl sm:text-lg hover:text-zinc-600">{{ result.name }}</a>

                    <!-- Descrição com ver mais/menos -->
                    <p class="text-[#787878] text-lg sm:text-base max-w-[80%]">
                        <span v-if="!expandedItems[index]">
                            {{ result.description.length > 100 ? result.description.slice(0, 100) + '...' : result.description }}
                        </span>
                        <span v-else>
                            {{ result.description }}
                        </span>
                        <span v-if="result.description.length > 100" class="text-[#267A7A] cursor-pointer ml-1" @click="toggleExpand(index)">
                            {{ expandedItems[index] ? 'ver menos' : 'ver mais' }}
                        </span>
                    </p>
                </div>

                <span @click="filterBySystem = result.system, emits('filter', filterBySystem)" class="my-auto text-[#267A7A] text-base sm:text-base md:mt-3 break-keep whitespace-nowrap hover:brightness-75 cursor-pointer">
                    ver relacionados
                </span>
            </div>

            <div class="w-3/4 sm:text-center sm:w-4/4 mx-auto flex flex-col my-4 font-poppins items-center" v-else>
                <p class="text-xl text-[#787878]">Este material não existe</p>
            </div>
        </div>
    </ContainerGlobal>
</template>

<style scoped>
.bounce-appear {
    animation: bounce 0.1s ease-in-out 1;
}

@keyframes bounce {
    from { 
        opacity: 0.5;
        transform: translateY(-3px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
}
</style>
