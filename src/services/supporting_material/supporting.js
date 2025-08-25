import api from "@/plugins/api";
const token = localStorage.getItem('psg_auth_token')

/**
 * Service class for handling Material related operations.
 */
class SupportingMaterialService {

  async getMaterials(page = "") {
    try {
      const { data } = await api.get(`/supporting-material/?page=${page}`)
      return data
    } catch (error) {
      console.log('error in getMaterials', error)
      throw error
    }
  }

  async getMaterialsById(id) {
    try {
      const { data } = await api.get(`/supporting-material/${id}/`)
      return data
    } catch (error) {
      console.log('error in getMaterial by id', error)
      throw error
    }
  }

  async getMaterialsBySystem(systemId) {
    try {
      const { data } = await api.get(`/supporting-material/?system_id=${systemId}`)
      return data.results
    } catch (error) {
      console.log('error in getMaterialsBySystem', error)
      throw error
    }
  }

  async getMaterialsById(id) {
    try {
      const { data } = await api.get(`/supporting-material/${id}/`)
      return data
    } catch (error) {
      console.log('error in getMaterialsById', error)
      throw error
    }
  }

  async SearchMaterialsByName(name, system_id) {
    try {
      const { data } = await api.get(`/supporting-material/?search=${name}&system_id=${system_id}`)
      return data.results
    } catch (error) {
      console.log('error in SearchMaterialsByName', error)
      throw error
    }
  }

  async createMaterial(newMaterial) {
    try {
      const { data } = await api.post(`/supporting-material/`, newMaterial, {
        headers: { authorization: `Bearer ${token}` }
      })
      return data.results
    } catch (error) {
      console.log('error in createMaterial', error)
      throw error
    }
  }

  async updateMaterials(material) {
    try {
      const { data } = await api.put(`/supporting-material/${material.id}/`, material, {
        headers: { authorization: `Bearer ${token}` }
      })
      return data.results
    } catch (error) {
      console.log('error in updateMaterials', error)
      throw error
    }
  }

  async deleteMaterials(id) {
    try {
      const { data } = await api.delete(`/supporting-material/${id}/`, {
        headers: { authorization: `Bearer ${token}` }
      })
      return data.results
    } catch (error) {
      console.log('error in deleteMaterials', error)
      throw error
    }
  }
}

export default new SupportingMaterialService()
