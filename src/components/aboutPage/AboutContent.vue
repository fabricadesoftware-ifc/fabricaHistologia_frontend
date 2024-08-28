<script setup>
import ContainerDefault from '@/components/ContainerDefault.vue';
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
    <ContainerDefault>
        <div class="flex flex-col ">
        <div class="my-4">
            <span class="text-2xl font-semibold leading-8 font-poppins ">{{ props.title }}</span>
        </div>
        <div>
            <p class="font-normal font-poppins leading-7 mb-7">{{ props.description }}</p>
        </div>
    </div>
    </ContainerDefault>
</template>