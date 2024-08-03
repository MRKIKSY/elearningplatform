import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory for the build
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://jobmarketbackend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    'process.env': {
      VITE_BACKEND_URL: JSON.stringify('https://jobmarketbackend.onrender.com'),
    },
  },
});
