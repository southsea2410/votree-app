import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://app-vniii7ofca-uc.a.run.app',
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: '../dist'
    }
});
