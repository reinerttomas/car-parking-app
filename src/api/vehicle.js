import { useAxios } from '@/lib/axios'

export const storeVehicle = async (vehicle) => {
  const { client } = useAxios()
  const { data } = await client.post('vehicles', vehicle)

  return data
}
