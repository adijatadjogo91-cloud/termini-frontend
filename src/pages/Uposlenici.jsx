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
            <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '4px' }}>Uposlenici</h1>
            <p style={{ color: '#888', fontSize: '15px' }}>{uposlenici.length} uposlenika ukupno</p>
          </div>
        </div>

        {/* Forma za dodavanje */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' }}>
            Dodaj novog uposlenika
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder="Ime i prezime uposlenika"
              value={ime}
              onChange={e => setIme(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && dodajUposlenika()}
              style={{
                flex: 1, padding: '10px 14px', border: '1px solid #ddd',
                borderRadius: '8px', fontSize: '14px', outline: 'none'
              }}
            />
            <button
              onClick={dodajUposlenika}
              disabled={!ime.trim() || dodaje}
              style={{
                background: !ime.trim() ? '#ccc' : '#1a7a4a', color: 'white',
                border: 'none', borderRadius: '8px', padding: '10px 20px',
                fontSize: '14px', fontWeight: '500', cursor: !ime.trim() ? 'not-allowed' : 'pointer'
              }}>
              {dodaje ? 'Dodavanje...' : '+ Dodaj'}
            </button>
          </div>
          {greska && <p style={{ color: '#e24b4a', fontSize: '13px', marginTop: '8px' }}>{greska}</p>}
        </div>

        {/* Lista uposlenika */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {uposlenici.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ fontSize: '32px', marginBottom: '1rem' }}>👤</p>
              <p style={{ color: '#888', fontSize: '15px' }}>Nema uposlenika još.</p>
              <p style={{ color: '#bbb', fontSize: '13px', marginTop: '8px' }}>Dodajte prvog uposlenika gore.</p>
            </div>
          ) : (
            uposlenici.map((u, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < uposlenici.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#eaf3de', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '14px', fontWeight: '600',
                    color: '#1a7a4a'
                  }}>
                    {inicijali(u.name)}
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{u.name}</p>
                </div>
                <button
                  onClick={() => obrisiUposlenika(u.id)}
                  style={{
                    background: 'none', border: '1px solid #fca5a5', borderRadius: '6px',
                    padding: '6px 12px', fontSize: '12px', color: '#e24b4a', cursor: 'pointer'
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