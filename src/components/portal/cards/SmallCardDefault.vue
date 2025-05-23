<script setup>
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
        <div :class="`bg-white rounded-xl shadow-lg border w-48 h-56 mb-4 flex flex-col justify-center content-between text-center duration-200 ease-out  ${props.count > 0 ? 'cursor-pointer hover:bg-gray-200 hover:shadow-xl' : ' brightness-[80%] cursor-default'}`">
            <img :src="props.item.image.url" class="w-[75px] h-[75px] mx-auto mb-4" />
            <span class="text-base font-normal my-4">{{ props.item.name }}</span>

            <p class="text-sm text-gray-500 font-medium">{{ props.count }} {{ props.count == 1 ? 'Análise' : 'Análises' }}</p>
        </div>
    </router-link>
</template>
