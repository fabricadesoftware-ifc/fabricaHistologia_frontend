<script setup>
const props = defineProps({
    'title': {
        type: String,
        default: 'Title'
    },
    'description': {
        type: String,
        default: 'Content'
    }
})
</script>

<template>
    <div class="flex flex-col w-full p-0 m-0">
        <div class="my-4">
            <h1 class="text-2xl font-semibold leading-8 font-poppins">{{ props.title }}</h1>
        </div>
        <div> 
            <p class="font-normal font-poppins leading-7 mb-7">{{ props.description }}</p>
        </div>
    </div>
</template>