<script setup>
import { useCollaboratorsStore, useAuthStore } from '@/stores';
import { TitleGlobal, BtnDefault } from '@/components';
import { useRouter } from 'vue-router';
import { reactive, computed, onMounted } from 'vue';

const router = useRouter()

const collaboratorStore = useCollaboratorsStore()
const authStore = useAuthStore()

const PersonaDataGeneric = reactive({
    'name': '',
    'registration': '',
    'phone': null,
    'university': '',
});

const PersonaDataSpecific = reactive({
    'birth_date': null,
    'education': '',
})

const education = reactive({
    'Médio': 'Médio',
    'Superior': 'Superior',
    'Pós Graduação': 'Pos-Graduação',
    'Mestrado': 'Mestrado',
    'Doutorado': 'Doutorado',
    'Pós doutorado': 'Pos-Doutorado' 
})

const newCollaborator = computed(() => {
    return {...PersonaDataSpecific, ...PersonaDataGeneric}
})

onMounted(() => {
    authStore.getUser()
})

function saveCollaborator(data) {
    collaboratorStore.postCollaborators(data)
    setTimeout(() => {
        router.push({ name: 'home' }); 
    }, 5000)
}
</script>

<template>
    <form  class="shadow-xl w-3/5 mx-auto bg-white px-20 py-8 flex flex-col items-center border mt-14 rounded-lg lg:w-5/6 sm:w-full md:px-10">
        <TitleGlobal class="mb-10 text-center" content="Torne-se um Colaborador!" size="text-3xl xl:text-2xl sm:text-xl"/>
        <div v-for="(field, id) in PersonaDataGeneric" :key="id" class="relative p-0 pt-3 mt-5 w-full">
            <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">{{ id }}</p>
            <input type="text" class="border-2 rounded-md w-full h-10 pl-3" v-model="PersonaDataGeneric[id]" >
        </div>
        <div class="relative p-0 pt-3 mt-5 w-full">
            <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">birthday</p>
            <input type="date" class="border-2 rounded-md w-full h-10 pl-3" v-model="PersonaDataSpecific.birth_date" >
        </div>
        <div class="relative p-0 pt-3 mt-5 w-full">
            <p class="absolute top-0 bg-white text-sm font-poppins font-semibold ml-8 px-2 lg:text-xs md:ml-4">graduation</p>
            <select class="border-2 rounded-md w-full h-10 bg-white cursor-pointer appearance-none pl-3" v-model="PersonaDataSpecific.education">
                <option v-for="(field, key) in education" :key="key" :value="field">{{ key }}</option>
            </select >
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center mt-3 px-2 text-gray-700">
                <svg class="fill-current h-7 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
        </div>
        <div class="mt-14 w-3/5" @click="saveCollaborator(newCollaborator)" >
            <BtnDefault text="Enviar"  link="#" color="text-white" :block="true"/>
        </div>
    </form>
</template>