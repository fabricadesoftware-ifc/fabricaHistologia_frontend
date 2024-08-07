<script setup>
const props = defineProps({
    title: {
        type: String
    },
    hasArrowIcon: {
        type: Boolean,
        default: true
    }
})
</script>
<template>
    <button class="flex items-center gap-5 rounded-md text-lg font-normal text-white font-poppins tracking-wide leading-4 btn-access">{{props.title}} <a href="#" v-if="props.hasArrowIcon">-></a></button>

</template>
