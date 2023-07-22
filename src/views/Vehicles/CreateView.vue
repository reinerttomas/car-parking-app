<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Add vehicle</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="plateNumber" class="required">License plate</label>
        <input
          v-model="vehicle.plateNumber"
          id="plateNumber"
          name="plateNumber"
          type="text"
          class="form-input plate"
          :disabled="isLoading"
        />
        <ValidationError v-if="isError" :messages="errors.value?.plateNumber" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="description" class="required">Description</label>
        <input
          v-model="vehicle.description"
          id="description"
          name="description"
          type="text"
          class="form-input"
          placeholder="My Ferrari, Big truck, Rental"
          :disabled="isLoading"
        />
        <ValidationError v-if="isError" :messages="errors.value?.description" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary w-full" :disabled="isLoading">
          <IconSpinner class="animate-spin" v-show="isLoading" />
          Save vehicle
        </button>
        <RouterLink :to="{ name: 'vehicles' }" class="btn btn-secondary">Cancel</RouterLink>
      </div>
    </div>
  </form>
</template>

<script setup>
import IconSpinner from '@/components/IconSpinner.vue'
import ValidationError from '@/components/ValidationError.vue'
import { reactive } from 'vue'
import { useMutation } from 'vue-query'
import { storeVehicle } from '@/api/vehicle'
import { useRouter } from 'vue-router'

const vehicle = reactive({
  plateNumber: '',
  description: ''
})
const errors = reactive({})

const {
  isLoading,
  isError,
  mutateAsync: storeVehicleMutate
} = useMutation((vehicle) => storeVehicle(vehicle))

const router = useRouter()

const handleSubmit = async () => {
  try {
    await storeVehicleMutate(vehicle)

    router.push({ name: 'vehicles' })
  } catch (error) {
    if (error.response.status === 422) {
      errors.value = error.response.data.errors
    }

    /**
     * TODO: add error message
     */
  }
}
</script>
