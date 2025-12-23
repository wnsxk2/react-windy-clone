// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), cesium(), tsconfigPaths()],
});
