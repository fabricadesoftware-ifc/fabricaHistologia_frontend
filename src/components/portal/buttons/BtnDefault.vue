<script setup>

const props = defineProps({
    text: {
        type: String,
        default: "Button"
    },
    background: {
        type: String,
        default: "bg-[#267A7A]"
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
        <button :class="[`rounded-2xl h-14 font-poppins px-6 ${props.background} ease-in duration-100 hover:brightness-90 ${props.color}`, {'w-full': block}]">
            {{ props.text }}
        </button>
    </router-link>
</template>