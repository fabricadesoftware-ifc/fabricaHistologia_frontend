<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useSpecieStore } from '@/stores'

const specieStore = useSpecieStore()

onMounted(() => {
  specieStore.getSpecies()
})

function updateSpecie() {
  specieStore.updateSpecie(specie)
}
function deleteSpecie(){
  specieStore.deleteSpecie(specie.id)
}
const specie = reactive({
  id: '',
  name: '',
  category: ''
})
</script>

<template>
  <h1>Species Test</h1>

  <div class="get-specie">
    <h2>Get Specie</h2>
    <p>{{ specieStore.state.species }}</p>
  </div>

  <div>
    <div class="form">
      <div class="post-specie">
        <input type="text" name="post" placeholder="Nome" v-model="specie.name" />
        <input type="text" name="post" placeholder="Categoria" v-model="specie.category" />
        {{ specie }}
        <button
          @click="
            specieStore.createSpecie({
              name: specie.name,
              category: specie.category
            })
          "
        >
          Post
        </button>
      </div>

      <div class="put-specie">
        <input type="text" name="put" placeholder="id" v-model="specie.id"/>
        <input type="text" name="put" placeholder="nome" v-model="specie.name" />
        <input type="text" name="put" placeholder="category" v-model="specie.category" />
        {{ specie }}
        <button
          @click="updateSpecie()"
        >
          Put
        </button>
      </div>

      <div class="delete-specie">
        <input type="text" name="delete" placeholder="id" v-model="specie.id" />
        {{ specie }}
        <button
          @click="
            specieStore.deleteSpecie()
          "
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.39);
  border-style: none;
  height: 20px;
  border-radius: 2px;
  margin: 5px;
}
button {
  margin: 5px;
  border-style: none;
  border-radius: 2px;
  height: 20px;
  background-color: #373c5759;
  color: white;
}
input:hover {
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.39);
}
button:hover {
  background-color: #4d547a73;
}
</style>
