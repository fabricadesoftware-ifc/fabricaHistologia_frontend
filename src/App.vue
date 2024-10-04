<script setup>
import { RouterView } from 'vue-router'
import { useNavigationStore } from './stores/blog/navigation';
import { onMounted } from 'vue';

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
onMounted(()=> {
  console.log(navigate.state.history)
})
</script>

<template>
  <RouterView />
</template>
