import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

class AuthService {
  async getUser(token) {
    const response = await axios.get(apiUrl + '/users/me', {
      headers: {
        'authorization': `Bearer ${token}`,
      },
    });
    return response.data; 
  }
}

export default new AuthService()

