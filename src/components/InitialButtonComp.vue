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
    <button class="flex items-center gap-5 rounded-md text-lg font-medium text-white font-poppins tracking-wide leading-4 btn-access">{{props.title}} <a href="#" class="w-9 h-9 xl:hidden" v-if="props.hasArrowIcon"><img src="../assets/media/arrowRight.svg" class="w-full h-full xl:hidden"></a> <a href="#" class="hidden xl:block w-12 h-9" v-if="props.hasArrowIcon"><img src="../assets/media/arrowDown.svg" class="w-full h-full"></a></button>

</template>
