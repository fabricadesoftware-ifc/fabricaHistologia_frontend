<script setup>
import { useNavigationStore } from '@/stores/blog/navigation';
import { IconBack } from '@/components/index';

const navigationStore = useNavigationStore();
const props = defineProps({
    title: {
        type: String,
        default: 'Voltar'
    },
    setBackOff: {
        type: Boolean,
        default: false 
    }
})

const emits = defineEmits([
    'navigate'
])
</script>

<template>
    <span class="flex justify-between items-start w-auto text-base font-poppins absolute cursor-pointer box-back-btn" @click="setBackOff ? emits('navigate') :  navigationStore.navigateBack() ">
        <button class="bg-transparent border-transparent cursor-pointer" name="back-btn"> 
            <IconBack class="w-6 h-6" />
        </button>
        <label for="back-btn" class="font-medium cursor-pointer">{{ props.title }}</label>
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
