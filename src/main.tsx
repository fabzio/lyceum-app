import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from './context/ThemeProvider'
import 'moment/dist/locale/es-do'
import moment from 'moment'
import { G_CLIENT_ID } from './config'

moment.locale('es-do')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={G_CLIENT_ID}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
