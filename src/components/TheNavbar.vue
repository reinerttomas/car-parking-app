<template>
  <nav class="flex gap-4 justify-between">
    <div class="flex gap-4 items-center">
      <h2 class="text-xl font-bold">
        <div
          class="inline-flex items-center justify-center bg-blue-600 w-6 h-6 text-center text-white rounded"
        >
          P
        </div>
        myParking
      </h2>
      <RouterLink class="router-link" :to="{ name: 'home' }"> Home </RouterLink>
    </div>
    <div class="flex gap-4 items-center">
      <template v-if="isAuthenticated">
        <RouterLink class="router-link" :to="{ name: 'profile' }">Profile</RouterLink>
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
import { RouterLink, useRouter } from 'vue-router'
import { useMutation } from 'vue-query'
import { storeToRefs } from 'pinia'
import { logout } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { isAuthenticated } = storeToRefs(useAuthStore())
const { destroyAccessToken } = useAuthStore()
const { mutateAsync: logoutMutate } = useMutation(() => logout())

const handleLogout = async () => {
  try {
    await logoutMutate()

    destroyAccessToken()
    router.push({ name: 'login' })
  } catch (error) {
    console.error(error)
  }
}
</script>
