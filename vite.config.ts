import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
      '@components': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        './src/components'
      ),
      '@assets': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        './src/assets'
      ),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
