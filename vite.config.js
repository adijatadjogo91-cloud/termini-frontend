import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
```

Zatim u `public` folderu otvori `_redirects` fajl i provjeri da li ima tačno ovaj sadržaj bez ikakvih dodatnih razmaka ili praznih redova:
```
/*    /index.html   200