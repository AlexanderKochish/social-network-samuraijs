import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // измените на нужный вам номер порта
    host: 'localhost', // измените на нужный вам хост
  },
})
