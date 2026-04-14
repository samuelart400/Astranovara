import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* These 'section' props MUST match the 'case' names in App.jsx */}
        <Route path="/" element={<App section="home" />} />
        <Route path="/about" element={<App section="about" />} />
        <Route path="/portfolio" element={<App section="portfolio" />} />
        <Route path="/investors" element={<App section="investors" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)