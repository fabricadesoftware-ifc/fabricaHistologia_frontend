<script setup>
import { onBeforeMount, ref, computed, watch } from 'vue'
import { useOrganStore, usePostStore } from '@/stores'
import {
  TableFilterContainer,
  TableFilterCard,
  ButtonActionAdmin,
  AdminGlobalContainer,
  ListTableAdmin,
  DataGraph,
  LoadingSpinner,
  TablePagination
} from '@/components/index'
import { useAdmin } from '@/stores/admin/filter_admin'

// Stores
const postStore = usePostStore()
const organStore = useOrganStore()
const { changeActive } = useAdmin()

// Estado de carregamento
const loading = ref(true)
const errorMessage = ref("")

// Controle de paginação
const currentPage = ref(1)
const itemsPerPage = 10

// Filtros
const filters = ref([])

// Posts formatados com fallback para nome do órgão
const postsWithOrganName = computed(() =>
  postStore.posts.map(post => ({
    ...post,
    organName: post.organ?.name || 'Sem órgão'
  }))
)

// Carregar dados iniciais
const loadInitialData = async () => {
  try {
    loading.value = true
    await Promise.all([
      postStore.getPosts(currentPage.value),
      organStore.getOrgans()
    ])
    filters.value = [
      { nome: 'Geral', active: true },
      ...organStore.organs.map(org => ({ nome: org.name, active: false }))
    ]
  } catch (err) {
    console.error("Erro ao carregar dados:", err)
    errorMessage.value = "Erro ao carregar posts ou órgãos."
  } finally {
    loading.value = false
  }
}

onBeforeMount(loadInitialData)

// Filtro ativo
const activeFilter = computed(() =>
  filters.value.find(f => f.active)?.nome
)

// Lista filtrada
const filteredPosts = computed(() => {
  if (!activeFilter.value || activeFilter.value === 'Geral') return postsWithOrganName.value
  return postsWithOrganName.value.filter(post => post.organ?.name === activeFilter.value)
})

// Paginação (API já retorna dados paginados)
const paginatedPosts = computed(() => filteredPosts.value)

// Total de páginas
const totalPages = computed(() =>
  Math.max(1, Math.ceil((postStore.count || filteredPosts.value.length) / itemsPerPage))
)

// Atualizar dados ao mudar de página
watch(currentPage, async (newPage) => {
  try {
    loading.value = true
    await postStore.getPosts(newPage)
  } catch (err) {
    console.error("Erro ao mudar de página:", err)
    errorMessage.value = "Erro ao carregar posts da página selecionada."
  } finally {
    loading.value = false
  }
})

// Resetar para página 1 ao mudar filtro
watch(activeFilter, async () => {
  currentPage.value = 1
  try {
    loading.value = true
    await postStore.getPosts(1)
  } catch (err) {
    console.error("Erro ao aplicar filtro:", err)
    errorMessage.value = "Erro ao filtrar posts."
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <AdminGlobalContainer>
    <!-- Loading Overlay -->
    <LoadingSpinner v-if="loading" class="my-10" />

    <template v-else>
      <!-- Gráfico -->
      <div class="flex gap-5 mr-[5%] mt-10 mb-10 h-56 items-center justify-between">
        <ButtonActionAdmin />
        <DataGraph
          title="Lâminas"
          :total="postStore.count"
          seeMoreUrl="/admin/posts"
          :items="postsWithOrganName"
          groupBy="organName"
        />
      </div>

      <!-- Filtros -->
      <section>
        <div class="flex flex-col w-[90%] mx-auto">
          <p class="text-xl font-medium mb-10">Cadastros Gerais</p>
          <TableFilterContainer :items="filters" :amount="filters.length">
            <TableFilterCard
              v-for="(filter, index) in filters"
              :key="index"
              :active="filter.active"
              :filter="filter"
              @change="changeActive(index, filters)"
            />
          </TableFilterContainer>
        </div>

        <!-- Tabela -->
        <section class="mt-10 w-[90%] mx-auto flex flex-col items-center mb-10">
          <ListTableAdmin
            :rows="paginatedPosts"
            :columns="[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Nome', editable: true },
              { key: 'species.name', label: 'Espécie' },
              { key: 'organName', label: 'Órgão' },
              { key: 'image.url', label: 'Imagem', type: 'image' }
            ]"
            :router="'/admin/posts'"
            @update:cell="(e) => console.log('editou', e)"
          />

          <!-- Paginação -->
          <TablePagination
            :currentPage="currentPage"
            :total-pages="totalPages"
            @page-change="(page) => currentPage.value = page"
          />
        </section>
      </section>
    </template>
  </AdminGlobalContainer>
</template>
