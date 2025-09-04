import axios from 'axios';
const authToken = localStorage.getItem('psg_auth_token');
const apiUrl = import.meta.env.VITE_API_URL;

class AuthService {
  async getUser(token) {
    const response = await axios.get(apiUrl + '/users/me/', {headers: {'authorization': `Bearer ${token}`}});
    return response.data; 
  }

   async getUsers() {
    const response = await axios.get(apiUrl + '/users/', {headers: {'authorization': `Bearer ${authToken}`}});
    return response.results; 
  }
}


export default new AuthService()

