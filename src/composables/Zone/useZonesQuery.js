import { useAxios } from '@/lib/axios'
import { useQuery } from 'vue-query'

export default () => {
  const { client } = useAxios()

  return useQuery({
    queryKey: 'zones',
    queryFn: async () => await client.get('zones'),
    select: (response) => response.data.data
  })
}
