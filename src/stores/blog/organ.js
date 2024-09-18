import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { OrganService } from '@/services'

/**
 * Store for managing organs data.
 * @typedef {Object} SpecieStore
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
 * Creates a new instance of the OrganStore.
 * @function useSpecieStore
 * @returns {SpecieStore} The OrganStore instance.
 */
export const useOrganStore = defineStore('organ', () => {
  const state = reactive({
    organs: [],
    selectedOrgan: {},
    organsBySystem: [],
    loading: false,
    error: null,
    connection: false
  })
  const organs = computed(() => state.organs)
  const organsBySystem = computed(() => state.organsBySystem)
  const selectedOrgan = computed(()=> state.selectedOrgan)
  const isLoading = computed(() => state.loading)
  const organsCount = computed(() => state.organs.length)

  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getOrgans = async () => {
    state.loading = true
    try {
      state.organs = await OrganService.getOrgans()
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

   /**
   * Fetches organs data.
   * @async
   * @function getOrgansBySystem
   */
   const getOrgansBySystem = async (systemId) => {
    state.loading = true
    try {
      const response = await OrganService.getOrgansBySystem(systemId)   
      state.organsBySystem = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getOrgansById = async (organId) => {
    state.loading = true
    try {
      const response = await OrganService.getOrgansById(organId)   
      state.selectedOrgan = response[0]
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  /**
   * Creates a new organ.
   * @async
   * @function createSpecie
   * @param {Object} newSpecie - The new organ object to create.
   */
  const createOrgan = async (newOrgan) => {
    state.loading = true
    try {
      state.organs.push(await OrganService.createOrgan(newOrgan))
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
  const updateOrgan = async (organ) => {
    state.loading = true
    try {
      const index = state.organs.findIndex((s) => s.id === organ.id)
      state.organs[index] = await OrganService.getOrgans()
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
  const deleteOrgan = async (id) => {
    state.loading = true
    try {
      const index = state.organs.findIndex((s) => s.id === id)
      state.organs.splice(index, 1)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    organsCount,
    organs,
    organsBySystem,
    selectedOrgan,
    getOrgansBySystem,
    getOrgans,
    getOrgansById,
    createOrgan,
    updateOrgan,
    deleteOrgan
  }
})
