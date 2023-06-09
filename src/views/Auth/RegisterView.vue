<template>
  <form @submit.prevent="handleRegister" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">Name</label>
        <input
          v-model="name"
          id="name"
          name="name"
          type="text"
          class="form-input"
          autocomplete="name"
          required
        />
        <ValidationError v-if="isError" :messages="errors.value?.name" field="name" />
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-input"
          autocomplete="email"
          required
        />
        <ValidationError v-if="isError" :messages="errors.value?.email" field="email" />
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">Password</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-input"
          autocomplete="new-password"
          required
        />
        <ValidationError v-if="isError" :messages="errors.value?.password" field="password" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="password_confirmation" class="required">Confirm password</label>
        <input
          v-model="passwordConfirmation"
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          class="form-input"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <IconSpinner v-show="isLoading" />
          Register
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import IconSpinner from '@/components/IconSpinner.vue'
import ValidationError from '@/components/ValidationError.vue'
import { reactive, ref } from 'vue'
import { useMutation } from 'vue-query'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const errors = reactive({})

const {
  isLoading,
  isError,
  mutateAsync: registerMutate
} = useMutation((newUser) => register(newUser))

const handleRegister = async () => {
  const { setAccessToken } = useAuthStore()

  try {
    const { accessToken } = await registerMutate({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    })

    setAccessToken(accessToken)
    router.push({ name: 'vehicles' })
  } catch (error) {
    if (error.response.data.errors) {
      errors.value = error.response.data.errors
    }
  } finally {
    password.value = ''
    passwordConfirmation.value = ''
  }
}
</script>
