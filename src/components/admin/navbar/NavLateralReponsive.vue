<script setup>
import { useNavBarAdminStore } from '@/stores/admin/navbar_admin'
import { NavbarAdminUser, NavbarAdminMenu } from '@/components/index'

const store = useNavBarAdminStore()
</script>

<template>
  <nav class="bg-transparent fixed top-0 left-0 z-40 flex items-center p-4">
    <button @click="store.toggleMenu" aria-label="Toggle Menu" class="text-2xl text-white">☰</button>
  </nav>

  <transition name="slide">
    <aside v-if="store.open" class="responsive-aside min-h-screen bg-gray-100 shadow-md p-5 flex flex-col gap-8">
      <button @click="store.closeMenu" aria-label="Close Menu" class="absolute z-50 top-4 left-4 text-xl"><img src="@/assets/images/icons/close.svg" alt="Fechar" class="w-5 h-5 object-contain" /></button>

      <div class="flex justify-start py-8">
        <div class="max-w-xs w-full">
          <NavbarAdminUser />
        </div>
      </div>

      <div class="flex flex-1 flex-col items-start">
        <NavbarAdminMenu @navigate="store.navigateTo" />
      </div>
    </aside>
  </transition>
</template>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

/* Classe para o aside responsivo */
.responsive-aside {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 100%;
  min-height: 100dvh;
  overflow-y: auto;
  z-index: 99999;
}

@media (min-width: 500px) {
  .responsive-aside {
    max-width: 400px;
  }
}
</style>
