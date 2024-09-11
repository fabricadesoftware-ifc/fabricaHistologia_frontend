<template>
    <section class="sm:w-3/5 h-auto w-full mx-auto" :class="[{'2md:justify-center flex flex-wrap justify-start' :!props.noFlex}, {'grid gap-5 grid-cols-5': props.noFlex}]">
        <slot></slot>
    </section>
</template>

<script setup>
const props = defineProps({
    'noFlex': {
        type: Boolean,
        default: false
    }
})
</script>
