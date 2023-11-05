<script lang="ts" setup>

import {ref} from "vue";
import DOMPurify from 'isomorphic-dompurify';

const props = defineProps<{
  subject: KanaVocabulary | Kanji | Radical | Vocabulary
}>()

const meaningPrimary = ref<string>('')
const meaningMnemonic = ref<string>('')
const meaningHint = ref<string>('')
const meanings = ref<string[]>([])

const readingPrimary = ref<string>('')
const readingMnemonic = ref<string>('')
const readingHint = ref<string>('')
const readings = ref<string[]>([])

const hasMeaningHint = ref<boolean>(props.subject?.meaning_hint)
const hasReadingHint = ref<boolean>(props.subject?.reading_hint)
const hasReading = ref<boolean>(props.subject?.readings)

meaningPrimary.value = props.subject.meanings.filter((meaning: {
  primary: boolean;
}) => meaning.primary)[0].meaning

meanings.value = props.subject.meanings.filter((meaning: {
  primary: boolean;
}) => !meaning.primary).map((meaning: { meaning: string; }) => meaning.meaning)

readingPrimary.value = props.subject.readings?.filter((reading: {
  primary: boolean;
}) => reading.primary)[0].reading

readings.value = props.subject.readings?.filter((reading: {
  primary: boolean;
}) => reading.primary).map((reading: { reading: string; }) => reading.reading)

function replaceTags(text: string) {
  if (!text) return '';
  return DOMPurify.sanitize(
      text
          .replace(/<radical>(.*?)<\/radical>/g, '<span style="color: #0083c5;">$1</span>')
          .replace(/<kanji>(.*?)<\/kanji>/g, '<span style="color: #c50083;">$1</span>')
          .replace(/<ja>(.*?)<\/ja>/g, '<span style="color:#0c8d16;">$1</span>')
          .replace(/<vocabulary>(.*?)<\/vocabulary>/g, '<span style="color:#8500c7;">$1</span>')
  )
}

meaningMnemonic.value = replaceTags(props.subject.meaning_mnemonic)
readingMnemonic.value = replaceTags(props.subject.reading_mnemonic)

if (hasMeaningHint.value) meaningHint.value = replaceTags(props.subject.meaning_hint)
if (hasReadingHint.value) readingHint.value = replaceTags(props.subject.reading_hint)

</script>

<template>
  <v-card
      class="pa-4 mx-2"
      height="fit-content"
      max-width="450px"
      min-width="200px"
  >
    <h1 style="text-align: center;">
      <strong>{{ subject.characters }}</strong>
    </h1>
    <v-divider class="my-4"/>
    <div style="text-align: center;">
      <h2><b>{{ meaningPrimary }}</b></h2>
      <h5>
        {{ meanings.join(', ') }}
      </h5>
      <template v-if="hasReading">
        <h3>
          <b><span style="color: rgb(38,225,38);">{{ readings.join(', ') }}</span></b>
        </h3>
      </template>
    </div>
    <br>
    <p v-html="meaningMnemonic"/>
    <template v-if="hasMeaningHint">
      <br>
      <v-code v-html="meaningHint"/>
    </template>
    <br><br>
    <p v-html="readingMnemonic"/>
    <template v-if="hasReadingHint">
      <br>
      <v-code v-html="readingHint"/>
    </template>
    <br>
    <i><small style="color: #fc0d0d">{{ subject.type }}</small></i>
  </v-card>
</template>