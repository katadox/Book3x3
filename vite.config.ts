import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  /**
   * IMPORTANT FOR GITHUB PAGES DEPLOYMENT:
   * The `base` parameter specifies the path prefix under which your site is hosted.
   * If deploying to `https://<USERNAME>.github.io/book9x9/`, set `base: '/book9x9/'`.
   * If deploying to a custom root domain (or `https://<USERNAME>.github.io/`), set `base: '/'`.
   */
  base: '/Book3x3/',
})
