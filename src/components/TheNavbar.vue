<template>
  <nav class="flex gap-4 justify-between">
    <div class="flex gap-4 items-center">
      <RouterLink :to="{ name: 'home' }">
        <h2 class="text-xl font-bold">
          <div
            class="inline-flex items-center justify-center bg-blue-600 w-6 h-6 text-center text-white rounded"
          >
            P
          </div>
          myParking
        </h2>
      </RouterLink>
      <template v-if="isAuthenticated"
        ><RouterLink class="router-link" :to="{ name: 'vehicles' }">Vehicles</RouterLink>
      </template>
    </div>
    <div class="flex gap-4 items-center">
      <template v-if="isAuthenticated">
        <RouterLink class="router-link" :to="{ name: 'profile' }">Profile</RouterLink>
        <RouterLink class="router-link" :to="{ name: 'change-password' }"
          >Change Password</RouterLink
        >
        <button @click="handleLogout" class="router-link">Logout</button>
      </template>
      <template v-else>
        <RouterLink class="router-link" :to="{ name: 'login' }">Login</RouterLink>
        <RouterLink class="router-link" :to="{ name: 'register' }">Register</RouterLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import useLogoutMutation from '@/composables/Auth/useLogoutMutation'

const { isAuthenticated } = storeToRefs(useAuthStore())
const { mutateAsync } = useLogoutMutation()

const handleLogout = async () => {
  try {
    await mutateAsync()
  } catch (error) {
    console.error(error)
  }
}
</script>
