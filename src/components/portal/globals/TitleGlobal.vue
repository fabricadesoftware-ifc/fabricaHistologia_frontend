<script setup>
const props = defineProps({
    'color': {
        type: String,
        default: 'text-[#181A2A]'
    },
    'weight': {
        type: String,
        default: 'font-semibold'
    },
    'content': {
        type: String,
        default: 'Selecione'
    },
    'size': {
        type: String,
        default: 'text-4xl'
    },
    'position': {
        type: String,
        default: 'justify-start'
    }
})
</script>

<template>
    <div :class="`${props.position} flex  flex-wrap flex-row`">
        <span :class="`${props.weight} ${props.color} font-poppins ${props.size}`">{{ props.content }}</span>
    </div>
</template>