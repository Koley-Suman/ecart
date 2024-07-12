import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888', // Replace with your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite path
      },
      '/stripe': {
        target: 'https://api.stripe.com', // Stripe API endpoint
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/stripe/, ''), // Rewrite path
        headers: {
          // Add headers if necessary
          'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      },
      // Add more proxy configurations as needed
    },
  },








  define: {
    'process.env': {}
  },
    plugins: [react()],
  
})

