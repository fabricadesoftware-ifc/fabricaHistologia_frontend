<script setup>
import { computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: "Button"
    },
    background: {
        type: String,
        default: "bg-primary"
    },
    color: {
        type: String,
        default: "text-white"
    },
    link: {
        type: String,
        default: '/'
    },
    block: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <router-link :to="props.link">
        <button :class="[`rounded-2xl h-14 font-poppins px-16 ${props.background} ${props.color}`, {'w-full': block}]">
            {{ props.text }}
        </button>
    </router-link>
</template>