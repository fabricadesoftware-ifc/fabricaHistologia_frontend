<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="absolute bottom-0 left-0">
    <h2 class="pt-4 font-semibold text-lg">Dados da Lâmina {{ props.id }}</h2>
    <ul class="text-gray-400 pt-4 pb-4">
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
</template>
