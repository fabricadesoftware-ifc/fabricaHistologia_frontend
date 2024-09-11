<script setup>
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
  <div class="absolute -top-3 -right-3 flex justify-center items-center bg-[#267A7A] text-white pl-8 pb-8 pr-8 pt-4 rounded-xl aniamtion-open">
    <div>
      <div class="absolute top-3 right-3">
        <button class="bg-white p-2 rounded-full shadow-lg close-icon" @click="close()">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="h-6 w-6" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
          </svg>
        </button>
      </div>
      <h2 class="pt-4 font-semibold text-lg">Dados da Lâmina {{ props.id }}</h2>
      <ul class="text-gray-300 pt-4 pb-4">
        <li>
          <p>Órgão: Órgão</p>
        </li>
        <li>
          <p>Espécie: Espécie</p>
        </li>
        <li>
          <p>Coloração: Coloração</p>
        </li>
        <li>
          <p>Aumento: Aumento</p>
        </li>
        <li>
          <p>Tipo de corte: Tipo de corte</p>
        </li>
        <li>
          <p>Função do órgão: 2</p>
        </li>
        <li>
          <p>Estruturas analisadas: 4</p>
        </li>
        <li>
          <p>Função das estruturas: 3</p>
        </li>
      </ul>
      <p class="font-light italic">Lâmina postada por Mateus Lopes Albano</p>
      <p class="font-medium">Postado em 12/12/2021</p>
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
/* 
.aniamtion-open {
  animation: open 0.3s;
}

@keyframes open {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
} */
</style>
