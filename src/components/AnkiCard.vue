<script lang="ts" setup>
import WanikaniCardBasic from "./card-templates/WanikaniCardBasic.vue";
import AnkiCardDialog from "./AnkiCardDialog.vue";
import WanikaniCardBasicMD from "../data/templates-markdown/WanikaniCardBasicMD.ts";
import JishoCardBasic from "./card-templates/JishoCardBasic.vue";

const props = defineProps<{
  subject: object,
  source: string
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
    <WanikaniCardBasic v-if="source === 'Wanikani'" :subject="subject"/>
    <JishoCardBasic v-if="source === 'Jisho'" :subject="subject"/>
    <AnkiCardDialog :back-text="md.generateBack()" :front-text="md.generateFront()"/>
  </v-card>
</template>