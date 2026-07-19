/* global process */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

/** Inject preload hints for LCP-critical assets and JS chunks. */
function preloadAssetsPlugin() {
  return {
    name: 'preload-critical-assets',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;
      const tags = [];

      for (const asset of Object.values(ctx.bundle)) {
        if (asset.type === 'chunk') {
          if (
            asset.fileName.includes('index-') ||
            asset.fileName.includes('vendor-react')
          ) {
            tags.push(
              `<link rel="modulepreload" crossorigin href="/${asset.fileName}">`
            );
          }
        }
        if (asset.type === 'asset') {
          if (asset.fileName.includes('logo-colored') && asset.fileName.endsWith('.webp')) {
            tags.push(
              `<link rel="preload" as="image" type="image/webp" href="/${asset.fileName}" fetchpriority="high">`
            );
          }
        }
      }

      if (!tags.length) return html;
      return html.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`);
    },
  };
}

function manualChunks(id) {
  if (!id.includes('node_modules')) return undefined;
  if (
    id.includes('react-dom') ||
    id.includes('react-router') ||
    id.includes('/scheduler') ||
    /node_modules\/react\//.test(id)
  ) {
    return 'vendor-react';
  }
  if (id.includes('framer-motion')) return 'vendor-motion';
  if (id.includes('i18next') || id.includes('react-i18next')) return 'vendor-i18n';
  if (id.includes('lucide-react')) return 'vendor-icons';
  return 'vendor-misc';
}

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    preloadAssetsPlugin(),
    process.env.ANALYZE === 'true' &&
      visualizer({
        filename: 'dist/client/bundle-stats.html',
        gzipSize: true,
        brotliSize: true,
        open: false,
      }),
  ].filter(Boolean),
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks,
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    chunkSizeWarningLimit: 400,
  },
  esbuild: {
    legalComments: 'none',
  },
});
