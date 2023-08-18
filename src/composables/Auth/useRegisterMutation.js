import { useAxios } from '@/lib/axios'
import { useMutation } from 'vue-query'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default () => {
  const { client } = useAxios()
  const { setAccessToken } = useAuthStore()
  const router = useRouter()

  return useMutation((newUser) => client.post('auth/register', newUser), {
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken)
      router.push({ name: 'vehicles' })
    }
  })
}
