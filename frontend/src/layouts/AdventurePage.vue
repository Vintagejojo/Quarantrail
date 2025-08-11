<template>
  <v-container>
    <PictureDisplay :imageUrl="currentNode.image" />
    <NarrativeText :text="currentNode.text" />
    <ChoiceButtons :choices="currentNode.choices" @choiceSelected="handleChoice" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import PictureDisplay from '@/components/PictureDisplay.vue'
import NarrativeText from '@/components/NarrativeText.vue'
import ChoiceButtons from '@/components/ChoiceButtons.vue'

// Initial node (could be fetched from backend later)
const currentNode = ref({
  image: '/images/forest.jpg',
  text: 'You stand at the edge of a dark forest. What do you do?',
  choices: [
    { id: 'enter_forest', text: 'Enter the forest' },
    { id: 'walk_away', text: 'Walk away' }
  ]
})

function handleChoice(choiceId) {
  // Replace with actual logic to fetch next node
  console.log('Selected:', choiceId)
  currentNode.value = {
    image: '/images/deeper.jpg',
    text: 'You venture deeper into the woods...',
    choices: [
      { id: 'follow_path', text: 'Follow the path' },
      { id: 'explore_ruins', text: 'Explore the ruins' }
    ]
  }
}
</script>