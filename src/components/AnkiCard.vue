<script lang="ts" setup>
import WanikaniCardBasic from "./card-templates/WanikaniCardBasic.vue";

defineProps<{
  subject: {
    type: object,
    required: true
  }
}>()
</script>

<template>
  <v-card
      class="pa-4 mx-2"
      height="fit-content"
      max-width="450px"
      min-width="200px"
  >
    <WanikaniCardBasic :subject="subject"/>
  </v-card>
</template>