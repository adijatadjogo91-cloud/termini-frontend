import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://termini-pro.onrender.com'

export default function Otkazi() {
  const token = window.location.pathname.split('/otkazi/')[1]
  const [termin, setTermin] = useState(null)
  const [status, setStatus] = useState('ucitava') // ucitava, prikazuje, otkazano, greska
  const [poruka, setPoruka] = useState('')

  useEffect(() => {
    ucitajTermin()
  }, [])

  async function ucitajTermin() {
    try {
      const res = await axios.get(API + `/api/appointments/cancel/${token}`)
      setTermin(res.data.appointment)
      setStatus('prikazuje')
    } catch (err) {
      setPoruka(err.response?.data?.error || 'Termin nije pronađen.')
      setStatus('greska')
    }
  }

  async function potvrdiOtkaz() {
    try {
      await axios.post(API + `/api/appointments/cancel/${token}`)
      setStatus('otkazano')
    } catch (err) {
      setPoruka(err.response?.data?.error || 'Greška pri otkazivanju.')
      setStatus('greska')
    }
  }

  function formatDatum(iso) {
    const d = new Date(iso)
    const dani = ['nedjelja','ponedjeljak','utorak','srijeda','četvrtak','petak','subota']
    const mjeseci = ['januara','februara','marta','aprila','maja','juna','jula','augusta','septembra','oktobra','novembra','decembra']
    return `${dani[d.getDay()]}, ${d.getDate()}. ${mjeseci[d.getMonth()]}`
  }

  function formatVrijeme(iso) {
    return new Date(iso).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '480px', width: '100%', padding: '0 1rem' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '22px' }}>
            termini<span style={{ color: '#1a7a4a' }}>.pro</span>
          </h2>
        </div>

        {/* Učitava */}
        {status === 'ucitava' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <p style={{ color: '#888' }}>Učitavanje...</p>
          </div>
        )}

        {/* Prikazuje termin */}
        {status === 'prikazuje' && termin && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#1a1a1a' }}>
              Otkazivanje termina
            </h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>
              Da li ste sigurni da želite otkazati sljedeći termin?
            </p>
            <div style={{ background: '#f9f9f9', borderRadius: '12px', padding: '1.25rem', marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>
                🏪 {termin.business_name}
              </p>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '6px' }}>📋 {termin.service_name}</p>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '6px' }}>📅 {formatDatum(termin.starts_at)}</p>
              <p style={{ fontSize: '14px', color: '#555' }}>🕐 {formatVrijeme(termin.starts_at)}</p>
            </div>
            <button onClick={potvrdiOtkaz} style={{
              width: '100%', background: '#e24b4a', color: 'white',
              border: 'none', borderRadius: '10px', padding: '14px',
              fontSize: '15px', fontWeight: '600', cursor: 'pointer',
              marginBottom: '12px'
            }}>
              Da, otkaži termin
            </button>
            <button onClick={() => window.location.href = '/'} style={{
              width: '100%', background: 'none', color: '#888',
              border: '1px solid #ddd', borderRadius: '10px', padding: '14px',
              fontSize: '15px', cursor: 'pointer'
            }}>
              Ne, zadrži termin
            </button>
          </div>
        )}

        {/* Otkazano */}
        {status === 'otkazano' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize: '48px', marginBottom: '1rem' }}>✅</p>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Termin je otkazan</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>
              Vaš termin je uspješno otkazan. Salon je obaviješten.
            </p>
            <button onClick={() => window.location.href = '/'} style={{
              background: '#1a7a4a', color: 'white', border: 'none',
              borderRadius: '10px', padding: '12px 24px', fontSize: '14px',
              cursor: 'pointer'
            }}>
              Zakaži novi termin
            </button>
          </div>
        )}

        {/* Greška */}
        {status === 'greska' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize: '48px', marginBottom: '1rem' }}>❌</p>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Greška</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>{poruka}</p>
          </div>
        )}

      </div>
    </div>
  )
}