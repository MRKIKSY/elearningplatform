// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist', // Specify the output directory for the build
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://jobmarketbackend.onrender.com',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
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
        target: 'https://elearningbackend-z07d.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});