<script lang="ts" setup>
import WanikaniCardBasic from "./card-templates/WanikaniCardBasic.vue";
import AnkiCardDialog from "./AnkiCardDialog.vue";
import WanikaniCardBasicMD from "../data/templates-markdown/WanikaniCardBasicMD.ts";

const props = defineProps<{
  subject: object
}>()

const md = new WanikaniCardBasicMD(props.subject)
</script>

<template>
  <v-card
      class="pa-4 mx-2"
      height="fit-content"
      max-width="450px"
      min-width="200px"
  >
    <WanikaniCardBasic :subject="subject"/>
    <AnkiCardDialog :back-text="md.generateBack()" :front-text="md.generateFront()"/>
  </v-card>
</template>