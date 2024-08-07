<script setup>
const props = defineProps({
    isGreen: {
        type: Boolean,
        default: true,
    },
    margin: {
        type: String
    }
})
</script>
<template>
    <div class="flex w-60 h-16 absolute" :style="{margin: props.margin}">
        <img src="../assets/media/ifcLogoGreen.png" class="w-12/12 h-12/12" v-if="props.isGreen">
        <img src="../assets/media/ifcLogo.png" class="w-12/12 h-12/12" v-else>
    </div>
</template>