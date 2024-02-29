import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: "../leads-dist",
    rollupOptions: {
      output: {
        // Desactiva el uso de hashes en los nombres de archivo
        chunkFileNames: "[name].js",
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      }
    },
    //minify: false,
    watch: {}
  },
})
