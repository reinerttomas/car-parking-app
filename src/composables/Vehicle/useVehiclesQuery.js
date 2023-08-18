import { useAxios } from '@/lib/axios'
import { useQuery } from 'vue-query'

export default () => {
  const { client } = useAxios()

  return useQuery({
    queryKey: 'vehicles',
    queryFn: async () => await client.get('vehicles'),
    select: (response) => response.data
  })
}
