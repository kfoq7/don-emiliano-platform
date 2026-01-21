import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import App from './modules/core/App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
