<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, useCollaboratorsStore } from '@/stores';
const authStore = useAuthStore()
const collabStore = useCollaboratorsStore()
const router = useRouter()
const props = defineProps({
    position: {
        type: String,
        default: 'relative'
    },
    position_directions: {
        type: String,
        default: 'right-0 md2:mr-0 sm:mr-[-20px]'
    }
})
const userName = ref(null)
onMounted(()=>{
    userName.value = localStorage.getItem('psg_last_login')
})

const reduceEmail = (email) => {
    if (email){
    const index = email.indexOf('@')
    const reducedEmail = email.slice(0, index)
    return reducedEmail
}
}

</script>
<template>
    <div :class='` w-auto max-w-[320px] over z-40 ${props.position} ${props.position_directions} cursor-pointer flex flex-col items-center rounded-md justify-between container-information gap-1`'>
        <p class="text-black px-3 block md:hidden">{{ userName }}</p>
        <p class="text-black px-3 hidden md:block">{{ reduceEmail(userName) }}</p>
        <div v-if="authStore.userInfo.is_verified" class="logout-pop min-h-10 flex justify-center items-center hover:bg-[#e6e6e6] w-full duration-300 ">
            <button @click="router.push('/admin')" class=" py-1 px-4 text-black font-medium w-full rounded-b-md flex justify-center text-sm gap-3 items-center">
                <img class="size-[25px]"src="@/assets/images/icons/admin-svgrepo-com.svg" />
                Painel Administrativo</button>
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
    height: 30px;
    & .logout-pop {
        height: 0px;
        opacity: 0;
        transition: .5s;
        visibility: hidden;
        & button {
            height: 0px;
            transition: .5s;
        }
    }
    
    &:hover {
        background-color: rgb(238, 238, 238);
        align-items: center;
        height: auto;
        & .logout-pop {
            height: 30px;
            visibility: visible;
            opacity: 1;
            visibility: visible;
        & button {
            height: 35px;
        }
        }

       
    }
 
}
</style>