<script setup>
import {useAuthStore} from '@/stores'
import { ContainerGlobal, BackButton, TitleGlobal } from '@/components/index';
import { UserInformation } from '@/components';

import { useRoute } from 'vue-router';

const router = useRoute()
const authStore = useAuthStore()


const props = defineProps({
    title: {
        type: String,
        required: false,
        default: 'Sem título',
    },
    size: {
        type: String,
        required: false,
        default: 'text-4xl'
    }
})

</script>

<template>
    <ContainerGlobal class="pt-8 pb-12 relative flex justify-between md:hidden">
        
        <div class="relative w-20">
        <BackButton position="absolute" />
        </div>
        <TitleGlobal :content="props.title" :size="props.size" position="justify-center" class="xl:mt-16" />
    
        <div class="relative  w-20">
        <UserInformation  position="absolute" position_directions=" right-0" v-if="authStore.activeUser" />
        </div>
    </ContainerGlobal>

     <ContainerGlobal class="pt-8 pb-12 relative hidden justify-between md:flex">
        
        <div class="relative w-full flex flex-col gap-5">

            <div class="w-full flex justify-between">
                 <BackButton class="w-20" position="relative" />

                  <div class="relative  w-20">
        <UserInformation  position="absolute" position_directions=" right-0" v-if="authStore.activeUser" />
        </div>
            </div>

            <div class="w-full flex justify-center">
        <TitleGlobal :content="props.title" :size="props.size" position="justify-center" class="xl:mt-16" />

            </div>
        </div>

    
       
    </ContainerGlobal>
</template>
