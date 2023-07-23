<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit vehicle</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="plate_number" class="required">License plate</label>
        <input
          v-model="vehicle.plateNumber"
          id="plate_number"
          name="plate_number"
          type="text"
          class="form-input plate"
          :disabled="isLoading"
        />
        <ValidationError v-if="isError" :messages="errors.value?.plateNumber" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="description">Description</label>
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
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <IconSpinner class="animate-spin" v-show="isLoading" />
          Update vehicle
        </button>
        <RouterLink :to="{ name: 'vehicles' }" class="btn btn-secondary">Cancel</RouterLink>
      </div>
    </div>
  </form>
</template>

<script setup>
import IconSpinner from '@/components/IconSpinner.vue'
import ValidationError from '@/components/ValidationError.vue'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVehicle, updateVehicle } from '@/api/vehicle'
import { useMutation } from 'vue-query'

const route = useRoute()
const router = useRouter()
const vehicle = reactive({
  plateNumber: '',
  description: ''
})
const errors = reactive({})

const fetcher = async () => {
  try {
    const { plateNumber, description } = await getVehicle(route.params.id)

    vehicle.plateNumber = plateNumber
    vehicle.description = description
  } catch (error) {
    if (error.response.status === 404) {
        router.push({name: 'not-found'})
    }

    console.error(error)
    /**
     * TODO: add error message
     */
  }
}

const {
  isLoading,
  isError,
  mutateAsync: updateMutate
} = useMutation((vehicle) => updateVehicle(route.params.id, vehicle))

const handleSubmit = async () => {
  try {
    const { plateNumber, description } = await updateMutate(vehicle)

    vehicle.plateNumber = plateNumber
    vehicle.description = description
  } catch (error) {
    if (error.response.status === 422) {
      errors.value = error.response.data.errors
    }

    /**
     * TODO: add error message
     */
  }
}

onMounted(fetcher)
</script>
