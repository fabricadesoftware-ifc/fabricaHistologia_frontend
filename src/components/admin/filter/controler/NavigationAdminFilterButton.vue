<script setup>
const props = defineProps({
    right: {
        type: Boolean,
        default: true
    },
 
})

const emits = defineEmits([
    'sendAction'
])
</script>

<template>
      <span
      @click="emits('sendAction', (right ? 'right' : 'left'))"
      :class="`w-[30px] h-[30px] bg-green-50 active:scale-110 absolute ${right ? 'right-5' : 'left-5 rotate-180'} z-50 hover:scale-105 duration-150 cursor-pointer flex items-center justify-center`"
    >
      <img class="w-full h-full" src="@/assets/images/icons/admin/Group 21.png" />
    </span>
</template>