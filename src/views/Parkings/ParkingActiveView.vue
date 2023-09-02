<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Active parkings</h1>

    <RouterLink :to="{ name: 'parkings-create' }" class="btn btn-primary w-full">
      Order parking
    </RouterLink>

    <div class="border-t h-[1px] my-6"></div>

    <div class="flex flex-col gap-1">
      <div v-for="parking in parkings" :key="parking.id" class="flex flex-col p-2 border gap-1">
        <div class="plate text-2xl">{{ parking.vehicle.plateNumber }}</div>
        <div class="text-sm text-gray-600">
          {{ parking.vehicle.description }}
        </div>
        <div class="bg-gray-100 p-2">
          {{ parking.zone.name }}
          ({{ (parking.zone.pricePerHour / 100).toFixed(2) }} &euro;/h)
        </div>
        <div>
          <div class="font-bold uppercase">from</div>
          <span class="font-mono">{{ parking.startAt }}</span>
        </div>
        <div class="flex items-top">
          <span class="text-2xl font-bold text-blue-600">
            {{ (parking.totalPrice / 100).toFixed(2) }}
          </span>
          <span class="pt-0.5">&nbsp;&euro;</span>
        </div>
        <button
          type="button"
          @click="handleStopParking(parking)"
          class="btn btn-danger uppercase ml-auto"
        >
          stop
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import useActiveParkingsQuery from '@/composables/Parking/useActiveParkingsQuery'
import useStopParkingMutation from '@/composables/Parking/useStopParkingMutation'

const { data: parkings } = useActiveParkingsQuery()
const { mutateAsync: stopParking } = useStopParkingMutation()

const handleStopParking = async (parking) => {
  try {
    await stopParking(parking)
  } catch (error) {
    console.error(error)
  }
}
</script>
