<script setup>
import { useSlideStore } from '@/stores';

const sliceStore = useSlideStore();
</script>
<template>
    <div v-for="(area, index) in sliceStore.labeledAreas" :key="index">
        <label class="flex cursor-pointer select-none items-center gap-4 pb-4 hover:brightness-95">
            <div class="relative">
                <input v-model="area.visible" type="checkbox" class="sr-only" @change="
    sliceStore.visibleLabel(area);"  />
                <div class="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
                <div
                    :class="{ 'translate-x-full !bg-[#8181FF]': area.visible }"
                    class="dot absolute left-1 top-1 h-6 w-6 bg-white rounded-full transition-all"
                ></div>
            </div>
            <p class="font-normal text-lg">
                {{ area.title }}
            </p>
        </label>
        <p class="text-left text-gray-400 pb-6 transition" v-show="area.visible">
            {{ area.description }}
        </p>
    </div>
</template>

<style scoped>
.transition {
    animation: fadeIn 0.5s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>