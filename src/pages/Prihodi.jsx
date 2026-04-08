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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <p style={{ color: '#888' }}>Učitavanje...</p>
    </div>
  )

  const maxPrihod = podaci?.week_chart?.length
    ? Math.max(...podaci.week_chart.map(d => parseFloat(d.count) || 0), 1)
    : 1

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '4px' }}>💰 Prihodi</h1>
          <p style={{ color: '#888', fontSize: '15px' }}>Pregled prihoda i statistika vašeg salona</p>
        </div>

        {/* Kartice */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { naziv: 'Danas', vrijednost: `${parseFloat(podaci?.today?.revenue || 0).toFixed(2)} KM`, ikona: '📅', boja: '#1a7a4a' },
            { naziv: 'Ovaj mjesec', vrijednost: `${parseFloat(podaci?.month?.revenue || 0).toFixed(2)} KM`, ikona: '📆', boja: '#2563eb' },
            { naziv: 'Termini danas', vrijednost: podaci?.today?.appointments || 0, ikona: '✂️', boja: '#d97706' },
            { naziv: 'Termini mjesec', vrijednost: podaci?.month?.appointments || 0, ikona: '📋', boja: '#7c3aed' },
          ].map((k, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '12px', padding: '20px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              borderLeft: `4px solid ${k.boja}`
            }}>
              <p style={{ fontSize: '24px', marginBottom: '8px' }}>{k.ikona}</p>
              <p style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a' }}>{k.vrijednost}</p>
              <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{k.naziv}</p>
            </div>
          ))}
        </div>

        {/* Graf aktivnosti */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>📊 Aktivnost — posljednjih 7 dana</h3>
          {podaci?.week_chart?.length === 0 ? (
            <p style={{ color: '#888', fontSize: '14px', textAlign: 'center', padding: '2rem' }}>Nema podataka za prikaz.</p>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '150px' }}>
              {podaci?.week_chart?.map((d, i) => {
                const visina = Math.max((parseFloat(d.count) / maxPrihod) * 120, 4)
                const datum = new Date(d.date)
                const dani = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <p style={{ fontSize: '11px', color: '#888' }}>{d.count}</p>
                    <div style={{
                      width: '100%', height: `${visina}px`,
                      background: '#1a7a4a', borderRadius: '4px 4px 0 0',
                      opacity: 0.8
                    }} />
                    <p style={{ fontSize: '11px', color: '#888' }}>{dani[datum.getDay()]}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Top usluge */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>⭐ Top usluge — ovaj mjesec</h3>
          {!podaci?.top_services?.length ? (
            <p style={{ color: '#888', fontSize: '14px' }}>Nema podataka za prikaz.</p>
          ) : (
            podaci.top_services.map((u, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: i < podaci.top_services.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: '#eaf3de', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#1a7a4a'
                  }}>
                    {i + 1}
                  </span>
                  <p style={{ fontSize: '14px', fontWeight: '500' }}>{u.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a7a4a' }}>{parseFloat(u.price).toFixed(2)} KM</p>
                  <p style={{ fontSize: '12px', color: '#888' }}>{u.count}x</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mjesečni izvještaj */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>📄 Mjesečni izvještaj</h3>
          <div style={{ background: '#f9f9f9', borderRadius: '8px', padding: '16px' }}>
            {[
              { naziv: 'Ukupno termina', vrijednost: podaci?.month?.appointments || 0 },
              { naziv: 'Ukupno prihoda', vrijednost: `${parseFloat(podaci?.month?.revenue || 0).toFixed(2)} KM` },
              { naziv: 'Ukupno klijenata', vrijednost: podaci?.total_clients || 0 },
              { naziv: 'Najpopularnija usluga', vrijednost: podaci?.top_services?.[0]?.name || 'N/A' },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: i < 3 ? '1px solid #eee' : 'none'
              }}>
                <p style={{ fontSize: '14px', color: '#555' }}>{r.naziv}</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{r.vrijednost}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}