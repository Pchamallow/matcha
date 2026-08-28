import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
    base: '/',
    server: {
        host: '0.0.0.0',
        port: 5173,
        allowedHosts: ['frontend', 'localhost', '127.0.0.1'],
        // PopUp : Configuration pour autoriser les popups et messages
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
            'Cross-Origin-Embedder-Policy': 'unsafe-none'
        },
        // Activer le strictPort pour garder 5173 et ne pas démarrer si il est déjà pris
        strictPort: true, 
        open: false, // Ne pas ouvrir automatiquement le navigateur
		proxy: { // Rediriger les liens des APIs vers une url simplifiée et pointant vers le backend
			'/api/db': {
				target: 'http://backend:3000',
				changeOrigin: true
			},
			'/api/auth': {
				target: 'http://backend:3001',
				changeOrigin: true
			}
		}
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        assetsDir: 'assets'
    }
})
