<script setup>

const props = defineProps({
    'item': {
        type: Object,
        required: true
    },
})
</script>

<template>
    <div class="w-1/3 h-56 px-4">
        <router-link :to="props.item.link">
            <div class="bg-white rounded-xl shadow-lg border h-full flex flex-col justify-center content-between text-center duration-200 ease-out hover:bg-gray-100 hover:shadow-xl cursor-pointer">
                <img :src="props.item.icon" class="w-[75px] h-[75px] mx-auto mb-2" />
                <span class="text-base font-normal my-4">{{ props.item.name }}</span>
            </div>
        </router-link>
    </div>
</template>
