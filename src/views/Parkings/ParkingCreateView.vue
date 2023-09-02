<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Order parking</h1>

      <div class="flex flex-col gap-2 mb-4">
        <label for="vehicle" class="required">Vehicle</label>
        <select
          v-model="parking.vehicleId"
          name="vehicle"
          id="vehicle"
          class="form-input"
          :disabled="isLoading"
        >
          <option v-for="vehicle in vehicles" :value="vehicle.id" :key="vehicle.id">
            {{ vehicle.plateNumber.toUpperCase() }}
            <span v-if="vehicle.description">({{ vehicle.description }})</span>
          </option>
        </select>
        <ValidationError v-if="isError" :messages="errors.value?.vehicleId" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="zone" class="required">Zone</label>
        <select
          v-model="parking.zoneId"
          name="zone"
          id="zone"
          class="form-input"
          :disabled="isLoading"
        >
          <option v-for="zone in zones" :value="zone.id" :key="zone.id">
            {{ zone.name }}
            ({{ (zone.pricePerHour / 100).toFixed(2) }} &euro;/h)
          </option>
        </select>
        <ValidationError v-if="isError" :messages="errors.value?.zoneId" />
        <ValidationError v-if="isError" :messages="errors.value?.general" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button type="submit" class="btn btn-primary w-full" :disabled="false">
          <IconSpinner class="animate-spin" v-show="isLoading" />
          Start parking
        </button>
        <RouterLink :to="{ name: 'parkings-active' }" v-slot="{ navigate }">
          <button @click="navigate" :disabled="isLoading" class="btn btn-secondary">Cancel</button>
        </RouterLink>
      </div>
    </div>
  </form>
</template>

<script setup>
import ValidationError from '@/components/ValidationError.vue'
import IconSpinner from '@/components/IconSpinner.vue'
import { reactive, watch } from 'vue'
import useVehiclesQuery from '@/composables/Vehicle/useVehiclesQuery'
import useZonesQuery from '@/composables/Zone/useZonesQuery'
import useStartParkingMutation from '@/composables/Parking/useStartParkingMutation'
import { isAxiosError } from 'axios'

const { data: vehicles } = useVehiclesQuery()
const { data: zones } = useZonesQuery()

const parking = reactive({
  vehicleId: null,
  zoneId: null
})
const errors = reactive({})

watch(vehicles, () => {
  if (vehicles.value) {
    parking.vehicleId = vehicles.value[0].id
  }
})

watch(zones, () => {
  if (zones.value) {
    parking.zoneId = zones.value[0].id
  }
})

const { isLoading, isError, mutateAsync: startParking } = useStartParkingMutation()

const handleSubmit = async () => {
  try {
    await startParking(parking)
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }
}
</script>
