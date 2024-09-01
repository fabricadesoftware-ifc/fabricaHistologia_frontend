<script setup>
import router from '@/router';

const props = defineProps({
  title: {
    type: String,
    default: 'Acessar Painel'
  },
  hasArrowIcon: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
    default: '/'
  }
})
</script>
<template>
  <button
    class="flex items-center gap-5 hover:gap-7 ease-in duration-100 rounded-md text-lg font-medium text-white font-poppins tracking-wide leading-4 btn-access"
    @click="router.push(link)"
  >
    {{ props.title }}
    <a href="#" class="w-9 h-9" v-if="props.hasArrowIcon">
        <img src="@/assets/images/icons/arrowRight.svg" class="w-full h-full" />
    </a>
  </button>
</template>
<style>
.btn-access {
  background-color: rgba(255, 255, 255, 0.38);

  &:hover {
    background-color: rgba(224, 224, 224, 0.38);
  }
}
</style>
