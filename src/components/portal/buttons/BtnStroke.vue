<script setup>
import { computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: "Button"
    },
    color: {
        type: String,
        default: "text-primary"
    },
    border: {
        type: String,
        default: "border-primary"
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
        <button :class="[`rounded-2xl h-14 border-2 font-poppins px-16 bg-transparent hover:bg-black hover:text-white ease-in duration-100 ${props.border} ${props.color}`, {'w-full': block}]">
            {{ props.text }}
        </button>
    </router-link>
</template>