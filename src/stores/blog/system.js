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
    })

    const systems = computed(() => state.value.systems)
    const selectedSystem = computed(() => state.value.selectedSystem)
    const isLoading = computed(() => state.value.loading);
    const systemsCount = computed(() => state.value.systems.length);

    /**
     * Fetches system data.
     * @async
     * @function getSystem
     */
    const getSystems = async () => {
        state.value.loading = true
        try {
            const response = await SystemService.getSystems();
            
            state.value.systems = response
        }
        catch (error) {
            state.value.error = error;
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
            state.value.systems.push(await SystemService.createSystems(newSystem));
        }
        catch (error) {
            state.value.error = error;
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
            const index = state.value.systems.findIndex((s) => s.id === system.id);
            state.value.systems[index] = await SystemService.updateSystems(system);
        }
        catch (error) {
            state.value.error = error;
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
            const index = state.value.systems.findIndex((s) => s.id === id);
            state.value.systems.splice(index, 1);
            await SystemService.deleteSystems(id);
        }
        catch (error) {
            state.value.error = error;
        }
        finally {
            state.value.loading = false;
        }
    }

    return { state, isLoading, systemsCount, systems, selectedSystem, getSystems, getSystemById,  createSystem, updateSystem, deleteSystem };
})
