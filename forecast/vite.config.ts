import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Adapt based on your framework

export default defineConfig({
  server: {
    host: '0.0.0.0', // Expose to all interfaces
    port:  5173, // Use environment variable (explained later)
  },
  plugins: [react()], // Adapt based on your framework
});