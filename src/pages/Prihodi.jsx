import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = 'https://termini-pro.onrender.com'

export default function Prihodi() {
  const [podaci, setPodaci] = useState(null)
  const [ucitava, setUcitava] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { window.location.href = '/login'; return }
    ucitajPodatke()
  }, [])

  async function ucitajPodatke() {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      const res = await axios.get(API + `/api/businesses/${bizId}/dashboard`, { headers })
      setPodaci(res.data)
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    setUcitava(false)
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

  const maxPrihod = podaci?.week_chart?.length
    ? Math.max(...podaci.week_chart.map(d => parseFloat(d.count) || 0), 1)
    : 1

  const kartice = [
    { naziv: 'Danas', vrijednost: `${parseFloat(podaci?.today?.revenue || 0).toFixed(2)} KM`, icon: '📅', boja: '#4ade80' },
    { naziv: 'Ovaj mjesec', vrijednost: `${parseFloat(podaci?.month?.revenue || 0).toFixed(2)} KM`, icon: '📆', boja: '#60a5fa' },
    { naziv: 'Termini danas', vrijednost: podaci?.today?.appointments || 0, icon: '✂️', boja: '#fb923c' },
    { naziv: 'Termini mjesec', vrijednost: podaci?.month?.appointments || 0, icon: '📋', boja: '#c084fc' },
  ]

  const dani = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
            💰 Prihodi
          </h1>
          <p style={{ color: '#6b7fa3', fontSize: '15px' }}>Pregled prihoda i statistika vašeg salona</p>
        </div>

        {/* Stat kartice */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '1.5rem' }}>
          {kartice.map((k, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '1.25rem',
              borderLeft: `3px solid ${k.boja}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ fontSize: '13px', color: '#6b7fa3' }}>{k.naziv}</p>
                <span style={{ fontSize: '20px' }}>{k.icon}</span>
              </div>
              <p style={{ fontSize: '26px', fontWeight: '700', color: k.boja, margin: 0 }}>{k.vrijednost}</p>
            </div>
          ))}
        </div>

        {/* Graf aktivnosti */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#f0f4ff', marginBottom: '20px' }}>
            📊 Aktivnost — posljednjih 7 dana
          </h3>
          {!podaci?.week_chart?.length ? (
            <p style={{ color: '#6b7fa3', fontSize: '14px', textAlign: 'center', padding: '2rem' }}>
              Nema podataka za prikaz.
            </p>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px' }}>
              {podaci.week_chart.map((d, i) => {
                const visina = Math.max((parseFloat(d.count) / maxPrihod) * 130, 4)
                const datum = new Date(d.date)
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7fa3' }}>{d.count}</p>
                    <div style={{
                      width: '100%', height: `${visina}px`,
                      background: 'linear-gradient(to top, #16a34a, #4ade80)',
                      borderRadius: '6px 6px 0 0', opacity: 0.85
                    }} />
                    <p style={{ fontSize: '11px', color: '#6b7fa3' }}>{dani[datum.getDay()]}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Top usluge */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#f0f4ff', marginBottom: '16px' }}>
            ⭐ Top usluge — ovaj mjesec
          </h3>
          {!podaci?.top_services?.length ? (
            <p style={{ color: '#6b7fa3', fontSize: '14px' }}>Nema podataka za prikaz.</p>
          ) : (
            podaci.top_services.map((u, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i < podaci.top_services.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'background 0.15s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '50%',
                    background: i === 0 ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: '700',
                    color: i === 0 ? '#fbbf24' : '#6b7fa3', flexShrink: 0
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f7', margin: 0 }}>{u.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#4ade80', margin: 0 }}>
                    {parseFloat(u.price).toFixed(2)} KM
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '2px' }}>{u.count}x</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mjesečni izvještaj */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#f0f4ff', marginBottom: '16px' }}>
            📄 Mjesečni izvještaj
          </h3>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '10px', padding: '4px 0'
          }}>
            {[
              { naziv: 'Ukupno termina', vrijednost: podaci?.month?.appointments || 0, boja: '#fb923c' },
              { naziv: 'Ukupno prihoda', vrijednost: `${parseFloat(podaci?.month?.revenue || 0).toFixed(2)} KM`, boja: '#4ade80' },
              { naziv: 'Ukupno klijenata', vrijednost: podaci?.total_clients || 0, boja: '#60a5fa' },
              { naziv: 'Najpopularnija usluga', vrijednost: podaci?.top_services?.[0]?.name || 'N/A', boja: '#c084fc' },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none'
              }}>
                <p style={{ fontSize: '14px', color: '#8b9ec7', margin: 0 }}>{r.naziv}</p>
                <p style={{ fontSize: '14px', fontWeight: '700', color: r.boja, margin: 0 }}>{r.vrijednost}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
