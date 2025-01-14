import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/traii/',  // добавьте эту строку здесь
  plugins: [react()],
})