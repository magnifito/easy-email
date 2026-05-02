import { defineConfig } from 'vite';
import path from 'path';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    process.env.ANALYZE === 'true' &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean) as any,
  resolve: {
    alias: {
      '@extensions': path.resolve('./src'),
      '@puralex/easy-email-core': path.resolve('../easy-email-core/lib'),
      '@puralex/easy-email-editor': path.resolve('../easy-email-editor/lib'),
    },
  },
  define: {},
  build: {
    emptyOutDir: false,
    minify: true,
    manifest: false,
    sourcemap: true,
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'easy-email-extension',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      plugins: [],
      external: [
        'react',
        'react-dom',
        'react-dom/server',
        'mjml-browser',
        'react-final-form',
        '@puralex/easy-email-core',
        '@puralex/easy-email-editor',
        'uuid',
        '@arco-design/web-react',
        'codemirror',
        'color',
        'final-form',
        'final-form-arrays',
        'final-form-set-field-touched',
        'is-hotkey',
        'lodash',
        'overlayscrollbars',
        'overlayscrollbars-react',
        'react-codemirror2',
        'react-color',
        'react-final-form-arrays',
        'react-use',
      ],
      output: {},
    },
    outDir: 'lib',
  },
  optimizeDeps: {},
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
});
