<script setup>

const props = defineProps({
  dataQuestion: {
    type: Object
  },
  index: {
    type: Number
  }
})

</script>

<template>
      <div>
        <h4 class="text-base font-medium">{{ props.index + '. ' }}</h4>

        <div class="list-inside mt-2 mb-2">
            <p class="mx-5 mt-1 text-base font-medium font-poppins">{{ props.dataQuestion.question }}</p>
        </div>
      </div>

</template>
