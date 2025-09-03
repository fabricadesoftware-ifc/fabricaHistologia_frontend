<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    'item': {
        type: Object,
        required: true
    },
    context: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    }
})


</script>

<template>
    <router-link :to="props.count > 0 ? '/portal/' + context + '/' + props.item.id : ''">
        <div :class="`bg-white rounded-xl shadow-lg border w-48 h-56 mb-4 flex flex-col justify-center content-between text-center duration-200 ease-out ${props.count > 0 ? 'cursor-pointer hover:bg-gray-200 hover:shadow-xl' : ' brightness-[80%] cursor-default'}`">
            <div v-if="props.count != 'carregando'">
            <img :src="props.item.image.url" class="w-[75px] h-[75px] mx-auto mb-4" />
            
            <span class="text-base font-normal my-4">{{ props.item.name }}</span>

            <p class="text-sm text-gray-500 font-medium">{{ props.count }} {{ props.count == 1 ? 'Análise' : 'Análises' }}</p>
            </div>
            <div v-else class="loading w-full h-full duration-300">
            </div>
            </div>

    </router-link>
</template>


<style scoped>
.loading {
     background: linear-gradient(
    90deg,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #ffffff 80%
  );
    animation: load 1.2s infinite linear;
    background-size: 200% 100%;
    border-radius: 12px;
}

@keyframes load {
    from {
        background-position: 200% 0;
    }
    to {
        background-position: -200% 0;
    }
}
</style>
