<script setup>

const props = defineProps({
  datas: {
    type: Object
  },
})

</script>

<template>
      <div>
        <h4 class="text-base font-medium">1. Pergunta:</h4>

        <ol class="list-inside mt-2 mb-2">
          <li>
            <p class="mx-5 mt-1 text-base font-medium font-poppins">(I) Teste</p>
          </li>

          <li>
            <p class="mx-5 mt-1 text-base font-medium font-poppins">(II) Teste</p>
          </li>

          <li>
            <p class="mx-5 mt-1 text-base font-medium font-poppins">(III) Teste</p>
          </li>
        </ol>

        <h4 class="mx-5 text-base font-medium">Bla bla bla, nos homens:</h4>
      </div>

</template>
