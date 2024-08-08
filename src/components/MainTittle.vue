<script setup>
const props = defineProps({
    'color': {
        type: String,
        default: '#181A2A'
    },
    'weight': {
        type: String,
        default: 'bold'
    },
    'content': {
        type: String,
        default: 'Tittle'
    },
    'size': {
        type: String,
        default: '4xl'
    },
    'boxSize': {
        type: String,
        default: '1/2'
    }
})
</script>

<template>
    <div :class="`w-${props.boxSize} flex justify-center flex-wrap flex-row`">
        <span :class="`font-${props.weight} text-[${props.color}] font-poppins text-${props.size}`">{{ props.content }}</span>
    </div>
</template>