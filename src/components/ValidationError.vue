<template>
  <ul v-if="props?.messages?.length" class="flex flex-col text-red-600 gap-1">
    <li v-for="message in props.messages" :key="message">
      {{ message }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  messages: Array
})
</script>
