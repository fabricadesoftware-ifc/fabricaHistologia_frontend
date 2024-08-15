import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('psg_auth_token');
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api;