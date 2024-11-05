<script setup>
import { usePostStore, useOrganStore } from '@/stores';
const postStore = usePostStore()
const organStore = useOrganStore()
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="absolute -top-3 -right-3 flex justify-center items-center bg-[#267A7A] text-white pl-8 pb-8 pr-8 pt-4 rounded-xl animation-open">
    <div>
      <div class="absolute top-3 right-3">
        <button class="bg-white p-2 rounded-full shadow-lg close-icon hover:brightness-90" @click="close()">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="h-6 w-6" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
          </svg>
        </button>
      </div>
      <h2 class="pt-4 font-semibold text-lg animation-appear">Dados da Lâmina {{ props.id }}</h2>
      <ul class="text-gray-300 pt-4 pb-4 animation-appear">
        <li>
          <p>Órgão: {{ organStore.selectedOrgan.name }}</p>
        </li>
        <li>
          <p>Espécie: {{ postStore.selectedPost.species.name }}</p>
        </li>
        <li>
          <p>Coloração: {{ postStore.selectedPost.coloring }}</p>
        </li>
        <li>
          <p>Aumento: {{ postStore.selectedPost.increase }}</p>
        </li>
        <li>
          <p>Tipo de corte: {{ postStore.selectedPost.type_cut }}</p>
        </li>
      </ul>
      <p class="font-light italic animation-appear">Lâmina postada por {{ postStore.selectedPost.autor_user.email }}</p>
      <p class="font-medium animation-appear">Postado em {{ postStore.selectedPost.post_date }}</p>
    </div>
  </div>
</template>

<style scoped>
.close-icon {
  transform: rotate(45deg);
  animation: rotateLeft 0.3s;
}

@keyframes rotateLeft {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(45deg);
  }
}

.animation-open {
  animation: open 0.1s ease;
}

.animation-appear {
  animation: open 0.2s ease-in;
}

@keyframes open {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
