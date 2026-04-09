import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { QRCodeSVG } from 'qrcode.react'
import Onboarding from './Onboarding'
const API = 'https://termini-pro.onrender.com'

function Dashboard() {
  const [podaci, setPodaci] = useState(null)
  const [biznis, setBiznis] = useState(null)
  const [ucitava, setUcitava] = useState(true)
  const [trialIstekao, setTrialIstekao] = useState(false)
  const [danaOstalo, setDanaOstalo] = useState(null)
  const [pokaziOnboarding, setPokaziOnboarding] = useState(false)
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
      if (!mojBiznis.phone && !mojBiznis.address && !mojBiznis.description) {
      setPokaziOnboarding(true)
     }
      if (mojBiznis.trial_ends_at) {
        const trialKraj = new Date(mojBiznis.trial_ends_at)
        const danas = new Date()
        const razlika = Math.ceil((trialKraj - danas) / (1000 * 60 * 60 * 24))
        if (razlika <= 0) setTrialIstekao(true)
        else setDanaOstalo(razlika)
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
 if (pokaziOnboarding && biznis) return (
  <Onboarding
    biznis={biznis}
    onZavrsi={() => {
      setPokaziOnboarding(false)
      ucitajPodatke()
    }}
  />
 )
  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#6b7fa3', fontSize: '14px' }}>Učitavanje...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  const kartice = [
    { label: 'Termini danas', vrijednost: podaci?.today?.appointments || '0', boja: '#4ade80', icon: '📅' },
    { label: 'Ukupno klijenata', vrijednost: podaci?.total_clients || '0', boja: '#60a5fa', icon: '👥' },
    { label: 'Prihodi ovaj mj.', vrijednost: `${podaci?.month?.revenue || '0'} KM`, boja: '#c084fc', icon: '💰' },
    { label: 'Termini ovaj mj.', vrijednost: podaci?.month?.appointments || '0', boja: '#fb923c', icon: '📊' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* Trial banneri */}
      {trialIstekao && (
        <div style={{ background: 'rgba(220,38,38,0.15)', borderBottom: '1px solid rgba(220,38,38,0.3)', padding: '12px 2rem', textAlign: 'center' }}>
          <p style={{ color: '#f87171', fontSize: '14px', fontWeight: '500' }}>
            ⚠️ Vaš besplatni period je istekao.{' '}
            <a href="https://termini-pro.lemonsqueezy.com/checkout/buy/8a033a28-cf56-428a-bd22-abca6bba37f9"
              style={{ color: '#f87171', fontWeight: '700', marginLeft: '4px' }}>
              Pretplatite se za 49 KM/mj →
            </a>
          </p>
        </div>
      )}
      {danaOstalo !== null && !trialIstekao && (
        <div style={{ background: 'rgba(251,191,36,0.1)', borderBottom: '1px solid rgba(251,191,36,0.2)', padding: '12px 2rem', textAlign: 'center' }}>
          <p style={{ color: '#fbbf24', fontSize: '14px' }}>
            🕐 Imate još <strong>{danaOstalo} dana</strong> besplatnog korištenja.
          </p>
        </div>
      )}

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Pozdrav */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
            Dobrodošli 👋
          </h1>
          <p style={{ color: '#6b7fa3', fontSize: '15px' }}>
            {biznis?.name || 'Vaš salon'} — danas je {datum()}
          </p>
        </div>

        {/* Booking link kartica */}
        <div style={{
          background: 'rgba(74,222,128,0.06)',
          border: '1px solid rgba(74,222,128,0.2)',
          borderRadius: '16px', padding: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              background: 'white', borderRadius: '10px', padding: '6px'
            }}>
              <QRCodeSVG value={`https://termini.pro/booking/${biznis?.slug}`} size={72} />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#4ade80', fontWeight: '600', marginBottom: '4px' }}>
                🔗 Vaš booking link
              </p>
              <p style={{ fontSize: '13px', color: '#c8d0e8', marginBottom: '4px' }}>
                termini.pro/booking/{biznis?.slug}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7fa3' }}>
                Podijelite link ili QR kod sa klijentima
              </p>
            </div>
          </div>
          <button onClick={() => {
            navigator.clipboard.writeText(`https://termini.pro/booking/${biznis?.slug}`)
            alert('Link kopiran!')
          }} style={{
            background: '#16a34a', color: 'white', border: 'none',
            borderRadius: '8px', padding: '10px 18px', fontSize: '13px',
            fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap'
          }}>
            Kopiraj link
          </button>
        </div>

        {/* Stat kartice */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px', marginBottom: '1.5rem'
        }}>
          {kartice.map((k, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ fontSize: '13px', color: '#6b7fa3' }}>{k.label}</p>
                <span style={{ fontSize: '20px' }}>{k.icon}</span>
              </div>
              <p style={{ fontSize: '30px', fontWeight: '700', color: k.boja }}>{k.vrijednost}</p>
            </div>
          ))}
        </div>

        {/* Današnji termini */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f0f4ff' }}>
              📅 Današnji termini
            </h2>
            <span style={{
              background: 'rgba(74,222,128,0.12)', color: '#4ade80',
              fontSize: '12px', fontWeight: '600', padding: '4px 10px',
              borderRadius: '20px'
            }}>
              {podaci?.appointments?.length || 0} termina
            </span>
          </div>

          {!podaci?.appointments?.length ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
              <p style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</p>
              <p style={{ color: '#6b7fa3', fontSize: '14px' }}>Nema termina za danas.</p>
            </div>
          ) : (
            podaci.appointments.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: i < podaci.appointments.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: 'rgba(74,222,128,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: '700', color: '#4ade80', flexShrink: 0
                  }}>
                    {t.client_name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f7' }}>{t.client_name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '2px' }}>{t.service_name}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', color: '#4ade80', fontWeight: '600' }}>
                    {new Date(t.starts_at).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {t.price && <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '2px' }}>{t.price} KM</p>}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
