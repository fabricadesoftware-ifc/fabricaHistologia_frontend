<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePointStore } from '@/stores';

const router = useRoute();
const pointStore = usePointStore();
const id = router.params.id;

onMounted(async () => {
    await pointStore.getAllPointsByPosts(id)
})

</script>
<template>
    <div class="py-2" v-for="(area, index) in pointStore.pointsByPosts" :key="index">
        <label class="flex cursor-pointer select-none items-center gap-4 hover:brightness-95">
            <div class="relative">
                <input v-model="area.visible" type="checkbox" class="sr-only" @change="
    pointStore.visibleLabel(area);"  />
                <div class="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
                <div
                    :class="{ 'translate-x-full !bg-[#8181FF]': area.visible }"
                    class="dot absolute left-1 top-1 h-6 w-6 bg-white rounded-full transition-all"
                ></div>
            </div>
            <p class="font-normal text-lg max-w-[70%] text-left">
                {{ area.label_title }}
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