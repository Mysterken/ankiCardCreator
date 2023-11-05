<script lang="ts" setup>
import {ref} from 'vue'
import {useToast} from "vue-toastification";
import Drawer from "./components/Drawer.vue";
import AnkiCard from "./components/AnkiCard.vue";
import SubjectsService from "./data/api/SubjectsService.ts";

const vocabulary = ref('')
const cards = ref([])
const isLoading = ref(false)

const subjectsService = new SubjectsService()
const toast = useToast();

function updateVocabulary(value: string) {
  vocabulary.value = value
}

async function callApi() {
  subjectsService.clearSubjects()
  cards.value = []

  try {
    isLoading.value = true
    await subjectsService.callApiWanikani(vocabulary.value.trim())
  } catch (e) {
    isLoading.value = false
    toast.error(e.message)
    return;
  }

  cards.value = subjectsService.getSubjects()
  isLoading.value = false
}

</script>

<template>
  <v-app>
    <Drawer :toast="toast"/>
    <v-main
        id="main"
        class="d-flex align-center justify-center flex-column py-8"
    >
      <v-text-field class="flex-0-0" label="Vocabulary" style="min-width: 250px" variant="outlined"
                    @keyup.enter="callApi" @update:modelValue="updateVocabulary"/>
      <v-btn variant="outlined" @click="callApi">
        Generate card
      </v-btn>
      <v-progress-circular v-show="isLoading" class="mt-4 " indeterminate/>
      <v-sheet
          class="d-flex mt-12 flex-wrap justify-center"
          color="#242424"
          style="width: 100%; gap: 24px;"
      >
        <AnkiCard
            v-for="card in cards"
            :key="card.id"
            :subject="card"
        />
      </v-sheet>
    </v-main>
  </v-app>
</template>