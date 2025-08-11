<template>
  <v-card class="pa-4 mt-4" elevation="2">
    <v-card-text>{{ text }}</v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  text: String
})
</script>