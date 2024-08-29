<script setup>
import { ref } from 'vue'

const answerNumber = ref(0)
const props = defineProps({
  datas: {
    type: Object
  },
})



</script>

<template>
        <div v-for="(item, index) in props.datas" :key="index" class="flex flex-row flex-nowrap w-96 h-9 items-center gap-4">

          <div class="size-8 rounded-full bg-black/30 flex items-center justify-center text-white">
            {{ item.QuestionLetter }}
          </div>
          <h4 class="text-base font-medium ">{{item.QuestionText}}</h4>

        </div>
</template>
