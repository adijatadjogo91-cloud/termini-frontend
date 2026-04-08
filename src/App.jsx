import Postavke from './pages/Postavke'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Termini from './pages/Termini'
import Klijenti from './pages/Klijenti'
import NoviTermin from './pages/NoviTermin'
import NoviKlijent from './pages/NoviKlijent'
import Usluge from './pages/Usluge'
import NovaUsluga from './pages/NovaUsluga'
import Landing from './pages/Landing'
import Booking from './pages/Booking'
import Uposlenici from './pages/Uposlenici'
import TermsAndConditions from './pages/TermsAndConditions'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/postavke" element={<Postavke />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/termini" element={<Termini />} />
        <Route path="/klijenti" element={<Klijenti />} />
        <Route path="/novi-termin" element={<NoviTermin />} />
        <Route path="/novi-klijent" element={<NoviKlijent />} />
        <Route path="/usluge" element={<Usluge />} />
        <Route path="/nova-usluga" element={<NovaUsluga />} />
        <Route path="/booking/:slug" element={<Booking />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/uposlenici" element={<Uposlenici />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App