import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@apps/server': resolve(__dirname, '../server/src'),
      '@packages/schemas': resolve(__dirname, '../../packages/schemas/src'),
      $components: resolve(__dirname, 'src/components'),
      $hooks: resolve(__dirname, 'src/hooks'),
      $lib: resolve(__dirname, 'src/lib'),
      $providers: resolve(__dirname, 'src/providers'),
      $routes: resolve(__dirname, 'src/routes'),
      $stores: resolve(__dirname, 'src/stores'),
    },
  },
})