<script lang="ts" setup>
import {useToast} from "vue-toastification";

const toast = useToast();

function copytext(area: 'front' | 'back') {
  const text = area === 'front' ?
      document.getElementById('markdown-front')?.value :
      document.getElementById('markdown-back')?.value;
  navigator.clipboard.writeText(text);
  toast.info("Copied to clipboard");
}
</script>

<template>
  <v-dialog>
    <template v-slot:activator="{ props }">
      <v-btn class="float-right" text="Take this card" v-bind="props" variant="tonal"/>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card class="mx-auto" max-width="700px" title="Card Markdown" width="100%">
        <v-card-text>
          <v-textarea id="markdown-front" append-inner-icon="mdi-file-multiple" bg-color="grey-lighten-2"
                      label="Front" variant="solo-filled" @click:append-inner="copytext('front')"></v-textarea>
        </v-card-text>

        <v-card-text>
          <v-textarea id="markdown-back" append-inner-icon="mdi-file-multiple" bg-color="grey-lighten-2" label="Back"
                      variant="solo-filled" @click:append-inner="copytext('back')"></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Close Dialog"
              variant="tonal"
              @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>