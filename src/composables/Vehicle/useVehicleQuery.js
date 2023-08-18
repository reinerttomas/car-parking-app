import { useAxios } from '@/lib/axios'
import { useQuery } from 'vue-query'

export default (id) => {
  const { client } = useAxios()

  return useQuery({
    queryKey: ['vehicles', id],
    queryFn: async () => await client.get(`vehicles/${id.value}`),
    select: (response) => response.data
  })
}
