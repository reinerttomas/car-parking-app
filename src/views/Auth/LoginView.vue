<template>
  <form @submit.prevent="handleLogin" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input
          v-model="form.email"
          id="email"
          name="email"
          type="text"
          class="form-input"
          autofocus
          autocomplete="email"
          required
          :disabled="isLoading"
        />
        <ValidationError v-if="isError" :messages="errors.value?.email" />
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">Password</label>
        <input
          v-model="form.password"
          id="password"
          name="password"
          type="password"
          class="p-1 border bg-gray-100"
          autocomplete="current-password"
          required
          :disabled="isLoading"
        />
        <ValidationError v-if="isError" :messages="errors.value?.password" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <IconSpinner v-show="isLoading" />
          Login
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import IconSpinner from '@/components/IconSpinner.vue'
import ValidationError from '@/components/ValidationError.vue'
import { reactive } from 'vue'
import useLoginMutation from '@/composables/Auth/useLoginMutation'
import { isAxiosError } from 'axios'

const form = reactive({
  email: '',
  password: ''
})
const errors = reactive({})

const { isLoading, isError, mutateAsync: login } = useLoginMutation()

const handleLogin = async () => {
  try {
    await login(form)
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  } finally {
    form.password = ''
  }
}
</script>
