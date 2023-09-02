import { useAxios } from '@/lib/axios'
import { useQuery } from 'vue-query'

export default (parking) => {
  const { client } = useAxios()

  return useQuery({
    queryKey: 'parking',
    queryFn: async () => await client.get(`parkings/${parking.id}`),
    select: (response) => response.data
  })
}
