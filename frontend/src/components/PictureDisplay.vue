<template>
  <v-img :src="imageUrl" class="rounded-lg" height="300px" contain />
</template>

<script setup>
defineProps({
  imageUrl: String
})
</script>