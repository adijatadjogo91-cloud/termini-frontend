import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { QRCodeSVG } from 'qrcode.react'

const API = 'https://termini-pro.onrender.com'

function Dashboard() {
  const [podaci, setPodaci] = useState(null)
  const [biznis, setBiznis] = useState(null)
  const [ucitava, setUcitava] = useState(true)
  const [trialIstekao, setTrialIstekao] = useState(false)
  const [danaOstalo, setDanaOstalo] = useState(null)

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

      // Provjera trial perioda
      if (mojBiznis.trial_ends_at) {
        const trialKraj = new Date(mojBiznis.trial_ends_at)
        const danas = new Date()
        const razlika = Math.ceil((trialKraj - danas) / (1000 * 60 * 60 * 24))
        if (razlika <= 0) {
          setTrialIstekao(true)
        } else {
          setDanaOstalo(razlika)
        }
      }
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

      {/* Trial banner */}
      {trialIstekao && (
        <div style={{ background: '#fee2e2', borderBottom: '1px solid #fca5a5', padding: '12px 2rem', textAlign: 'center' }}>
          <p style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
            ⚠️ Vaš besplatni period je istekao. 
            <a href="https://termini-pro.lemonsqueezy.com/checkout/buy/8a033a28-cf56-428a-bd22-abca6bba37f9" 
               style={{ color: '#dc2626', fontWeight: '700', marginLeft: '8px' }}>
              Pretplatite se za 49 KM/mj →
            </a>
          </p>
        </div>
      )}
      {danaOstalo !== null && !trialIstekao && (
        <div style={{ background: '#fef9c3', borderBottom: '1px solid #fde047', padding: '12px 2rem', textAlign: 'center' }}>
          <p style={{ color: '#854d0e', fontSize: '14px' }}>
            🕐 Imate još <strong>{danaOstalo} dana</strong> besplatnog korištenja.
          </p>
        </div>
      )}

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

       {/* Pozdrav */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '4px' }}>
            Dobrodošli 👋
          </h1>
          <p style={{ color: '#888', fontSize: '15px' }}>
            {biznis?.name || 'Vaš salon'} — danas je {datum()}
          </p>
          <div style={{ marginTop: '12px', background: '#eaf3de', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <QRCodeSVG value={`https://termini.pro/booking/${biznis?.slug}`} size={80} />
              <div>
                <p style={{ fontSize: '13px', color: '#1a7a4a', fontWeight: '600', marginBottom: '4px' }}>
                  🔗 Vaš booking link
                </p>
                <p style={{ fontSize: '12px', color: '#555' }}>
                  termini.pro/booking/{biznis?.slug}
                </p>
                <p style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                  Podijelite link ili QR kod sa klijentima
                </p>
              </div>
            </div>
            <button onClick={() => {
              navigator.clipboard.writeText(`https://termini.pro/booking/${biznis?.slug}`)
              alert('Link kopiran!')
            }} style={{
              background: '#1a7a4a', color: 'white', border: 'none',
              borderRadius: '6px', padding: '8px 16px', fontSize: '12px',
              cursor: 'pointer', whiteSpace: 'nowrap'
            }}>
              Kopiraj link
            </button>
          </div>
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