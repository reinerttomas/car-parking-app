import axios, { isAxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const useAxios = () => {
  const router = useRouter()

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

  client.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      if (isAxiosError(error)) {
        const { destroyAccessToken } = useAuthStore()

        if (error.response.status === 401) {
          destroyAccessToken()
          router.push({ name: 'login' })
        }

        if (error.response.status === 404) {
          router.push({ name: 'not-found' })
        }
      }

      return Promise.reject(error)
    }
  )

  return { client }
}
