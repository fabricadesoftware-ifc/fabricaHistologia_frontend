<script setup>
import { onBeforeMount } from 'vue'
import { useQuizStore } from '@/stores'
import {
  TableFilterContainer,
  TableFilterCard,
  ButtonActionAdmin,
  AdminGlobalContainer,
  ListTableAdmin,
  DataGraph
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
  <AdminGlobalContainer>
    <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center justify-between">
      <ButtonActionAdmin />
      <DataGraph
        title="Quizzes"
        :total="quizStore.quiz.length"
        seeMoreUrl="/admin/quiz"
        :items="quizStore.quiz"
        groupBy="level" 
      />
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

      <section>
        <ListTableAdmin
          :rows="quizStore.quiz"
          :columns="[
            { key: 'id', label: 'ID' },
            { key: 'question', label: 'Pergunta', editable: true },
            { key: 'system', label: 'Sistema', editable: true  },
            { key: 'level', label: 'Nível', editable: true }

          ]"
          @update:cell="(e) => console.log('editou', e)"
        />
      </section>
    </section>
  </AdminGlobalContainer>
</template>
