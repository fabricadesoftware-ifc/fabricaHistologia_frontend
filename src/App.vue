<script setup>
import { RouterView } from 'vue-router'
import { useNavigationStore, useAuthStore } from './stores';
import { onMounted } from 'vue';
import { UserInformation } from './components';
import { useRoute } from 'vue-router';
const router = useRoute()
const authStore = useAuthStore()
const navigate = useNavigationStore()
// import { onMounted } from 'vue';
// import { useAuthStore } from '@/stores/auth/auth';
// import { PassageUser } from '@passageidentity/passage-elements/passage-user';

// const authStore = useAuthStore();

// const getUserInfo = async () => {
//   try {
//     const authToken = localStorage.getItem('psg_auth_token');
//     const passageUser = new PassageUser(authToken);
//     const user = await passageUser.userInfo(authToken);
//     if (user) {
//       await authStore.setToken(authToken);
//     } else {
//       authStore.unsetToken();
//     }
//   } catch (error) {
//     authStore.unsetToken();
//   }
// };

// onMounted(() => {
//   getUserInfo();
// });
onMounted(async()=> {
  await authStore.getUser()
  console.log(router.meta.activeUser)

})
</script>

<template>
  <UserInformation v-if="authStore.activeUser && router.meta.activeUser" :position="'absolute'"/>
  <RouterView />
</template>
