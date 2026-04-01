import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = 'https://termini-pro.onrender.com'

function Dashboard() {
  const [podaci, setPodaci] = useState(null)
  const [biznis, setBiznis] = useState(null)
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
      const mojBiznis = bizRes.data.businesses[0]
      setBiznis(mojBiznis)

      const dashRes = await axios.get(API + `/api/businesses/${mojBiznis.id}/dashboard`, { headers })
      setPodaci(dashRes.data)
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    setUcitava(false)
  }

  const datum = () => {
    const d = new Date()
    const dani = ['nedjelja','ponedjeljak','utorak','srijeda','četvrtak','petak','subota']
    const mjeseci = ['januar','februar','mart','april','maj','juni','juli','august','septembar','oktobar','novembar','decembar']
    return `${dani[d.getDay()]}, ${d.getDate()}. ${mjeseci[d.getMonth()]}`
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

        {/* Pozdrav */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '4px' }}>
            Dobrodošli 👋
          </h1>
          <p style={{ color: '#888', fontSize: '15px' }}>
            {biznis?.name || 'Vaš salon'} — danas je {datum()}
          </p>
        </div>

        {/* Kartice sa brojevima */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '2rem' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Termini danas</p>
            <p style={{ fontSize: '28px', fontWeight: '600', color: '#1a7a4a' }}>{podaci?.today?.appointments || '0'}</p>
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Ukupno klijenata</p>
            <p style={{ fontSize: '28px', fontWeight: '600', color: '#2563eb' }}>{podaci?.total_clients || '0'}</p>
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Prihodi ovaj mj.</p>
            <p style={{ fontSize: '28px', fontWeight: '600', color: '#7c3aed' }}>{podaci?.month?.revenue || '0'} KM</p>
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Termini ovaj mj.</p>
            <p style={{ fontSize: '28px', fontWeight: '600', color: '#d97706' }}>{podaci?.month?.appointments || '0'}</p>
          </div>
        </div>

        {/* Današnji termini */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem' }}>
            Današnji termini
          </h2>
          {podaci?.appointments?.length === 0 ? (
            <p style={{ color: '#aaa', fontSize: '14px', textAlign: 'center', padding: '2rem 0' }}>
              Nema termina za danas. 🎉
            </p>
          ) : (
            podaci?.appointments?.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{t.client_name}</p>
                  <p style={{ fontSize: '13px', color: '#888' }}>{t.service_name}</p>
                </div>
                <p style={{ fontSize: '14px', color: '#1a7a4a', fontWeight: '500' }}>
                  {new Date(t.starts_at).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard