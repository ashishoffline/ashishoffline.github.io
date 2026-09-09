import { defineConfig } from 'vite';
import { defineConfig, PluginOption } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

function copyRootCname(): PluginOption {
  return {
    name: 'copy-root-cname',
    closeBundle() {
      const src = resolve(__dirname, 'CNAME');
      const dest = resolve(__dirname, 'dist/CNAME');
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [copyRootCname()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ccrewards: resolve(__dirname, 'cc-rewards/index.html'),
      },
    },
  },
});
