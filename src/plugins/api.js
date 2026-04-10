import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error),
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error?.config
        const status = error?.response?.status

        if (!originalRequest || status !== 401 || originalRequest._retry) {
            return Promise.reject(error)
        }

        const isAuthRoute =
            originalRequest.url?.includes('/token/') ||
            originalRequest.url?.includes('/token/refresh/')

        if (isAuthRoute) {
            return Promise.reject(error)
        }

        const refresh = localStorage.getItem('refresh_token')

        if (!refresh) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('verified_user')
            window.location.href = '/login'
            return Promise.reject(error)
        }

        originalRequest._retry = true

        try {
            const { data } = await axios.post(`${apiUrl}/token/refresh/`, { refresh })
            localStorage.setItem('access_token', data.access)
            originalRequest.headers.Authorization = `Bearer ${data.access}`
            return api(originalRequest)
        } catch (refreshError) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('verified_user')
            window.location.href = '/login'
            return Promise.reject(refreshError)
        }
    },
)

export default api;