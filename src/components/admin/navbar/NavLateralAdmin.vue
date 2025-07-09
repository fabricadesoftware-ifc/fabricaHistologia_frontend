<script setup>
import { useNavBarAdminStore } from '@/stores/admin/navbar_admin'
import { NavLateralReponsive, NavbarAdminUser, NavbarAdminMenu } from '@/components/index'

const store = useNavBarAdminStore()
store.initResizeListener()
</script>

<template>
  <div v-if="!store.isMobile" class="flex">
    <aside class="min-h-screen bg-gray-100 shadow-md p-5 flex flex-col gap-8">
      <NavbarAdminUser />
      <NavbarAdminMenu />
    </aside>
  </div>
  <div v-else>
    <NavLateralReponsive />
  </div>
</template>

<style scoped></style>
