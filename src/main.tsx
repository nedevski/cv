import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/cv.css'
import './styles/animations.css'
import './styles/themes/orange.css'
import './styles/themes/blue.css'
import './styles/themes/green.css'
import './styles/themes/teal.css'
import './styles/themes/purple.css'
import './styles/themes/red.css'
import './styles/themes/olive.css'
import { initAnalytics } from './initAnalytics'
import { initSite } from './initSite'
import { cvData } from './loadCv'
import App from './App.tsx'

initSite(cvData.general)
initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
