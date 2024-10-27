import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './app'
import { ThemeProvider } from './context/ThemeProvider'
import 'moment/dist/locale/es-do'
import moment from 'moment'

moment.locale('es-do')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </StrictMode>
)
