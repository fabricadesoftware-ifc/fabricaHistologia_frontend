<script setup>
import BookImage from '@/assets/images/icons/livros_1.png';

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
    <div class="w-1/3 h-56 px-4">
        <div class="bg-white rounded-xl shadow-lg border h-full flex flex-col justify-center content-between text-center duration-200 ease-out hover:bg-gray-100 hover:shadow-xl cursor-pointer">
            <img :src="props.icon" class="w-[75px] h-[75px] mx-auto mb-2" />
            <span class="text-base font-normal my-4">{{ props.title }}</span>
        </div>
    </div>
</template>
