<script setup>
const props = defineProps({
    justify: {
        type: String,
        default: 'justify'
    },
    gap: {
        type: String,
        default: '10'
    },
})
</script>

<template>
    <section :class="`h-auto w-4/5 mx-auto flex flex-wrap ${props.justify} ${props.gap} sm:justify-center`">
        <slot></slot>
    </section>
</template>
