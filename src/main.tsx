import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.sass'
import './globals.sass'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalProvider } from './GlobalContent.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/week/:week"
        element={
          <GlobalProvider>
            <App />
          </GlobalProvider>
        }
      />
      <Route
        path="/"
        element={
          <GlobalProvider>
            <App />
          </GlobalProvider>
        }
      />
    </Routes>
  </BrowserRouter>
)
