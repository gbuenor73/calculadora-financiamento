
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Substitua 'NOME_DO_REPOSITORIO' pelo nome do seu repo no GitHub
export default defineConfig({
  plugins: [react()],
  base: './', 
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
