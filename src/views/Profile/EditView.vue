<template>
  <form v-if="isSuccess" @submit.prevent="handleSubmit">
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit profile</h1>
      <div class="alert alert-success mb-4" v-show="isSuccessMutation">
        Profile has been updated.
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-input"
          v-model="user.name"
          :disabled="isLoading"
        />
        <ValidationError v-if="isError" :messages="errors.value?.name" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email" class="required">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-input"
          v-model="user.email"
          :disabled="isLoading"
        />
        <ValidationError v-if="isError" :messages="errors.value?.email" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <IconSpinner class="animate-spin" v-show="isLoading" />
        Update profile
      </button>
    </div>
  </form>
</template>

<script setup>
import IconSpinner from '@/components/IconSpinner.vue'
import ValidationError from '@/components/ValidationError.vue'
import { reactive, watchEffect } from 'vue'
import useProfileQuery from '@/composables/Profile/useProfileQuery'
import useProfileMutation from '@/composables/Profile/useProfileMutation'
import { isAxiosError } from 'axios'

const user = reactive({
  name: '',
  email: ''
})
const errors = reactive({})

const { isSuccess, data } = useProfileQuery()

watchEffect(() => {
  if (data.value) {
    const { name, email } = data.value
    user.name = name
    user.email = email
  }
})

const {
  isLoading,
  isSuccess: isSuccessMutation,
  isError,
  mutateAsync: updateProfile
} = useProfileMutation()

const handleSubmit = async () => {
  try {
    await updateProfile(user)
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response.data.errors) {
        errors.value = error.response.data.errors
      }
    }
  }
}
</script>
