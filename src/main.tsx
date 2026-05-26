import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/index.scss'; 

import './components/atoms/Tooltip'; 

import App from './App.tsx' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
