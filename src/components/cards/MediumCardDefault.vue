<script setup>
import BookImage from '@/assets/media/livros_1.png';

const props = defineProps({
    'icon': {
        type: String,
        default: BookImage
    },
    'title': {
        type: String,
        default: 'Sistema'
    }
})
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg border md:w-48 w-80 h-56 flex flex-col justify-center content-between text-center duration-200 ease-out hover:bg-gray-200 hover:shadow-xl cursor-pointer">
        <img :src="props.icon" class="w-[75px] h-[75px] mx-auto mb-4" />
        <span class="text-base font-normal my-4">{{ props.title }}</span>
    </div>
</template>
