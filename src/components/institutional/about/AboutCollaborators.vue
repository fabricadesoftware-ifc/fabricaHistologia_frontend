<script setup>
import ContainerDefault from '@/components/layout/ContainerDefault.vue'

const props = defineProps({
    'position': {
        type: String,
        default: 'position',
    },
    'collaborators': {
        type: Array,
        default: ['collaborator 1', 'collaborator 2']
    }
})
</script>

<template>
    <ContainerDefault>
        <div class="flex flex-col">
            <div class="mt-4">
                <span class="text-base font-semibold leading-8 font-poppins">{{ props.position }}</span>
            </div>
            <div>
                <p class="font-normal font-poppins leading-7" v-for="(collaborator, index) in props.collaborators" :key="index">{{ collaborator }}</p>
            </div>
        </div>
    </ContainerDefault>
</template>