import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.sass'
import './globals.sass'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/week/:week" element={<App />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
)
