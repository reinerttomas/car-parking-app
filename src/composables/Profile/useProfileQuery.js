import { useAxios } from '@/lib/axios'
import { useQuery } from 'vue-query'

export default () => {
  const { client } = useAxios()

  return useQuery({
    queryKey: 'profile',
    queryFn: async () => await client.get('profile'),
    select: (response) => response.data
  })
}
