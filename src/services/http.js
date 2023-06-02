import axios from 'axios'

// Print Every Request to the Console
axios.interceptors.request.use((req) => {
  console.log(`${req.method} ${req.url}`)
  return req
})

// Print Every Response to the Console
axios.interceptors.response.use((res) => {
  console.log(res.data.json)
  return res
})

// axios.interceptors.request.use((req) => {
//   req.headers.authorization = 'my secret token'
//   return req
// })

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})
