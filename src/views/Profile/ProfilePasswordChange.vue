<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Change password</h1>
      <div class="alert alert-success mb-4" v-show="isSuccess">Password has been updated.</div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="current_password" class="required">Current password</label>
        <input
          type="password"
          name="current_password"
          id="current_password"
          class="form-input"
          v-model="form.current_password"
          :disabled="isLoading"
        />
        <ValidationError v-if="isError" :messages="errors.value?.current_password" />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">New password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="form-input"
          v-model="form.password"
          :disabled="isLoading"
        />
        <ValidationError v-if="isError" :messages="errors.value?.password" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password_confirmation" class="required">Confirm new password</label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          class="form-input"
          v-model="form.password_confirmation"
          :disabled="isLoading"
        />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <IconSpinner class="animate-spin" v-show="isLoading" />
        Update password
      </button>
    </div>
  </form>
</template>

<script setup>
import IconSpinner from '@/components/IconSpinner.vue'
import ValidationError from '@/components/ValidationError.vue'
import { reactive } from 'vue'
import { isAxiosError } from 'axios'
import usePasswordMutation from '@/composables/Profile/usePasswordMutation'

const form = reactive({
  current_password: '',
  password: '',
  password_confirmation: ''
})
const errors = reactive({})

const { isLoading, isSuccess, isError, mutateAsync: changePassword } = usePasswordMutation()

const handleSubmit = async () => {
  try {
    await changePassword(form)
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  } finally {
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''
  }
}
</script>
