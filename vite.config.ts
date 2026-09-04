import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ccrewards: resolve(__dirname, 'cc-rewards/index.html'),
      },
    },
  },
});
