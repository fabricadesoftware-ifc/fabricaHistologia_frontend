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
            const { data } = await api.get('/personal')
            return data.results
        } catch (error) {
            console.log('error in getCollaborators', error)
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

     async getAddressById(id) {
        try {
            const { data } = await api.get(`/address/${id}`, {headers: {'authorization': `Bearer ${token}`}})
            return data.results
        } catch (error) {
            console.log('error in getAddressById', error)
            throw error
        }
    }

    async getCollaboratorsByUser(UserId) {
        try {
            const { data } = await api.get(`/personal/?user_id=${UserId}`)
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
            return data.results
        } catch (error) {
            console.log('error in PostAddress', error)
            throw error
        }
    }

    async updateCollaborators(personalData) {
        try {
            const { data } = await api.put(`/personal/${personalData.id}`, personalData)
            return data.results
        } catch (error) {
            console.log('error in getCollaborators', error)
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
}

export default new CollaboratorsService()