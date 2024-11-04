<script setup>
import { useAuthStore, useCollaboratorsStore } from '@/stores';
const authStore = useAuthStore()
const collabStore = useCollaboratorsStore()

const props = defineProps({
    position: {
        type: String,
        default: 'relative'
    }
})
</script>
<template>
    <div :class='`w-[240px] z-40 ${props.position} right-0 my-4 mr-8 cursor-pointer flex flex-col items-center gap-4 rounded-md justify-between container-information`'>
        <p class="text-black">{{ authStore.email }}</p>
        <div class="w-full logout-pop">
            <button @click="authStore.logout" class="bg-[#D94E4E] py-1 px-4 text-white w-full rounded-b-md flex justify-center gap-3 items-center">
                <img class="size-[25px]"src="@/assets/images/icons/logout.svg" />
                LOGOUT</button>
        </div>
    </div>
</template>

<style scoped>
.container-information{
    padding-top: 4px;
    transition: .5s;
    & .logout-pop {
        height: 0px;
        opacity: 0;
        transition: .5s;

        & button {
            height: 0px;
            transition: .5s;
        }
    }
    
    &:hover {
        background-color: rgb(238, 238, 238);
        align-items: center;
        & .logout-pop {
            height: 30px;
            visibility: visible;
            opacity: 1;
        & button {
            height: 35px;
        }
        }

       
    }
 
}
</style>