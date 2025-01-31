import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  server: {
    open: '/docs/index.html',
  },
  '/socket.io': {
    target: 'ws://192.168.1.2:3000',
    ws: true,
    rewriteWsOrigin: true,
  },
})

