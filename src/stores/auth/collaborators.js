import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { CollaboratorsService } from '@/services'
import { useAuthStore } from './auth'
import { useStorage } from '@vueuse/core'

/**
 * Store for managing collaborators data.
 * @typedef {Object} CollaboratorsStore
 * @property {Object} state - The state object containing collaborators data.
 * @property {Array} state.collaborators - The array of collaborators.
 * @property {Array} state.collaboratorByUser - The array of collaborators filtered by user.
 * @property {Object|null} state.selectedCollaborator - The currently selected collaborator.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} collaboratorsCount - Computed property indicating the number of collaborators.
 * @property {Function} getCollaborators - Function to fetch collaborators data.
 * @property {Function} getCollaboratorsByUser - Function to fetch collaborators data by user ID.
 * @property {Function} postCollaborators - Function to add a new collaborator.
 * @property {Function} updateCollaborators - Function to update an existing collaborator.
 * @property {Function} deleteCollaborators - Function to delete a collaborator.
 */

/**
 * Creates a new instance of the CollaboratorsStore.
 * @function useCollaboratorsStore
 * @returns {CollaboratorsStore} The CollaboratorsStore instance.
 */
export const useCollaboratorsStore = defineStore('collaborators', () => {

    const state = reactive({
        collaborators: [],
        selectedCollaborator: {},
        collaboratorByUser: [],
        address: [],
        currentAdress: null,
        users: [],
        loading: false,
        error: null,
        connection: false,
      })

      const authStore = useAuthStore()
      const collaborators = computed(() => state.collaborators)
      const collaboratorByUser = computed(() => state.collaboratorByUser)
      const selectedCollaborator = computed(()=> state.selectedCollaborator)
      const isLoading = computed(() => state.loading)
      const collaboratorsCount = computed(() => state.collaborators.length)
      const successMsg = ref(false)
      const address = computed(() => state.address)
      const users = computed(()=> state.users)
      const currentAdress = computed(()=> state.currentAdress)

          /**
     * Fetches collaborators data from the server.
     * @async
     * @function getCollaborators
     */
      const getCollaborators = async () => {
        state.loading = true
        try {
          const response = await CollaboratorsService.getCollaborators()
          state.collaborators = response
        } catch (error) {
          state.error = error
        } finally {
          state.loading = false
          state.connection = true
        }
      }

      const getUsers = async () => {
        state.loading = true
        try {
          const response = await CollaboratorsService.getUsers()
          state.users = response
        } catch (error) {
          state.error = error
        } finally {
          state.loading = false
          state.connection = true
        }
      }
      
      /**
     * Fetches collaborators data filtered by user ID.
     * @async
     * @function getCollaboratorsByUser
     * @param {number} UserId - The ID of the user to filter collaborators.
     */
      const getCollaboratorsByUser = async (UserId) => {
        state.loading = true
        try {
          const response = await CollaboratorsService.getCollaboratorsByUser(UserId)
          state.collaboratorByUser = response
        } catch (error) {
          state.error = error
        } finally {
          state.loading = false
          state.connection = true
        }
      }

        const getAddress = async () => {
        state.loading = true
        try {
          const response = await CollaboratorsService.getAddress()
          state.address = response
          return response
        } catch (error) {
          state.error = error
        } finally {
          state.loading = false
          state.connection = true
        }
      }

        const getAddressById = async (id) => {
        state.loading = true
        try {
          const response = await CollaboratorsService.getAddressById(id)
          state.address = response
          return response
        } catch (error) {
          state.error = error
        } finally {
          state.loading = false
          state.connection = true
        }
      }

         /**
     * Adds a new collaborator.
     * @async
     * @function postCollaborators
     * @param {Object} newCollaborator - The new collaborator data to add.
     */
      const postCollaborators = async (datas) => {
        state.loading = true
        try {
          //console.log(newCollaborator)
          const newCollaborator = ({...datas, user: authStore.email})
          const response = await CollaboratorsService.PostCollaborators(newCollaborator)
          state.collaborators.push(response)
          successMsg.value = true
        } catch (error) {
          state.error = error
          throw error;
        } finally {
          state.loading = false
          state.connection = true
        }
      }

      const postAddress = async (data) => {
        state.loading = true
        try {
          
          const response = await CollaboratorsService.PostAddress(data)
          successMsg.value = true
          state.currentAdress = response
          return response
          
        } catch (error) {
          state.error = error
          throw error;
        } finally {
          state.loading = false
          state.connection = true
        }
      }

      /**
     * Updates an existing collaborator.
     * @async
     * @function updateCollaborators
     * @param {Object} personalDataUpdated - The collaborator data to update.
     */
      const updateCollaborators = async (personalDataUpdated) => {
        state.loading = true
        try {
          const response = await CollaboratorsService.updateCollaborators(personalDataUpdated)
          state.collaborators = response
        } catch (error) {
          state.error = error
        } finally {
          state.loading = false
          state.connection = true
        }
      }

       const updateUsers = async (usersDataUpdated) => {
        state.loading = true
        try {
          const response = await CollaboratorsService.updateUsers(usersDataUpdated)
          state.users = response
        } catch (error) {
          state.error = error
        } finally {
          state.loading = false
          state.connection = true
        }
      }
      /**
     * Deletes a collaborator.
     * @async
     * @function deleteCollaborators
     * @param {number} id - The ID of the collaborator to delete.
     */
      const deleteCollaborators = async (id) => {
        state.loading = true
        try {
          const response = await CollaboratorsService.deleteCollaborators(id)
          state.collaborators = response
        } catch (error) {
          state.error = error
        } finally {
          state.loading = false
          state.connection = true
        }
      }

         const deleteAddress = async (id) => {
        state.loading = true
        try {
          const response = await CollaboratorsService.deleteAddress(id)
          return response
        } catch (error) {
          state.error = error
        } finally {
          state.loading = false
          state.connection = true
        }
      }

      return {
        state,
        collaborators,
        collaboratorByUser,
        selectedCollaborator,
        isLoading,
        collaboratorsCount,
        successMsg,
        address,
        users,
        currentAdress,
        postAddress,
        updateUsers,
        getUsers,
        getAddress,
        getAddressById,
        getCollaborators,
        getCollaboratorsByUser,
        postCollaborators,
        updateCollaborators,
        deleteCollaborators,
        deleteAddress,
      }
})
