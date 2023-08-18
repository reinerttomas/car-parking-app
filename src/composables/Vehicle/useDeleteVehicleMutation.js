import { useAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from 'vue-query'

export default () => {
  const { client } = useAxios()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => client.delete(`vehicles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    }
  })
}
