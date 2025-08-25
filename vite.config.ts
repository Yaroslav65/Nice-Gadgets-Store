import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Nice-Gadgets-Store/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/utils/variables.scss"; @import "./src/styles/utils/mixins.scss";`
      },
    },
  },
})
