<script setup>
import { onBeforeMount, computed, ref, watch } from 'vue'
import {
  AdminGlobalContainer,
  TableFilterContainer,
  TableFilterCard,
  DataGraph,
  ListTableAdmin,
  LoadingSpinner,
  TablePagination
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

// Estado de carregamento
const loading = ref(true)

onBeforeMount(async () => {
  try {
    await Promise.all([
      postStore.getPosts(1),
      organStore.getOrgans(1),
      systemStore.getSystems(1),
      specieStore.getSpecies(1),
      quizStore.getQuiz(1),
      supportingStore.getMaterials(1)
    ])
  } finally {
    loading.value = false
  }
})

// qual filtro está ativo
const activeFilter = computed(() => generalFilterData.value.find((f) => f.active))

// rota da tabela
const tableRoute = computed(() => {
  switch (activeFilter.value?.key) {
    case 'posts':
      return '/admin/posts'
    case 'organs':
      return '/admin/organs'
    case 'systems':
      return '/admin/systems'
    case 'species':
      return '/admin/species'
    case 'quiz':
      return '/admin/quiz'
    case 'supporting-materials':
      return '/admin/supporting-materials'
    default:
      return '/'
  }
})

// Mapa de níveis numéricos para nomes
const levelMap = { 1: 'Fácil', 2: 'Médio', 3: 'Difícil' }

// Computed para exibir quizzes com nome do nível
const quizzesWithLevelName = computed(() =>
  quizStore.quiz.map((q) => ({
    ...q,
    levelName: levelMap[q.level] || `Nível ${q.level}`
  }))
)

// colunas da tabela de acordo com o filtro
const tableColumns = computed(() => {
  switch (activeFilter.value?.key) {
    case 'posts':
      return [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome', editable: true },
        { key: 'species.name', label: 'Espécie' },
        { key: 'image.url', label: 'Imagem', type: 'image' }
      ]
    case 'organs':
      return [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome', editable: true },
        { key: 'system.name', label: 'Sistema' },
        { key: 'image.url', label: 'Imagem', type: 'image' }
      ]
    case 'systems':
      return [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome', editable: true },
        { key: 'description', label: 'Descrição', editable: true },
        { key: 'image.url', label: 'Imagem', type: 'image' }
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
        { key: 'question', label: 'Pergunta', editable: true },
        { key: 'system.name', label: 'Sistema', editable: true },
        { key: 'levelName', label: 'Nível', editable: false }
      ]
    case 'supporting-materials':
      return [
        { key: 'name', label: 'Nome', editable: true },
        { key: 'description', label: 'Descrição', editable: true },
        { key: 'system.name', label: 'Sistema', editable: true }
      ]
    default:
      return []
  }
})

// dados da tabela
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
      return quizzesWithLevelName.value
    case 'supporting-materials':
      return supportingStore.materials
    default:
      return []
  }
})

const currentPage = ref(1)
const itemsPerPage = 10


const paginatedData = computed(() =>  filteredData.value)
const storeMap = {
  posts: postStore,
  organs: organStore,
  systems: systemStore,
  species: specieStore,
  quiz: quizStore,
  'supporting-materials': supportingStore
}
const totalPages = computed(() => {
  const activeKey = activeFilter.value?.key
  if (!activeKey) return 1

  if (activeKey === 'quiz') {
    return quizStore.quizCountState
      ? Math.ceil(quizStore.quizCountState / itemsPerPage)
      : 1
  }

  return storeMap[activeKey]?.count
    ? Math.ceil(storeMap[activeKey].count / itemsPerPage)
    : 1
})
watch(currentPage, async (newPage) => {
  const activeKey = activeFilter.value?.key
  if (!activeKey) return

  const store = storeMap[activeKey]

  // Mapeia os métodos corretamente para cada store
  const fetchMethods = {
    posts: () => postStore.getPosts(newPage),
    organs: () => organStore.getOrgans(newPage),
    systems: () => systemStore.getSystems(newPage),
    species: () => specieStore.getSpecies(newPage),
    quiz: () => quizStore.getQuiz(newPage),
    'supporting-materials': () => supportingStore.getMaterials(newPage)
  }

  if (fetchMethods[activeKey]) {
    loading.value = true
    await fetchMethods[activeKey]()
    loading.value = false
  }
})
</script>

<template>
  <AdminGlobalContainer subtitle="Veja um resumo do que há cadastrado no portal">
    <!-- Exibe o loading -->
    <LoadingSpinner v-if="loading" class="mt-20" />

    <!-- Conteúdo só aparece quando terminar o carregamento -->
    <template v-else>
      <!-- gráficos de cima -->
      <div class="flex w-full max-w-[98%] ml-[2%] overflow-auto gap-10 mt-20">
        <DataGraph
          class="min-w-[300px]"
          title="Posts"
          :total="postStore.posts.length"
          seeMoreUrl="/admin/posts"
          :items="postStore.posts"
          groupBy="organ.name"
        />
        <DataGraph
          title="Órgãos"
          :total="organStore.organs.length"
          seeMoreUrl="/admin/organs"
          :items="organStore.organs"
          groupBy="system.name"
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
          :items="quizzesWithLevelName"
          groupBy="levelName"
        />
        <DataGraph
          title="Materiais de Apoio"
          :total="supportingStore.materials.length"
          seeMoreUrl="/admin/supporting-materials"
          :items="supportingStore.materials"
          groupBy="system.name"
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
      <section class="mt-10 w-[90%] mx-auto flex flex-col items-center mb-10">
        <ListTableAdmin
          v-if="paginatedData.length"
          :rows="paginatedData"
          :columns="tableColumns"
          :router="tableRoute"
          @update:cell="(e) => console.log('editou', e)"
        />

        <!-- Paginação -->
        <TablePagination
          
          class="mt-6"
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="(page) => (currentPage = page)"
        />
      </section>
    </template>
  </AdminGlobalContainer>
</template>