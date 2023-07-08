import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const useAxios = () => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  })

  client.interceptors.request.use((config) => {
    const { getAccessToken } = useAuthStore()
    const accessToken = getAccessToken()

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  })

  client.interceptors.response.use((error) => {
    if (error.response) {
      const { destroyAccessToken } = useAuthStore()

      if (error.response?.status === 401) {
        destroyAccessToken()
      }
    }

    return Promise.resolve(error)
  })

  return { client }
}
