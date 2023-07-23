import { useAxios } from '@/lib/axios'

export const getVehicle = async (id) => {
  const { client } = useAxios()
  const { data } = await client.get(`vehicles/${id}`)

  return data
}

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

export const updateVehicle = async (id, vehicle) => {
  const { client } = useAxios()
  const { data } = await client.put(`vehicles/${id}`, vehicle)

  return data
}
