<script setup>
import router, {toBackPage} from '@/router';

const props = defineProps({
    tittle: {
        type: String,
        required: true
    }
})

</script>
<template>
    <span class="flex justify-between items-center w-auto text-base font-poppins absolute mt-12 ml-40 cursor-pointer box-back-btn" @click="toBackPage()">
        <button class="bg-transparent border-transparent cursor-pointer" name="back-btn"> <img src="../assets/media/right-arrow.svg" class="w-4 h-4"></button>
        <label for="back-btn" class="font-medium cursor-pointer">{{ props.tittle }}</label>
    </span>
</template>

<style scoped>
.box-back-btn {
    transition: 0.2s ease-in-out;
    z-index: 30;
    gap: 5px;
    &:hover  {
        gap: 10px;
    }
}
</style>
