<script setup>

const props = defineProps({
  data_answer: {
    type: Array
  },
})

const selectAnswer = (answer) => {
    if (answer.corrected) {
        
        return true
    } else {
        return false
    }
}
</script>

<template>
        <div v-for="(item, index) in props.data_answer" :key="index" class="flex flex-row flex-nowrap w-[100%] h-auto items-center gap-4" @click="selectAnswer(item)">

          <div class="size-8 rounded-full bg-black/30 flex items-center justify-center text-white">
            {{ index }}
          </div>
          <div class="max-w-[90%] lg:max-w-[80%] sm:max-w-[70%] break-all bg-slate-400">
          <h4 class="text-base font-medium">{{item.option}}</h4>
          </div>
        </div>
</template>
