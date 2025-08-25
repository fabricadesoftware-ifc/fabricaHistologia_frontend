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
    materialById: null,
    materialsBySystem: [],
    selectedMaterial: null,
    searchResults: [],
    history: null,
    nameHistory: '',
    loading: false,
    error: null,
    connection: false,
    count: 0,
  })
  const materials = computed(() => state.materials)
  const materialById = computed(() => state.materialById)
  const materialsBySystem = computed(() => state.materialsBySystem)
  const selectedMaterial = computed(()=> state.selectedMaterial)
  const isLoading = computed(() => state.loading)
  const materialsCount = computed(() => state.organ.length)
  const history = computed(()=> state.history)
  const count = computed(()=> state.count)

  /**
   * Fetches materials data.
   * @async
   * @function getSpecies
   */
  const getMaterials = async (page) => {
    state.loading = true
    try {
      const response = await SupportingMaterialService.getMaterials(page)
      state.materials = response.results
      state.count = response.count
      return response
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

    /**
   * Fetches materials data.
   * @async
   * @function getMaterialsById
   */

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
      return response;
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getMaterialsById = async (id) => {
    state.loading = true
    try {
      const response = await SupportingMaterialService.getMaterialsById(id)
      state.selectedMaterial = response
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
      return response
    } catch (error) {
      state.error = error
      throw error
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
      return state.materials.push(await SupportingMaterialService.createMaterial(newMaterial))
    } catch (error) {
      state.error = error
      throw error;
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
      await SupportingMaterialService.updateMaterials(material)
      return state.materials[index]
    } catch (error) {
      state.error = error
      throw error
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
      SupportingMaterialService.deleteMaterials(id)
      return state.materials;
    } catch (error) {
      state.error = error
      throw error
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
    selectedMaterial,
    materialById,
    getMaterialsBySystem,
    getMaterials,
    getMaterialsById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    searchMaterialsByName
  }
})
