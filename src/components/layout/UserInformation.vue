<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore, useCollaboratorsStore } from '@/stores';
const authStore = useAuthStore()
const collabStore = useCollaboratorsStore()
const router = useRouter()
const props = defineProps({
    position: {
        type: String,
        default: 'relative'
    }
})
</script>
<template>
    <div :class='`min-w-[240px] max-w-[420px] over z-40 ${props.position} right-0 my-3 mr-8 cursor-pointer flex flex-col items-center rounded-md justify-between container-information gap-1`'>
        <p class="text-black px-3">{{ authStore.email }}</p>
        <div v-if="authStore.userInfo.is_verified" class="logout-pop min-h-10 flex justify-center items-center hover:bg-[#e6e6e6] w-full duration-300 ">
            <button @click="router.push('/portal/points')" class=" py-1 px-4 text-black font-medium w-full rounded-b-md flex justify-center gap-3 items-center">
                <img class="size-[25px]"src="@/assets/images/icons/point.svg" />
                Pontos</button>
        </div>
        <div class="w-full logout-pop hover:brightness-[85%]">
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