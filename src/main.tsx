import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import './components/ui/ui.css'
import './app.css'
import App from './App.tsx'
import PlantsProvider from './state/PlantsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Everything inside the provider can call usePlants() */}
    {/* BrowserRouter keeps the UI in sync with the address bar */}
    <BrowserRouter>
      <PlantsProvider>
        <App />
      </PlantsProvider>
    </BrowserRouter>
  </StrictMode>,
)
