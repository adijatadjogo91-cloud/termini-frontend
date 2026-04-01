import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Termini from './pages/Termini'
import Klijenti from './pages/Klijenti'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/termini" element={<Termini />} />
        <Route path="/klijenti" element={<Klijenti />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App