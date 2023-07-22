import { useAxios } from '@/lib/axios'

export const getVehicles = async () => {
  const { client } = useAxios()
  const { data } = await client.get('vehicles')

  return data
}

export const storeVehicle = async (vehicle) => {
  const { client } = useAxios()
  const { data } = await client.post('vehicles', vehicle)

  return data
}
