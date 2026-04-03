import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = 'https://termini-pro.onrender.com'

function Klijenti() {
  const [klijenti, setKlijenti] = useState([])
  const [ucitava, setUcitava] = useState(true)
  const [pretraga, setPretraga] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { window.location.href = '/login'; return }
    ucitajKlijente()
  }, [])

  async function ucitajKlijente() {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      const res = await axios.get(API + `/api/clients/${bizId}`, { headers })
      setKlijenti(res.data.clients || [])
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    setUcitava(false)
  }

  const filtrirani = klijenti.filter(k =>
    k.name?.toLowerCase().includes(pretraga.toLowerCase()) ||
    k.phone?.includes(pretraga) ||
    k.email?.toLowerCase().includes(pretraga.toLowerCase())
  )

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
            <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '4px' }}>Klijenti</h1>
            <p style={{ color: '#888', fontSize: '15px' }}>{klijenti.length} klijenata ukupno</p>
          </div>
          <button onClick={() => window.location.href = '/novi-klijent'} style={{
            background: '#1a7a4a', color: 'white', border: 'none',
            borderRadius: '8px', padding: '10px 20px', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer'
          }}>
            + Novi klijent
          </button>
        </div>

        {/* Pretraga */}
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Pretraži po imenu, telefonu ili emailu..."
            value={pretraga}
            onChange={e => setPretraga(e.target.value)}
            style={{
              width: '100%',
              height: '44px',
              padding: '0 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              background: 'white'
            }}
          />
        </div>

        {/* Lista klijenata */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {filtrirani.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ fontSize: '32px', marginBottom: '1rem' }}>👥</p>
              <p style={{ color: '#888', fontSize: '15px' }}>
                {pretraga ? 'Nema rezultata pretrage.' : 'Nema klijenata još.'}
              </p>
              <p style={{ color: '#bbb', fontSize: '13px', marginTop: '8px' }}>
                {pretraga ? 'Pokušajte drugi pojam.' : 'Dodajte prvog klijenta klikom na dugme iznad.'}
              </p>
            </div>
          ) : (
            filtrirani.map((k, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < filtrirani.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#eaf3de', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '14px', fontWeight: '600',
                    color: '#1a7a4a'
                  }}>
                    {inicijali(k.name)}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{k.name}</p>
                    <p style={{ fontSize: '13px', color: '#888' }}>{k.phone || k.email || 'Nema kontakta'}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '13px', color: '#888' }}>{k.total_appointments || 0} termina</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Klijenti