import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AddNewBus from './pages/AddNewBus.tsx'
import EditBusRoute from './pages/EditBusRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-new-bus" element={<AddNewBus />} />
        <Route path="/edit-bus-route" element={<EditBusRoute />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)