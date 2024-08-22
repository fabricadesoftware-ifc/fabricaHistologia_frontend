import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { SpecieService } from "@/services";

/**
 * Store for managing species data.
 * @typedef {Object} SpecieStore
 * @property {Object} state - The state object containing species data.
 * @property {Array} state.species - The array of species.
 * @property {Object|null} state.selectedSpecie - The currently selected specie.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} speciesCount - Computed property indicating the number of species.
 * @property {Function} getSpecies - Function to fetch species data.
 * @property {Function} createSpecie - Function to create a new specie.
 * @property {Function} updateSpecie - Function to update an existing specie.
 * @property {Function} deleteSpecie - Function to delete a specie.
 */

/**
 * Creates a new instance of the SpecieStore.
 * @function useSpecieStore
 * @returns {SpecieStore} The SpecieStore instance.
 */

export const useSpecieStore = defineStore("specie",
    () => {
        const state = reactive({
            species: [],
            selectedSpecie: null,
            loading: false,
            error: null,
            connection: false,
        });
        const isLoading = computed(() => state.loading);
        const speciesCount = computed(() => state.species.length);

        /**
         * Fetches species data.
         * @async
         * @function getSpecies
         */
        const getSpecies = async () => {
            state.loading = true;
            try {
                state.species = await SpecieService.getSpecies();
                console.log("test")
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
                state.connection = true; // just to see if the connection is established
            }
        };

        /**
         * Creates a new specie.
         * @async
         * @function createSpecie
         * @param {Object} newSpecie - The new specie object to create.
         */
        const createSpecie = async (newSpecie) => {
            state.loading = true;
            try {
                state.species.push(await SpecieService.createSpecies(newSpecie));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };
        
        /**
         * Updates an existing specie.
         * @async
         * @function updateSpecie
         * @param {Object} specie - The specie object to update.
         */
        const updateSpecie = async (specie) => {
            state.loading = true;
            try {
                const index = state.species.findIndex((s) => s.id === specie.id);
                state.species[index] = await SpecieService.updateSpecies(specie);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        /**
         * Deletes a specie.
         * @async
         * @function deleteSpecie
         * @param {number} id - The ID of the specie to delete.
        */
       const deleteSpecie = async (id) => {
           state.loading = true;
           try {
               const index = state.species.findIndex((s) => s.id === id);
               state.species.splice(index, 1);
               await SpecieService.deleteSpecies(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };
        
        return {
            state,
            isLoading,
            speciesCount,
            getSpecies,
            createSpecie,
            updateSpecie,
            deleteSpecie
        };
        
    }
)
