import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SearchNavProvider } from './contexts/SearchNavContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchNavProvider>
      <App />
    </SearchNavProvider>
  </StrictMode>,
)
