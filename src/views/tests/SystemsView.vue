<script setup>
import { onMounted } from 'vue';
import { useSystemStore } from '@/stores/blog/system';

const systemStore = useSystemStore();
onMounted(()=>{
systemStore.getSystem()
})
</script>
<template>
    <p>systems</p>
    <p> systems: {{ systemStore.state.systems }}</p>
</template>
