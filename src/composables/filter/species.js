import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores'

export function useSpeciesFilter(initialSpecies) {
  const postStore = usePostStore()
  const route = useRoute()
  const organId = route.params.id
  const species = ref([])
  const selectedSpecie = ref(null)
  const delayActive = ref(false)
  const activated = ref(false)
  const filteredSpecies = ref(null)

  if (initialSpecies) species.value = [...initialSpecies]

  function setInitialSpecies(initialSpecies) {
    species.value = [...initialSpecies]
  }

  console.log(species.value)

  
  const setSelectedSpecie = (specie) => {

    if (selectedSpecie.value) {
      species.value.push(selectedSpecie.value)
    }
    selectedSpecie.value = specie
    const index = species.value.findIndex((s) => s.id === specie.id)
    if (index !== -1) {
      species.value.splice(index, 1)
    }

    postStore.getPostsByOrganAndType(organId, postStore.typeSelection, selectedSpecie.value.id)
        console.log(postStore.postByOrganAndType)

  }

  const clearFilters = () => {
    if (selectedSpecie.value) {
      species.value.push(selectedSpecie.value)
      selectedSpecie.value = null
      postStore.getPostsByOrganAndType(organId, postStore.typeSelection, '')
    }
}

  const setTime = (boolean) => {
    if (boolean == false) {
    delayActive.value = false
    setTimeout(()=> {
        activated.value = false
    }, 200)
    } else {
      delayActive.value = true
    setTimeout(()=> {
        activated.value = true
    }, 200)
    }
    }

  const searchSpecies = (search) => {
    console.log(search)
    if (search != undefined) {
    filteredSpecies.value = species.value.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))

   
    return filteredSpecies.value
    
    } else {
      filteredSpecies.value = null
      return species.value
    }
    
  }



return {
    selectedSpecie,
    species,
    delayActive,
    activated,
    filteredSpecies,
    setTime,
    setSelectedSpecie,
    clearFilters,
    setInitialSpecies,
    searchSpecies
}

}
