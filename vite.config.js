import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Custom Vite plugin: transforms any .csv file import into a
 * JavaScript module that exports the raw CSV text as a string.
 *
 * This allows: import rawCSV from '../../data.csv'
 * Without needing ?raw or a network fetch.
 */
function csvPlugin() {
  return {
    name: 'vite-plugin-csv-to-string',
    transform(code, id) {
      if (id.endsWith('.csv')) {
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: null,
        };
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), csvPlugin()],
});
