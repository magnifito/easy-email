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
        // Externalize react & react-dom plus ALL their subpaths (jsx-runtime,
        // react-dom/client, react-dom/server, ...). Rollup string entries are
        // exact-match only, so a bare 'react-dom' does NOT cover 'react-dom/client'.
        // Missing that subpath bundles the full react-dom dev build into the lib,
        // which then throws "Incompatible React versions" against the host's react.
        /^react($|\/)/,
        /^react-dom($|\/)/,
        'react',
        'react-dom',
        'react-dom/client',
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
