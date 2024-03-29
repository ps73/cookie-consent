/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'vite-plugin-dts';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), dts()],
  build: {
    lib: {
      // @ts-ignore
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'simpler-cookie-consent',
      fileName: (format) => `simpler-cookie-consent.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      plugins: [
        replace({
          'preventAssignment': true,
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        visualizer({ filename: './.dev/built-analyzer.html', gzipSize: true, brotliSize: true }),
      ],
    },
  },
  base: './',
  resolve: {
    alias: {
      '@': path.resolve('', './src'),
    },
  },
});
