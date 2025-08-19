<script setup>
import { onBeforeMount, computed } from 'vue'
import {
  AdminGlobalContainer,
  TableFilterContainer,
  TableFilterCard,
  DataGraph,
  ListTableAdmin
} from '@/components/index'

import {
  usePostStore,
  useOrganStore,
  useSystemStore,
  useSpecieStore,
  useQuizStore,
  useSupportingStore
} from '@/stores'
import { useAdmin } from '@/utils/admin'

const postStore = usePostStore()
const organStore = useOrganStore()
const systemStore = useSystemStore()
const specieStore = useSpecieStore()
const quizStore = useQuizStore()
const supportingStore = useSupportingStore()

const { generalFilterData, changeActive } = useAdmin()

onBeforeMount(async () => {
  await Promise.all([
    postStore.getPosts(),
    organStore.getOrgans(),
    systemStore.getSystems(),
    specieStore.getSpecies(),
    quizStore.getQuiz(),
    supportingStore.getMaterials()
  ])
})

// qual filtro está ativo
const activeFilter = computed(() => generalFilterData.value.find((f) => f.active))

// dados da tabela de acordo com o filtro
const filteredData = computed(() => {
  switch (activeFilter.value?.key) {
    case 'posts':
      return postStore.posts
    case 'organs':
      return organStore.organs
    case 'systems':
      return systemStore.systems
    case 'species':
      return specieStore.species
    case 'quiz':
      return quizStore.quiz
    case 'supporting-materials':
      return supportingStore.materials
    default:
      return []
  }
})

// colunas da tabela de acordo com o filtro
const tableColumns = computed(() => {
  switch (activeFilter.value?.key) {
    case 'posts':
      return [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Título', editable: true },
        { key: 'species.name', label: 'Espécie' },
        { key: 'image.url', label: 'Imagem', type: 'image' }
      ]
    case 'organs':
      return [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome', editable: true },
        { key: 'system', label: 'Sistema' },
        { key: 'image.url', label: 'Imagem', type: 'image' }
      ]
    case 'systems':
      return [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome', editable: true },
        { key: 'category', label: 'Categoria' }
      ]
    case 'species':
      return [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome', editable: true },
        { key: 'category', label: 'Categoria' }
      ]
    case 'quiz':
      return [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Título', editable: true },
        { key: 'category', label: 'Categoria' },
        { key: 'image.url', label: 'Imagem', type: 'image' }
      ]
    case 'supporting-materials':
      return [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome', editable: true },
        { key: 'type', label: 'Tipo' },
        { key: 'image_supporting_material.url', label: 'Imagem', type: 'image' }
      ]
    default:
      return []
  }
})
</script>

<template>
  <AdminGlobalContainer subtitle="Veja um resumo do que há cadastrado no portal">
    <!-- gráficos de cima -->
    <div class="flex w-full max-w-[98%] ml-[2%] overflow-auto gap-10 mt-20">
      <DataGraph
        class="min-w-[300px]"
        title="Posts"
        :total="postStore.posts.length"
        seeMoreUrl="/admin/posts"
        :items="postStore.posts"
        groupBy="species.name"
      />
      <DataGraph
        title="Órgãos"
        :total="organStore.organs.length"
        seeMoreUrl="/admin/organs"
        :items="organStore.organs"
        groupBy="system"
      />
      <DataGraph
        title="Sistemas"
        :total="systemStore.systems.length"
        seeMoreUrl="/admin/systems"
        :items="systemStore.systems"
        groupBy="category"
      />
      <DataGraph
        title="Espécies"
        :total="specieStore.species.length"
        seeMoreUrl="/admin/species"
        :items="specieStore.species"
        groupBy="category"
      />
      <DataGraph
        title="Quizzes"
        :total="quizStore.quiz.length"
        seeMoreUrl="/admin/quiz"
        :items="quizStore.quiz"
        groupBy="category"
      />
      <DataGraph
        title="Materiais de Apoio"
        :total="supportingStore.materials.length"
        seeMoreUrl="/admin/supporting-materials"
        :items="supportingStore.materials"
        groupBy="type"
      />
    </div>

    <!-- filtros -->
    <section>
      <div class="flex flex-col w-[90%] mx-auto mt-10">
        <p class="text-xl font-medium mb-10">Filtros</p>
        <TableFilterContainer :amount="generalFilterData.length">
          <TableFilterCard
            v-for="(i, index) in generalFilterData"
            :key="i.key"
            :active="i.active"
            :filter="i"
            @change="() => changeActive(index, generalFilterData)"
          />
        </TableFilterContainer>
      </div>
    </section>

    <!-- tabela -->
    <section class="mt-10 w-[90%] mx-auto">
      <ListTableAdmin
        v-if="filteredData.length"
        :rows="filteredData"
        :columns="tableColumns"
        @update:cell="(e) => console.log('editou', e)"
      />
    </section>
  </AdminGlobalContainer>
</template>
