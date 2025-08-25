import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { SystemService } from '@/services/'
import { useStorage } from "@vueuse/core";

/**
 * Store for managing system data.
 * @typedef {Object} SpecieStore
 * @property {Object} state - The state object containing systems data.
 * @property {Array} state.systems - The array of systems.
 * @property {Object|null} state.selectedSpecie - The currently selected specie.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} systemsCount - Computed property indicating the number of systems.
 * @property {Function} getsystems - Function to fetch systems data.
 * @property {Function} createSpecie - Function to create a new specie.
 * @property {Function} updateSpecie - Function to update an existing specie.
 * @property {Function} deleteSpecie - Function to delete a specie.
 */

/**
 * Creates a new instance of the SpecieStore.
 * @function useSystemStore
 * @returns {SystemStore} The SpecieStore instance.
 */
export const useSystemStore = defineStore('system', () => {

    const state = useStorage('systemStorage', {
        systems: [],
        loading: false,
        error: null,
        selectedSystem: {},
        count: 0,
    })

    const systems = computed(() => state.value.systems)
    const selectedSystem = computed(() => state.value.selectedSystem)
    const isLoading = computed(() => state.value.loading);
    const systemsCount = computed(() => state.value.systems.length);
    const count = computed(() => state.value.count);

    /**
     * Fetches system data.
     * @async
     * @function getSystem
     */
    const getSystems = async (page) => {
        state.value.loading = true
        try {
            const response = await SystemService.getSystems(page);

            state.value.systems = response.results;
            state.value.count = response.count;

            return response;
        }
        catch (error) {
            state.value.error = error;
            throw error;
        }
        finally {
            state.value.conected = true;  // just to see if the connection is established
            state.value.loading = false;
        }
    };

    const getSystemById = async (id) => {
        state.value.loading = true
        try {
            const response = await SystemService.getSystemById(id);
            state.value.selectedSystem = response
            return response
        }
        catch (error) {
            state.value.error = error;
        }
        finally {
            state.value.conected = true;  // just to see if the connection is established
            state.value.loading = false;
        }
    }

    /**
     * Creates a new system.
     * @async
     * @function createSystem
     * @param {Object} newsystem - The new system object to create.
     */
    const createSystem = async (newSystem) => {
        state.value.loading = true;
        try {
            return state.value.systems.push(await SystemService.createSystems(newSystem));
        }
        catch (error) {
            state.value.error = error;
            throw error;
        }
        finally {
            state.value.conected = true;
            state.value.loading = false;
        }
    };

    /**
     * Updates an existing system.
     * @async
     * @function updateSystem
     * @param {Object} system - The system object to update.
     */
    const updateSystem = async (system) => {
        state.value.loading = true;
        try {
            console.log('Updating system:', system);
            const index = state.value.systems.findIndex((s) => s.id === system.id);
            const response = await SystemService.updateSystems(system);
            state.value.systems[index] = response;
            return response;
        }
        catch (error) {
            state.value.error = error;
            throw error;
        }
        finally {
            state.value.loading = false;
        }
    };

    /**
     * Deletes a system.
     * @async
     * @function deleteSystem
     * @param {number} id - The ID of the system to delete.
     */
    const deleteSystem = async (id) => {
        state.value.loading = true;
        try {
            await SystemService.deleteSystems(id);
            return;
        }
        catch (error) {
            state.value.error = error;
            throw error;
        }
        finally {
            state.value.loading = false;
        }
    }

    return { state, isLoading, systemsCount, systems, selectedSystem, count, getSystems, getSystemById,  createSystem, updateSystem, deleteSystem };
})
