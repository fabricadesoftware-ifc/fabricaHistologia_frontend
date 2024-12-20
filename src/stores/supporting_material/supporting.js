import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { SupportingMaterialService } from '@/services'


/**
 * Store for managing organs data.
 * @typedef {Object} SupportingStore
 * @property {Object} state - The state object containing organs data.
 * @property {Array} state.species - The array of organs.
 * @property {Object|null} state.selectedSpecie - The currently selected organ.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} speciesCount - Computed property indicating the number of organs.
 * @property {Function} getSpecies - Function to fetch organs data.
 * @property {Function} createSpecie - Function to create a new specie.
 * @property {Function} updateSpecie - Function to update an existing organ.
 * @property {Function} deleteSpecie - Function to delete a organ.
 */

/**
 * Creates a new instance of the upportingStore.
 * @function useSupportingStore
 * @returns {SupportingStore} The OrganStore instance.
 */
export const useSupportingStore = defineStore('supporting', () => {
  const state = reactive({
    materials: [],
    materialsBySystem: [],
    searchResults: [],
    history: null,
    nameHistory: '',
    loading: false,
    error: null,
    connection: false
  })
  const materials = computed(() => state.materials)
  const materialsBySystem = computed(() => state.materialsBySystem)
  const isLoading = computed(() => state.loading)
  const materialsCount = computed(() => state.organ.length)
  const history = computed(()=> state.history)

  /**
   * Fetches materials data.
   * @async
   * @function getSpecies
   */
  const getMaterials = async () => {
    state.loading = true
    try {
      const response = await SupportingMaterialService.getMaterials()
      state.materials = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

   /**
   * Fetches Material data.
   * @async
   * @function getMaterialsBySystem
   */
   const getMaterialsBySystem = async (systemId) => {
    state.loading = true
    try {
      const response = await SupportingMaterialService.getMaterialsBySystem(systemId) 
      state.materialsBySystem = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const searchMaterialsByName = async (name, system__id) => {
    state.loading = true
    try {
      const response = await SupportingMaterialService.SearchMaterialsByName(name, system__id)
      state.searchResults = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  /**
   * Creates a new Material.
   * @async
   * @function createSpecie
   * @param {Object} newSpecie - The new Material object to create.
   */
  const createMaterial = async (newMaterial) => {
    state.loading = true
    try {
      state.materials.push(await SupportingMaterialService.createMaterial(newMaterial))
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  /**
   * Updates an existing organ.
   * @async
   * @function updateSpecie
   * @param {Object} specie - The organ object to update.
   */
  const updateMaterial = async (material) => {
    state.loading = true
    try {
      const index = state.materials.findIndex((s) => s.id === material.id)
      state.materials[index] = await SupportingMaterialService.updateMaterials(material)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }
  /**
   * Deletes a organ.
   * @async
   * @function deleteSpecie
   * @param {number} id - The ID of the organ to delete.
   */
  const deleteMaterial = async (id) => {
    state.loading = true
    try {
      const index = state.materials.findIndex((s) => s.id === id)
      state.materials.splice(index, 1)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    materialsCount,
    materials,
    materialsBySystem,
    history,
    getMaterialsBySystem,
    getMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    searchMaterialsByName
  }
})
