<script setup>
const props = defineProps({
    'color': {
        type: String,
        default: 'text-[#181A2A]'
    },
    'weight': {
        type: String,
        default: 'font-bold'
    },
    'content': {
        type: String,
        default: 'Selecione'
    },
    'size': {
        type: String,
        default: 'text-4xl'
    },
    'boxSize': {
        type: String,
        default: 'w-1/2'
    }
})
</script>

<template>
    <div :class="`${props.boxSize} flex justify-center flex-wrap flex-row`">
        <span :class="`${props.weight} ${props.color} font-poppins ${props.size}`">{{ props.content }}</span>
    </div>
</template>