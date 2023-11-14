<script lang="ts" setup>
import {ref} from 'vue'
import {useToast} from "vue-toastification";

const props = defineProps<{
  defaultSelect: string
}>()

const drawer = ref(true)
const rail = ref(true)
const selected: string = ref(props.defaultSelect || 'Wanikani')
const sources = ref([
  'Wanikani',
  // 'Jisho',
])

const toast = useToast();

function dialogTemplate() {
  toast.info("This feature is not implemented yet")
}
</script>

<template>
  <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      location="right"
      theme="dark"
      @click="rail = false"
  >
    <v-list>
      <v-list-item
          prepend-icon="mdi-cog"
          title="Settings"
      >
        <template v-slot:append>
          <v-btn
              icon="mdi-chevron-right"
              variant="text"
              @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item class="mt-2">
        <v-sheet class="d-flex align-center">
          <v-icon icon="mdi-web mr-4 mt-2"/>
          <v-select
              v-model="selected"
              :items="sources"
              class="mt-2"
              hide-details
              label="Source"
              variant="outlined"
              @update:model-value="$emit('changeSource', $event)"
          ></v-select>
        </v-sheet>
      </v-list-item>
      <v-list-item prepend-icon="mdi-xml" title="Card Template" value="template" @click="dialogTemplate"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>