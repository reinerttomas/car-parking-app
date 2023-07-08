import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = useStorage('accessToken', '')
  const isAuthenticated = computed(() => !!accessToken.value)

  function getAccessToken() {
    return accessToken.value
  }

  function setAccessToken(value) {
    accessToken.value = value
  }

  function destroyAccessToken() {
    accessToken.value = ''
  }

  return {
    isAuthenticated,
    getAccessToken,
    setAccessToken,
    destroyAccessToken
  }
})
