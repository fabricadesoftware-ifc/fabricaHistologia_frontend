<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true
    },
    stroke: {
        type:Boolean,
        required: true
    },
    color: {
        type: String,
        required: true
    },
})
</script>
<template>
    <button class="rounded-2xl w-48 h-14 font-poppins" :style="{background:props.background}" v-if="stroke == false">
        
        <p :style="{color:props.color}">{{ text }}</p>
    </button>
    <button class="rounded-2xl w-48 h-14 font-poppins" style="border: 2px solid;" :style="{background:'transparent'}, {'border-color': props.color}" v-else >
        <p :style="{color:props.color}">{{ text }}</p>
    </button>

</template>