import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './app'
import { ThemeProvider } from './context/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
