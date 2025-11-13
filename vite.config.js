import { defineConfig } from 'vite';
import path from 'path';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  base: './',
  plugins: [
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/variables.scss" as *;
          @use "@/mixins.scss" as *;
        `,
      },
    },
  },
});