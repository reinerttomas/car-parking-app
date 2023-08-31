import { useAxios } from '@/lib/axios'
import { useMutation } from 'vue-query'
import { useRouter } from 'vue-router'

export default () => {
  const { client } = useAxios()
  const router = useRouter()

  return useMutation((parking) => client.post('parkings/start', parking), {
    onSuccess: () => {
      router.push({ name: 'parkings-active' })
    }
  })
}
