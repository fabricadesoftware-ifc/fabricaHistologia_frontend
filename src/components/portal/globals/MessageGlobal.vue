<script setup>
import { useNavigationStore } from '@/stores';
const navigationStore = useNavigationStore()

const emits = defineEmits([
    'action'
])

const close = () => {
    navigationStore.activeError = !navigationStore.activeError
    navigationStore.messageBody.title = ''
    navigationStore.messageBody.description = ''
}
</script>

<template>
<main v-if="navigationStore.showActiveError" class="w-dvw h-dvh bg-transparent fixed z-40 flex justify-center items-center">
  <section class="absolute z-40 bg-white p-4 flex  flex-col items-center gap-7 rounded-lg min-w-64 max-w-96">
    <div class="flex flex-col items-center gap-5 justify-center">
    <h1 class="text-2xl text-center font-medium">{{ navigationStore.message.title }}</h1>
    <p class="w-11/12 text-md text-justify">{{ navigationStore.message.description }}</p>
    </div>
    <div>
        <button @click="emits('action'), close()" class="bg-[#267A7A] text-white py-2 px-5 rounded-2xl hover:brightness-[85%]">Entendido</button>
    </div>
  </section>
  <div class="bg-black h-dvh w-dvw opacity-50"></div>
</main>
</template>

<style>

</style>