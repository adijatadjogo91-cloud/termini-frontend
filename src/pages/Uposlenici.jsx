import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = 'https://termini-pro.onrender.com'

function Uposlenici() {
  const [uposlenici, setUposlenici] = useState([])
  const [ucitava, setUcitava] = useState(true)
  const [ime, setIme] = useState('')
  const [dodaje, setDodaje] = useState(false)
  const [greska, setGreska] = useState('')
  const token = localStorage.getItem('token')

  const boje = ['#4ade80', '#60a5fa', '#c084fc', '#fb923c', '#f472b6', '#34d399']
  const bojaPoBroju = (i) => boje[i % boje.length]

  useEffect(() => {
    if (!token) { window.location.href = '/login'; return }
    ucitajUposlenike()
  }, [])

  async function ucitajUposlenike() {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      const res = await axios.get(API + `/api/businesses/${bizId}/staff`, { headers })
      setUposlenici(res.data.staff || [])
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    setUcitava(false)
  }

  async function dodajUposlenika() {
    if (!ime.trim()) return
    setDodaje(true)
    setGreska('')
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      await axios.post(API + `/api/businesses/${bizId}/staff`, { name: ime }, { headers })
      setIme('')
      ucitajUposlenike()
    } catch (err) {
      setGreska('Greška pri dodavanju uposlenika.')
    }
    setDodaje(false)
  }

  async function obrisiUposlenika(staffId) {
    if (!window.confirm('Da li ste sigurni da želite obrisati ovog uposlenika?')) return
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      await axios.delete(API + `/api/businesses/${bizId}/staff/${staffId}`, { headers })
      ucitajUposlenike()
    } catch (err) {
      setGreska('Greška pri brisanju uposlenika.')
    }
  }

  function inicijali(ime) {
    if (!ime) return '?'
    return ime.split(' ').map(r => r[0]).join('').toUpperCase().slice(0, 2)
  }

  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#6b7fa3', fontSize: '14px' }}>Učitavanje...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
            👤 Uposlenici
          </h1>
          <p style={{ color: '#6b7fa3', fontSize: '15px' }}>
            {uposlenici.length} uposlenika ukupno
          </p>
        </div>

        {/* Forma za dodavanje */}
        <div style={{
          background: 'rgba(74,222,128,0.06)',
          border: '1px solid rgba(74,222,128,0.2)',
          borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '1rem', color: '#f0f4ff' }}>
            ➕ Dodaj novog uposlenika
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder="Ime i prezime uposlenika"
              value={ime}
              onChange={e => setIme(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && dodajUposlenika()}
              style={{
                flex: 1, padding: '11px 14px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px', fontSize: '14px',
                color: '#f0f4ff', outline: 'none',
                fontFamily: 'Inter, sans-serif'
              }}
            />
            <button
              onClick={dodajUposlenika}
              disabled={!ime.trim() || dodaje}
              style={{
                background: !ime.trim() ? 'rgba(255,255,255,0.1)' : '#16a34a',
                color: !ime.trim() ? '#6b7fa3' : 'white',
                border: 'none', borderRadius: '10px', padding: '11px 22px',
                fontSize: '14px', fontWeight: '600',
                cursor: !ime.trim() ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap'
              }}>
              {dodaje ? 'Dodavanje...' : '+ Dodaj'}
            </button>
          </div>
          {greska && <p style={{ color: '#f87171', fontSize: '13px', marginTop: '8px' }}>{greska}</p>}
        </div>

        {/* Lista uposlenika */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', overflow: 'hidden'
        }}>
          {uposlenici.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ fontSize: '40px', marginBottom: '12px' }}>👤</p>
              <p style={{ color: '#c8d0e8', fontSize: '15px', fontWeight: '500' }}>Nema uposlenika još.</p>
              <p style={{ color: '#6b7fa3', fontSize: '13px', marginTop: '8px' }}>
                Dodajte prvog uposlenika gore.
              </p>
            </div>
          ) : (
            uposlenici.map((u, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < uposlenici.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'background 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: bojaPoBroju(i) + '22',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '15px', fontWeight: '700', color: bojaPoBroju(i),
                    flexShrink: 0
                  }}>
                    {inicijali(u.name)}
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '500', color: '#e2e8f7', margin: 0 }}>
                      {u.name}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '3px' }}>
                      Aktivan uposlenik
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => obrisiUposlenika(u.id)}
                  style={{
                    background: 'rgba(248,113,113,0.1)',
                    border: '1px solid rgba(248,113,113,0.3)',
                    borderRadius: '8px', padding: '7px 14px',
                    fontSize: '13px', color: '#f87171', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                  Obriši
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Uposlenici
