import { defineStore } from 'pinia'
import { reactive } from 'vue'
import client from '@/services/http'

export const useRegister = defineStore('register', () => {
  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const errors = reactive({})

  function resetForm() {
    form.name = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''

    errors.value = {}
  }

  async function handleSubmit() {
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
    }
  }

  return { form, errors, resetForm, handleSubmit }
})
