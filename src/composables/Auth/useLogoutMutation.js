import { useAxios } from '@/lib/axios'
import { useMutation } from 'vue-query'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default () => {
  const { client } = useAxios()
  const { destroyAccessToken } = useAuthStore()
  const router = useRouter()

  return useMutation(() => client.post('auth/logout'), {
    onSettled: () => {
      destroyAccessToken()
      router.push({ name: 'login' })
    }
  })
}
