<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit profile</h1>
      <div class="alert alert-success mb-4" v-show="isSuccess">Profile has been updated.</div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-input"
          v-model="data.name"
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
          v-model="data.email"
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
import { onMounted, reactive } from 'vue'
import { useMutation } from 'vue-query'
import { getProfile, updateProfile } from '@/api/profile'

const data = reactive({
  name: '',
  email: ''
})
const errors = reactive({})

const fetcher = async () => {
  try {
    const { name, email } = await getProfile()

    data.name = name
    data.email = email
  } catch (error) {
    console.error(error)
    /**
     * TODO: add error message
     */
  }
}

const {
  isLoading,
  isSuccess,
  isError,
  mutateAsync: updateMutate
} = useMutation((data) => updateProfile(data))

const handleSubmit = async () => {
  try {
    const { name, email } = await updateMutate(data)

    data.name = name
    data.email = email
  } catch (error) {
    if (error.response.data.errors) {
      errors.value = error.response.data.errors
    }
    /**
     * TODO: add error message
     */
  }
}

onMounted(fetcher)
</script>
