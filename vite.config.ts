import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from "vite-plugin-vuetify";
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    // append with /ankiCardCreator/ only in production
    base: process.env.NODE_ENV === 'production' ? '/ankiCardCreator/' : '/',
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
        }),
        vue(),
        vuetify({autoImport: true})
    ],
    optimizeDeps: {
        include: ['lodash-es', 'isomorphic-dompurify'], // Add Lodash-ES to the list of dependencies to include
    },
})
