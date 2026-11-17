import { defineConfig } from 'vite';
import path from 'path';
import { injectHtml } from 'vite-plugin-html';

export default defineConfig({
  resolve: {
    alias: {
      '@demo': path.resolve(__dirname, './src'),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-final-form': path.resolve(__dirname, './node_modules/react-final-form'),
      '@puralex/easy-email-localization': path.resolve(
        __dirname,
        '../packages/easy-email-localization',
      ),
      '@puralex/easy-email-core': path.resolve(__dirname, '../packages/easy-email-core'),
      '@puralex/easy-email-editor': path.resolve(__dirname, '../packages/easy-email-editor'),
      '@puralex/easy-email-extensions': path.resolve(
        __dirname,
        '../packages/easy-email-extensions',
      ),
    },
  },
  optimizeDeps: {},
  define: {},
  build: {
    minify: true,
    manifest: true,
    sourcemap: false,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/\/node_modules\/lodash\/.*/.test(id)) {
            return 'lodash';
          }
          if (/\/node_modules\/mjml-browser\/.*/.test(id)) {
            return 'mjml-browser';
          }
        },
        chunkFileNames(info) {
          if (info.name?.includes('mjml-browser')) {
            return '[name].js';
          }
          return '[name]-[hash].js';
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {},
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    injectHtml({
      data: {
        buildTime: `<meta name="updated-time" content="${new Date().toUTCString()}" />`,
      },
    }),
  ].filter(Boolean),
});
