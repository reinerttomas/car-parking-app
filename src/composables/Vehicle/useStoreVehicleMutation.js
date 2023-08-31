import { useAxios } from '@/lib/axios'
import { useMutation } from 'vue-query'
import { useRouter } from 'vue-router'

export default () => {
  const { client } = useAxios()
  const router = useRouter()

  return useMutation({
    mutationFn: (newVehicle) => client.post('vehicles', newVehicle),
    onSuccess: () => {
      router.push({ name: 'vehicles' })
    }
  })
}
