<script setup>
import { NavLateralAdmin } from '@/components';
import { useNavBarAdminStore } from '@/stores/admin/navbar_admin';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const adminStore = useNavBarAdminStore();
const route = useRoute()


const props = defineProps({
 
    subtitle: {
        type: String,
        default: ''
    }
})

const getNameOfPath = computed(()=> route.name)

const divideRoute = () => {
    const father = route.matched[1].name
    const sons = (route.matched[1].children.filter(r => r.name == getNameOfPath.value))
   
    if (sons.length > 0 && route.name != '') {
        return [father, sons]
    } else {
        return [father]
    }
}


</script>

<template>
    <main class=" flex items-center w-dvw h-dvh justify-end bg-gray-100 relative ">
    
    <div class="top-0 left-0">
    <NavLateralAdmin  />
    </div>

    <div class=" shadow-md h-[98%] overflow-y-auto max-h-[98%] w-[81%] rounded-xl mr-3 bg-white relative flex-col ">
        <div class=" pt-5 pl-[5%] w-full h-[10%] ">
                <div class="flex gap-1">
                 <p v-if="divideRoute().length == 1" v-for="(routes, index) in divideRoute()" :class="`text-xl font-medium text-black`">{{ routes }}</p>

                 <div v-for="(routes, index) in divideRoute()" class="flex">
                <p v-if="divideRoute().length > 1 && index == 0"  :class="`text-xl font-medium text-black`">{{ routes }}</p>
                </div>
                
                <div class="flex" v-for="(routes, index) in divideRoute()[1]">
                <p v-if="divideRoute().length > 1" :class="`text-xl font-medium ${getNameOfPath == routes.name ? ' text-gray-500' : 'text-black'}`">{{ routes.name }}</p>
                </div>
                
                

                </div>
                <p class=" text-gray-600 w-80" v-if="props.subtitle.length > 0">{{ props.subtitle }}</p>
        </div>

        <slot >
            
        </slot>
    </div>
</main>
</template>