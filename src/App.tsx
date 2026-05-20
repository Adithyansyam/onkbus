import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BusResults from './pages/BusResults'
import EditBusRoute from './pages/EditBusRoute'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditBusRoute />} />
        <Route path="/results" element={<BusResults />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
