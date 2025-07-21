import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // <--- IMPORTANTE para que las rutas sean relativas en Electron
  server: {
    proxy: {
      '/api': {
        target: 'https://hotelcieloazul.proyectosistta.site',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
