import { useAxios } from '@/lib/axios'
import { useQuery } from 'vue-query'

export default () => {
  const { client } = useAxios()

  return useQuery({
    queryKey: 'parkings-history',
    queryFn: async () => await client.get('parkings/history'),
    select: (response) => response.data.data
  })
}
