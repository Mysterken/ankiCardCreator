import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/ankiCardCreator/',
    plugins: [vue(), vuetify({autoImport: true})],
    optimizeDeps: {
        include: ['lodash-es', 'isomorphic-dompurify'], // Add Lodash-ES to the list of dependencies to include
    },
})
