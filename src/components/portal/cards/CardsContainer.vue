<template>
    <section class="h-auto w-4/5 mx-auto" :class="[{'justify-center flex flex-wrap' :!props.noFlex}, {'grid gap-5 grid-cols-5': props.noFlex}]">
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
