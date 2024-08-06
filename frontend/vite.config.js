import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/app': {
        target: 'https://licitabsbserver-6f0bfb6e0572.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

