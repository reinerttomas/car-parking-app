import { useAxios } from '@/lib/axios'

export const getProfile = async () => {
  const { client } = useAxios()
  const { data } = await client.get('profile')

  return data
}

export const updateProfile = async (profile) => {
  const { client } = useAxios()
  const { data } = await client.put('profile', profile)

  return data
}

export const changePassword = async (passwords) => {
  const { client } = useAxios()
  await client.put('password', passwords)
}
