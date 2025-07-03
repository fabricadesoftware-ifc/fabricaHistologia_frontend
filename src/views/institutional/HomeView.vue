<script setup>
import {
  TitleHome,
  NavbarHome,
  NavLateralAdmin,
} from '@/components/index'
</script>

<template>
  <NavLateralAdmin></NavLateralAdmin>
    <main class="w-dvw h-dvh relative bg-cover bg-top flex justify-center items-center sm:flex-col sm:justify-normal bg-main-image">
      <div class="absolute w-dvw h-dvh z-0 overlay"></div> 
      <NavbarHome />
      <div class="flex w-60 h-16 md:w-48 md:h-14 absolute m-10 left-0 bottom-0 sm:m-6">
        <img src="@/assets/images/icons/ifcLogo.png" class="w-12/12 h-12/12">
      </div>
      <TitleHome  class="z-10 absolute top-52" />
    </main>
</template>

<style scoped>
.bg-main-image {
  background-image: url('@/assets/images/intialBgImage.png');
  z-index: 10;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
