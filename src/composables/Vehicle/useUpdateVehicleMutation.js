import { useAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from 'vue-query'

export default (id) => {
  const { client } = useAxios()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (vehicle) => client.put(`vehicles/${id.value}`, vehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles', id] })
    }
  })
}
