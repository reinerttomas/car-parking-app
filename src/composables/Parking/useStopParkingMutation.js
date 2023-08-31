import { useAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from 'vue-query'

export default () => {
  const { client } = useAxios()
  const queryClient = useQueryClient()

  return useMutation((parking) => client.put(`parkings/${parking.id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'parkings' })
    }
  })
}
