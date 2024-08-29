<script setup>
import { RouterView } from 'vue-router'
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
</script>

<template>
  <RouterView />
</template>
