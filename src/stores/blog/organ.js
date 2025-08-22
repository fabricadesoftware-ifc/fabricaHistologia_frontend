import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { OrganService } from '@/services'
import { useStorage } from '@vueuse/core'

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
  const state = useStorage('organStorage', {
    organs: [],
    selectedOrgan: {},
    organsBySystem: [],
    loading: false,
    error: null,
    connection: false
  })

  const organs = computed(() => state.value.organs)
  const organsBySystem = computed(() => state.value.organsBySystem)
  const selectedOrgan = computed(()=> state.value.selectedOrgan)
  const isLoading = computed(() => state.value.loading)
  const organsCount = computed(() => state.value.organs.length)

  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getOrgans = async () => {
    state.value.loading = true
    try {
      state.value.organs = await OrganService.getOrgans()
      return response
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

   /**
   * Fetches organs data.
   * @async
   * @function getOrgansBySystem
   */
   const getOrgansBySystem = async (systemId) => {
    state.value.loading = true
    try {
      const response = await OrganService.getOrgansBySystem(systemId)   
      state.value.organsBySystem = response
      return response
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const getOrgansById = async (organId) => {
    state.value.loading = true
    try {
      const response = await OrganService.getOrgansById(organId)   
      state.value.selectedOrgan = response
      return response;
    } catch (error) {
      state.value.error = error
      throw error;
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  /**
   * Creates a new organ.
   * @async
   * @function createSpecie
   * @param {Object} newSpecie - The new organ object to create.
   */
  const createOrgan = async (newOrgan) => {
    state.value.loading = true
    try {
      return state.value.organs.push(await OrganService.createOrgan(newOrgan))
    } catch (error) {
      state.value.error = error
      throw error;
    } finally {
      state.value.loading = false
    }
  }

  /**
   * Updates an existing organ.
   * @async
   * @function updateSpecie
   * @param {Object} specie - The organ object to update.
   */
  const updateOrgan = async (organ) => {
    state.value.loading = true
    try {
      console.log('choge', organ);
      const index = state.value.organs.findIndex((s) => s.id === organ.id);
      console.log('Updating organ:', organ)
      await OrganService.updateOrgans(organ)
      return state.value.organs[index];
    } catch (error) {
      state.value.error = error
      throw error;
    } finally {
      state.value.loading = false
    }
  }
  /**
   * Deletes a organ.
   * @async
   * @function deleteSpecie
   * @param {number} id - The ID of the organ to delete.
   */
  const deleteOrgan = async (id) => {
    state.value.loading = true
    try {
      const index = state.value.organs.findIndex((s) => s.id === id)
      state.value.organs.splice(index, 1)
      await OrganService.deleteOrgans(id)
      return state.value.organs
    } catch (error) {
      state.value.error = error
      throw error;
    } finally {
      state.value.loading = false
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
