import { createApp } from 'vue'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import Toast, {PluginOptions} from "vue-toastification";
import "vue-toastification/dist/index.css";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

const toastOptions: PluginOptions = {
    position: "bottom-right",
};

createApp(App).use(vuetify).use(Toast, toastOptions).mount('#app')

