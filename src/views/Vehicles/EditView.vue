<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit vehicle</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="plate_number" class="required">License plate</label>
        <input
          v-model="form.plateNumber"
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
          v-model="form.description"
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
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useVehicleQuery from '@/composables/Vehicle/useVehicleQuery'
import useUpdateVehicleMutation from '@/composables/Vehicle/useUpdateVehicleMutation'
import { isAxiosError } from 'axios'

const route = useRoute()
const id = ref(route.params.id)
const form = reactive({
  plateNumber: '',
  description: ''
})
const errors = reactive({})

const { data: vehicle } = useVehicleQuery(id)

watch(vehicle, () => {
  if (vehicle.value) {
    const { plateNumber, description } = vehicle.value
    form.plateNumber = plateNumber
    form.description = description
  }
})

const { isLoading, isError, mutateAsync: updateVehicle } = useUpdateVehicleMutation(id)

const handleSubmit = async () => {
  try {
    await updateVehicle(form)
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }
}
</script>
