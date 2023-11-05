<script lang="ts" setup>
import {defineProps} from "vue";
import SubjectsService from "../../data/api/SubjectsService.ts";

defineProps<{
  subject: KanaVocabulary | Kanji | Radical | Vocabulary
}>()

const subjectsService = new SubjectsService()
</script>

<template>
  <h1 style="text-align: center;">
    <strong>{{ subject.characters }}</strong>
  </h1>
  <v-divider class="my-4"/>
  <div style="text-align: center;">
    <h2><b>{{ subjectsService.getMeaningPrimary(subject) }}</b></h2>
    <h5>
      {{ subjectsService.getMeanings(subject).join(', ') }}
    </h5>
    <template v-if="subjectsService.hasReading(subject)">
      <h3>
        <b><span style="color: rgb(38,225,38);">{{ subjectsService.getReadings(subject).join(', ') }}</span></b>
      </h3>
    </template>
  </div>
  <br>
  <p v-html="subjectsService.getMeaningMnemonic(subject)"/>
  <template v-if="subjectsService.hasMeaningHint(subject)">
    <br>
    <v-code v-html="subjectsService.getMeaningHint(subject)"/>
  </template>
  <br><br>
  <p v-html="subjectsService.getReadingMnemonic(subject)"/>
  <template v-if="subjectsService.hasReadingHint(subject)">
    <br>
    <v-code v-html="subjectsService.getReadingHint(subject)"/>
  </template>
  <br>
  <i><small style="color: #fc0d0d">{{ subject.type }}</small></i>
</template>