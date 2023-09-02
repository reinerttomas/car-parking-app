<template>
  <div class="flex flex-col mx-auto md:w-96 w-full" v-if="isSuccess">
    <h1 class="text-2xl font-bold mb-4 text-center">Parking order details</h1>

    <div class="border p-2 font-mono">
      <div class="font-bold uppercase mb-4">parking order #{{ parking.id }}</div>

      <div class="font-bold uppercase">license plate</div>
      <div class="plate text-2xl">{{ parking.vehicle.plateNumber }}</div>

      <div class="font-bold uppercase">description</div>
      <div>{{ parking.vehicle.description }}</div>

      <div class="font-bold uppercase">zone</div>
      <div>{{ parking.zone.name }}</div>

      <div class="font-bold uppercase">price</div>
      <div>{{ (parking.zone.pricePerHour / 100).toFixed(2) }} &euro; per hour</div>

      <div class="font-bold uppercase">from</div>
      <div>{{ parking.startAt }}</div>

      <div class="font-bold uppercase">to</div>
      <div>{{ parking.stopAt }}</div>

      <div class="font-bold uppercase">total</div>
      <div class="text-xl">{{ (parking.totalPrice / 100).toFixed(2) }} &euro;</div>
    </div>

    <div class="border-t h-[1px] my-6"></div>

    <RouterLink :to="{ name: 'parkings-history' }" class="btn btn-secondary uppercase">
      return
    </RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import useParkingQuery from '@/composables/Parking/useParkingQuery'

const route = useRoute()
const { isSuccess, data: parking } = useParkingQuery({ id: route.params.id })
</script>
