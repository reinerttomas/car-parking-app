import { useAxios } from '@/lib/axios'
import { useMutation } from 'vue-query'

export default () => {
  const { client } = useAxios()

  return useMutation({
    mutationFn: (passwords) => client.put('password', passwords)
  })
}
