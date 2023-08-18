import { useAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from 'vue-query'

export default () => {
  const { client } = useAxios()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user) => client.put('profile', user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}
