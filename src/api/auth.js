import { useAxios } from '@/lib/axios'

export const login = async (credentials) => {
  const { client } = useAxios()
  const { data } = await client.post('auth/login', credentials)

  return data
}

export const logout = async () => {
  const { client } = useAxios()
  await client.post('auth/logout')
}

export const register = async (newUser) => {
  const { client } = useAxios()
  const { data } = await client.post('auth/register', newUser)

  return data
}
