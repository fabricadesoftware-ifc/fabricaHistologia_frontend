<script setup>
import { onMounted, reactive } from 'vue'
import { useSpecieStore } from '@/stores'

const specieStore = useSpecieStore()


onMounted(() => {
  specieStore.getSpecies()
})

const specie = reactive({
  name: '',
  descripition: ''
})

const putspecie = reactive({
  id: '',
  name: '',
  descripition: ''
})
</script>

<template>
  <h1>Species Test</h1>

  <div class="get-specie">
    <h2>Get Specie</h2>
    <p>{{ specieStore.state.specie }}</p>
  </div>

<div>
  <div class="post-specie">
    <input type="text" name="post" placeholder="nome" v-model="specie.name" />
    <input type="text" name="post" placeholder="description" v-model="specie.description" />
    <button @click="specieStore.createSpecie(postspecie)">Post</button>
  </div>

  <div class="put-specie">
    <input type="text" name="put" placeholder="id" v-model="putspecie .id" />
    <input type="text" name="put" placeholder="nome" v-model="putspecie .name" />
    <input type="text" name="put" placeholder="description" v-model="putspecie.description" />
    <button @click="specieStore.updateSpecie(putspecie)">Put</button>
  </div>

  <div class="delete-specie">
    <input type="text" name="delete" placeholder="id" v-model="specie.id" />
    <button @click="specieStore.deleteSpecie(deletespecie)">Delete</button>
  </div>

</div>
</template>

<style scoped>
input{
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.39);
  border-style: none;
  height: 20px;
  border-radius: 2px;
  margin: 5px;
}
button{
  margin: 5px;
  border-style: none;
  border-radius: 2px;
  height: 20px;
  background-color: #373c5759;
  color: white;
}
input:hover{
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.39);

}
button:hover{
  background-color: #4d547a73;
}

</style>
