<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { useQuizStore } from '@/stores'
import {
  TableFilterContainer,
  TableFilterCard,
  ButtonActionAdmin,
  AdminGlobalContainer
} from '@/components/index'

import { useAdmin } from '@/stores/admin/filter_admin'
const quizStore = useQuizStore()
const { generalFilterData, changeActive } = useAdmin()

onBeforeMount(async () => {
  await quizStore.getQuiz()
  console.log(quizStore.quiz)
})  

</script>

<template>
 
  <AdminGlobalContainer >

    <div class="flex gap-5 h-56 items-center justify-between ">
     <ButtonActionAdmin />
     <div class=" bg-blue-400 h-[80%] w-[40%] mr-[5%] mt-10 mb-10"></div>
    </div>
    
    
    <section>
      <div class="flex flex-col w-[90%] mx-auto">
        <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
        <TableFilterContainer :amount="generalFilterData.length">
          <TableFilterCard
            @change="changeActive(index, generalFilterData)"
            :active="i.active"
            :filter="i"
            v-for="(i, index) in generalFilterData"
            :key="index"
          />
        </TableFilterContainer>
      </div>

      <div class="p-16" v-for="(quiz, index) in quizStore.quiz" :key="index">
        <p> {{quiz.id}} - {{ quiz.title }}</p>
        <img class=" w-24 h-24 object-cover" :src="quiz?.image?.url">
      </div>
    </section>
  </AdminGlobalContainer>
</template>
