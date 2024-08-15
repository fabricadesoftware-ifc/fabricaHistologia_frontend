<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '../stores/auth/auth';
import TitleInitialPage from '@/components/TitleInitialPage.vue'
import BoxButton from '@/components/BoxButton.vue'
import InitialSearchButton from '@/components/InitialSearchButton.vue'

const authStore = useAuthStore();

const getUserInfo = async () => {
  try {
    const authToken = localStorage.getItem('psg_auth_token');
    const passageUser = new PassageUser(authToken);
    const user = await passageUser.userInfo(authToken);
    if (user) {
      await authStore.setToken(authToken);
    } else {
      authStore.unsetToken();
    }
  } catch (error) {
    authStore.unsetToken();
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
    <main class="w-dvw h-dvh bg-cover bg-top flex justify-center items-center sm:flex-col sm:justify-normal bg-main-image">
      <BoxButton class="right-5 top-10 sm:relative sm:right-0 sm:top-16 z-10" />
      <TitleInitialPage  class="z-10 absolute top-64" />
      <div class="flex w-60 h-16 md:w-48 md:h-14 absolute m-10 left-0 bottom-0 sm:m-6">
        <img src="../assets/media/ifcLogo.png" class="w-12/12 h-12/12">
      </div>
      <InitialSearchButton class="absolute bottom-0 right-0 mb-10 mr-10 z-10" />
      <div class="absolute w-dvw h-dvh z-0 overlay"></div> 
    </main>
</template>

<style scoped>
.bg-main-image {
  background-image: url('@/assets/media/intialBgImage.png');
  z-index: 10;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
