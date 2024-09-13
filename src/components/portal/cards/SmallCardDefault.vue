<script setup>
const props = defineProps({
    'item': {
        type: Object,
        required: true
    },
})
</script>

<template>
    <router-link :to="props.item.link">
        <div class="bg-white rounded-xl shadow-lg border w-48 h-56 mb-4 flex flex-col justify-center content-between text-center duration-200 ease-out hover:bg-gray-200 hover:shadow-xl cursor-pointer">
            <img :src="props.item.image.url" class="w-[75px] h-[75px] mx-auto mb-4" />
            <span class="text-base font-normal my-4">{{ props.item.name }}</span>
        </div>
    </router-link>
</template>
