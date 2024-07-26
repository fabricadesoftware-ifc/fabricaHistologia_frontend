<script setup>
import { onMounted, reactive } from 'vue';
import { useSystemStore } from '@/stores/blog/system';

const systemStore = useSystemStore();
onMounted(()=>{
systemStore.getSystem()

})

const system = reactive({
    name: '',
    description: '',
    image_system: null
})

const putsystem = reactive({
    id: '',
    name: '',
    description: '',
    image_system: null
})

</script>
<template>
    <div>
    <h2>GET</h2>
    <p>systems</p>
    <div>
        <p>{{ systemStore.state.systems }}</p>
    </div>
    </div>

    <div>
        <h2>POST, PUT, DELETE</h2>
        
            <div>
            <label for="post">POST</label>
            <input type="text" name="post" placeholder="name" v-model="system.name">
            <input type="text" name="post" placeholder="description" v-model="system.description">
            <button @click="systemStore.createSystem(system)">Post</button>
            </div>

            <div>
            <label for="put">PUT</label>
            <input type="text" name="put" placeholder="id" v-model="putsystem.id">
            <input type="text" name="put" placeholder="name" v-model="putsystem.name">
            <input type="text" name="put" placeholder="description" v-model="putsystem.description">
            <button @click="systemStore.updateSystem(putsystem)">Put</button>
            </div>

            <div>
            <label for="delete">DELETE</label>
            <input type="text" name="delete" placeholder="id" v-model="system.id">
            <button for="delete" @click="systemStore.deleteSystem(system.id)">Delete</button>
            </div>
        
    </div>
</template>
<style scoped>
div{
    margin-top: 20px;
}
</style>
