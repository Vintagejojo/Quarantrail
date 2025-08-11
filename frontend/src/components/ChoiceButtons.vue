<template>
  <v-row justify="center" class="mt-4">
    <v-btn
      v-for="(choice, index) in choices"
      :key="index"
      class="ma-2"
      color="primary"
      @click="selectChoice(choice.id)"
    >
      {{ choice.text }}
    </v-btn>
  </v-row>
</template>

<script setup>
defineProps({
  choices: Array
})

const emit = defineEmits(['choiceSelected'])

function selectChoice(id) {
  emit('choiceSelected', id)
}
</script>