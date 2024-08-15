<script setup>
import vascularImage from '@/assets/media/vascular_3.png';

const props = defineProps({
    'icon': {
        type: String,
        default: vascularImage
    },
    'title': {
        type: String,
        default: 'Sistema'
    }
})
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg border w-48 h-56 flex flex-col justify-center content-between text-center duration-200 ease-out hover:bg-gray-200 hover:shadow-xl cursor-pointer mb-28">
        <img :src="props.icon" class="w-[75px] h-[75px] mx-auto mb-4" />
        <span class="text-base font-normal my-4">{{ props.title }}</span>
    </div>
</template>
