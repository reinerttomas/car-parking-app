<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Parking history</h1>

    <div class="flex flex-col gap-1">
      <div v-for="parking in parkings" :key="parking.id" class="flex flex-col p-2 border gap-1">
        <div class="plate text-2xl">{{ parking.vehicle.plateNumber }}</div>
        <div class="bg-gray-100 p-2">
          {{ parking.zone.name }}
          ({{ (parking.zone.pricePerHour / 100).toFixed(2) }} &euro;/h)
        </div>
        <div>
          <div class="font-bold uppercase">from</div>
          <span class="font-mono">{{ parking.startAt }}</span>
        </div>
        <div>
          <div class="font-bold uppercase">to</div>
          <span class="font-mono">{{ parking.stopAt }}</span>
        </div>
        <div class="flex items-top">
          <span class="text-2xl font-bold ml-auto">{{
            (parking.totalPrice / 100).toFixed(2)
          }}</span>
          <span class="pt-0.5">&nbsp;&euro;</span>
        </div>
        <RouterLink
          :to="{ name: 'parkings-detail', params: { id: parking.id } }"
          class="btn btn-secondary uppercase"
        >
          view details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import useParkingsHistoryQuery from '@/composables/Parking/useParkingsHistoryQuery'

const { data: parkings } = useParkingsHistoryQuery()
</script>
