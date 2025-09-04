import api from '../../plugins/api'

const token = localStorage.getItem('psg_auth_token')

class CollaboratorsService{
    /**
     * Retrieves all Collaborators personal data.
     * @returns {Promise<Array>} A promise that resolves to an array of personal data.
     * @throws {Error} If an error occurs while retrieving the Collaborators.
     */

    async getCollaborators() {
        try {
            const { data } = await api.get('/personal', {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getCollaborators', error)
            throw error
        }
    }

    async getCollaboratorsBySearch(search) {
        try {
            const { data } = await api.get(`/personal/?user=${search}`, {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getCollaboratorsBySearch', error)
            throw error
        }
    }

    async getUsers() {
        try {
            const { data } = await api.get('/users', {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getUsers', error)
            throw error
        }
    }

        async getUsersBySearch(search) {
        try {
            const { data } = await api.get(`/users/?email=${search}`, {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getUsersBySearch', error)
            throw error
        }
    }

      async getAddress() {
        try {
            const { data } = await api.get('/address', {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getAddress', error)
            throw error
        }
    }

      async getAddressBySearch(search) {
        try {
            const { data } = await api.get(`/address/?city=${search}`, {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getAddressBySearch', error)
            throw error
        }
    }

     async getAddressById(id) {
        try {
            const { data } = await api.get(`/address/${id}`, {headers: {'authorization': `Bearer ${token}`}})
            return data
        } catch (error) {
            console.log('error in getAddressById', error)
            throw error
        }
    }

    async getCollaboratorsByUser(UserId) {
        try {
            const { data } = await api.get(`/personal/?user_id=${UserId}`,{headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getCollaborators', error)
            throw error
        }
    }

    async PostCollaborators(newData) {
        try {
            const { data } = await api.post('/personal/', newData, {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getCollaborators', error)
            throw error
        }
    }

     async PostAddress(newData) {
        try {
            const { data } = await api.post('/address/', newData, {headers: {'authorization': `Bearer ${token}`}})
            console.log(data)
            return data
        } catch (error) {
            console.log('error in PostAddress', error)
            throw error
        }
    }

    async updateCollaborators(personalData) {
        try {
            const { data } = await api.put(`/personal/${personalData.id}`, personalData, {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getCollaborators', error)
            throw error
        }
    }

    async updateUsers(users) {
        try {
            const { data } = await api.put(`/users/${users.id}`, users, {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in updateUsers', error)
            throw error
        }
    }

    async deleteCollaborators(id) {
        try {
            const { data } = await api.delete(`/personal/${id}/`)
            return data.results
        } catch (error) {
            console.log('error in getCollaborators', error)
            throw error
        }
    }

    async deleteAddress(id) {
        try {
            const { data } = await api.delete(`/address/${id}/`, {headers: {'authorization': `Bearer ${token}`}})
            return data
        } catch (error) {
            console.log('error in getAddress', error)
            throw error
        }
    }
}

export default new CollaboratorsService()