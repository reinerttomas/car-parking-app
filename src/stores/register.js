import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import client from '@/services/http'

export const useRegister = defineStore('register', () => {
  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const errors = reactive({})
  const loading = ref(false)

  function resetForm() {
    form.name = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''

    errors.value = {}
  }

  async function handleSubmit() {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    try {
      const response = await client.post('auth/register', form)
      console.log(response.data)
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    } finally {
      form.password = ''
      form.password_confirmation = ''
      loading.value = false
    }
  }

  return { form, errors, loading, resetForm, handleSubmit }
})
