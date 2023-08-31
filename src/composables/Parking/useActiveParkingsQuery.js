import { useAxios } from '@/lib/axios'
import { useQuery } from 'vue-query'

export default () => {
  const { client } = useAxios()

  return useQuery({
    queryKey: 'parkings',
    queryFn: async () => await client.get('parkings'),
    select: (response) => response.data.data,
    refetchInterval: 5000
  })
}
