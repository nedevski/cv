import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/cv.css'
import './styles/themes/orange.css'
import './styles/themes/blue.css'
import './styles/themes/green.css'
import './styles/themes/teal.css'
import './styles/themes/purple.css'
import './styles/themes/red.css'
import './styles/themes/olive.css'
import { initSite } from './initSite'
import { siteConfig } from './loadSite'
import App from './App.tsx'

initSite(siteConfig)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
