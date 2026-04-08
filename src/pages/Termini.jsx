import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = 'https://termini-pro.onrender.com'

function Termini() {
  const [termini, setTermini] = useState([])
  const [ucitava, setUcitava] = useState(true)
  const [filter, setFilter] = useState('danas')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { window.location.href = '/login'; return }
    ucitajTermine()
  }, [])

  async function ucitajTermine() {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      const res = await axios.get(API + `/api/appointments/${bizId}?from=2026-01-01&to=2026-12-31`, { headers })
      setTermini(res.data.appointments || [])
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    setUcitava(false)
  }

  async function otkaziTermin(terminId) {
    if (!window.confirm('Da li ste sigurni da želite otkazati ovaj termin?')) return;
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      await axios.patch(API + `/api/appointments/${bizId}/${terminId}`,
        { status: 'cancelled' },
        { headers }
      )
      ucitajTermine()
    } catch (err) {
      alert('Greška pri otkazivanju termina.')
    }
  }

  function formatDatum(datum) {
    const d = new Date(datum)
    const dani = ['ned','pon','uto','sri','čet','pet','sub']
    const mjeseci = ['jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec']
    return `${dani[d.getDay()]}, ${d.getDate()}. ${mjeseci[d.getMonth()]} — ${d.toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}`
  }

  function statusBoja(status) {
    const boje = {
      confirmed: '#1a7a4a',
      pending: '#d97706',
      cancelled: '#e24b4a',
      completed: '#2563eb',
      no_show: '#888'
    }
    return boje[status] || '#888'
  }

  function statusNaziv(status) {
    const nazivi = {
      confirmed: 'Potvrđen',
      pending: 'Čeka',
      cancelled: 'Otkazan',
      completed: 'Završen',
      no_show: 'Nije došao'
    }
    return nazivi[status] || status
  }

  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <p style={{ color: '#888' }}>Učitavanje...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '4px' }}>Termini</h1>
            <p style={{ color: '#888', fontSize: '15px' }}>Pregled svih termina vašeg salona</p>
          </div>
          <button onClick={() => window.location.href = '/novi-termin'} style={{
            background: '#1a7a4a', color: 'white', border: 'none',
            borderRadius: '8px', padding: '10px 20px', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer'
          }}>
            + Novi termin
          </button>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
          {['danas', 'sedmica', 'svi'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '8px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
              border: '1px solid #ddd',
              background: filter === f ? '#1a7a4a' : 'white',
              color: filter === f ? 'white' : '#555',
              fontWeight: filter === f ? '500' : '400'
            }}>
              {f === 'danas' ? 'Danas' : f === 'sedmica' ? 'Ova sedmica' : 'Svi termini'}
            </button>
          ))}
        </div>

        {/* Lista termina */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {termini.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ fontSize: '32px', marginBottom: '1rem' }}>📅</p>
              <p style={{ color: '#888', fontSize: '15px' }}>Nema termina za prikaz.</p>
              <p style={{ color: '#bbb', fontSize: '13px', marginTop: '8px' }}>Dodajte prvi termin klikom na dugme iznad.</p>
            </div>
          ) : (
            termini.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < termini.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#eaf3de', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '16px'
                  }}>
                    👤
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{t.client_name || 'Nepoznat klijent'}</p>
                    <p style={{ fontSize: '13px', color: '#888' }}>{t.service_name || 'Usluga'}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '13px', color: '#555', marginBottom: '4px' }}>{formatDatum(t.starts_at)}</p>
                    <span style={{
                      fontSize: '12px', padding: '3px 10px', borderRadius: '20px',
                      background: statusBoja(t.status) + '20',
                      color: statusBoja(t.status), fontWeight: '500'
                    }}>
                      {statusNaziv(t.status)}
                    </span>
                  </div>
                  {t.status !== 'cancelled' && t.status !== 'completed' && (
                    <button onClick={() => otkaziTermin(t.id)} style={{
                      background: 'none', border: '1px solid #e24b4a', color: '#e24b4a',
                      borderRadius: '8px', padding: '6px 12px', fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Otkaži
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Termini