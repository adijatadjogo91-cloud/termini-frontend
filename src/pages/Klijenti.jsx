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

  const boje = ['#4ade80', '#60a5fa', '#c084fc', '#fb923c', '#f472b6', '#34d399']

  function bojaPoBroju(i) {
    return boje[i % boje.length]
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
              👥 Klijenti
            </h1>
            <p style={{ color: '#6b7fa3', fontSize: '15px' }}>
              {klijenti.length} klijenata ukupno
            </p>
          </div>
          <button onClick={() => window.location.href = '/novi-klijent'} style={{
            background: '#16a34a', color: 'white', border: 'none',
            borderRadius: '10px', padding: '11px 22px', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
          }}>
            + Novi klijent
          </button>
        </div>

        {/* Pretraga */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <span style={{
            position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
            fontSize: '16px', pointerEvents: 'none'
          }}>🔍</span>
          <input
            type="text"
            placeholder="Pretraži po imenu, telefonu ili emailu..."
            value={pretraga}
            onChange={e => setPretraga(e.target.value)}
            style={{
              width: '100%', height: '46px',
              padding: '0 16px 0 42px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', fontSize: '14px',
              color: '#f0f4ff', outline: 'none', boxSizing: 'border-box',
              fontFamily: 'Inter, sans-serif'
            }}
          />
        </div>

        {/* Stat kartica */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px', marginBottom: '1.5rem'
        }}>
          {[
            { label: 'Ukupno klijenata', vrijednost: klijenti.length, boja: '#4ade80', icon: '👥' },
            { label: 'Rezultati pretrage', vrijednost: filtrirani.length, boja: '#60a5fa', icon: '🔍' },
          ].map((k, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <span style={{ fontSize: '22px' }}>{k.icon}</span>
              <div>
                <p style={{ fontSize: '22px', fontWeight: '700', color: k.boja, margin: 0 }}>{k.vrijednost}</p>
                <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '2px' }}>{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lista klijenata */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', overflow: 'hidden'
        }}>
          {filtrirani.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ fontSize: '40px', marginBottom: '12px' }}>👥</p>
              <p style={{ color: '#c8d0e8', fontSize: '15px', fontWeight: '500' }}>
                {pretraga ? 'Nema rezultata pretrage.' : 'Nema klijenata još.'}
              </p>
              <p style={{ color: '#6b7fa3', fontSize: '13px', marginTop: '8px' }}>
                {pretraga ? 'Pokušajte drugi pojam.' : 'Dodajte prvog klijenta klikom na dugme iznad.'}
              </p>
            </div>
          ) : (
            filtrirani.map((k, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < filtrirani.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'background 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: `rgba(${bojaPoBroju(i) === '#4ade80' ? '74,222,128' : bojaPoBroju(i) === '#60a5fa' ? '96,165,250' : bojaPoBroju(i) === '#c084fc' ? '192,132,252' : bojaPoBroju(i) === '#fb923c' ? '251,146,60' : bojaPoBroju(i) === '#f472b6' ? '244,114,182' : '52,211,153'},0.15)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: '700', color: bojaPoBroju(i),
                    flexShrink: 0
                  }}>
                    {inicijali(k.name)}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f7', margin: 0 }}>
                      {k.name}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '3px' }}>
                      {k.phone && k.email
                        ? `${k.phone} · ${k.email}`
                        : k.phone || k.email || 'Nema kontakta'}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{
                    background: 'rgba(74,222,128,0.1)', color: '#4ade80',
                    fontSize: '12px', fontWeight: '600', padding: '4px 10px',
                    borderRadius: '20px'
                  }}>
                    {k.total_appointments || 0} termina
                  </span>
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
