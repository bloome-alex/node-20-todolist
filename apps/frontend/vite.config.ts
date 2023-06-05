import graphql from '@rollup/plugin-graphql'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    graphql(), 
    vue(),
    vuetify()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: [
      'date-fns/locale/en-US',
    ],
  },
  build: {
    sourcemap: false,
  },
})