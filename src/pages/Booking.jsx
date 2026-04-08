import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://termini-pro.onrender.com'

function Booking() {
  const slug = window.location.pathname.split('/booking/')[1]
  const [salon, setSalon] = useState(null)
  const [usluge, setUsluge] = useState([])
  const [korak, setKorak] = useState(1) // 1=usluga, 2=uposlenik, 3=datum, 4=vrijeme, 5=podaci, 6=potvrda
  const [odabranaUsluga, setOdabranaUsluga] = useState(null)
  const [odabranDatum, setOdabranDatum] = useState('')
  const [slobodnaVremena, setSlobodnaVremena] = useState([])
  const [odabranoVrijeme, setOdabranoVrijeme] = useState(null)
  const [ime, setIme] = useState('')
  const [telefon, setTelefon] = useState('')
  const [email, setEmail] = useState('')
  const [ucitava, setUcitava] = useState(true)
  const [ucitavaVremena, setUcitavaVremena] = useState(false)
  const [saljeZahtjev, setSaljeZahtjev] = useState(false)
  const [greska, setGreska] = useState('')
  const [uposlenici, setUposlenici] = useState([])
  const [odabraniUposlenik, setOdabraniUposlenik] = useState(null)

  useEffect(() => {
    ucitajSalon()
  }, [])

  async function ucitajSalon() {
    try {
      const res = await axios.get(API + `/api/public/b/${slug}`)
      setSalon(res.data.business)
      setUsluge(res.data.services || [])
      setUposlenici(res.data.staff || [])
    } catch (err) {
      setGreska('Salon nije pronađen.')
    }
    setUcitava(false)
  }

  async function ucitajSlobodnaVremena(datum) {
    setUcitavaVremena(true)
    try {
      const res = await axios.get(API + `/api/public/b/${slug}/slots?date=${datum}&serviceId=${odabranaUsluga.id}`)
      setSlobodnaVremena(res.data.slots || [])
    } catch (err) {
      setSlobodnaVremena([])
    }
    setUcitavaVremena(false)
  }

  async function zakaziTermin() {
    setSaljeZahtjev(true)
    setGreska('')
    try {
      await axios.post(API + `/api/public/b/${slug}/book`, {
        serviceId: odabranaUsluga.id,
        startsAt: `${odabranDatum}T${odabranoVrijeme}:00`,
        name: ime,
        phone: telefon,
        email: email,
      })
      setKorak(6)
    } catch (err) {
      setGreska(err.response?.data?.error || 'Greška pri zakazivanju.')
    }
    setSaljeZahtjev(false)
  }

  function minDatum() {
    const d = new Date()
    return d.toISOString().split('T')[0]
  }

  function maxDatum() {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return d.toISOString().split('T')[0]
  }

  function formatVrijeme(iso) {
    if (!iso) return ''
    if (iso.includes('T') || iso.includes('-')) {
      return new Date(iso).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })
    }
    return iso
  }

  function formatDatum(iso) {
    if (!iso) return ''
    const d = new Date(iso.includes('T') ? iso : iso + 'T00:00:00')
    if (isNaN(d.getTime())) return iso
    const dani = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota']
    const mjeseci = ['januara', 'februara', 'marta', 'aprila', 'maja', 'juna', 'jula', 'augusta', 'septembra', 'oktobra', 'novembra', 'decembra']
    return `${dani[d.getDay()]}, ${d.getDate()}. ${mjeseci[d.getMonth()]}`
  }

  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <p style={{ color: '#888' }}>Učitavanje...</p>
    </div>
  )

  if (greska && !salon) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <p style={{ color: '#e24b4a' }}>{greska}</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #eee', padding: '1rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', color: '#1a1a1a' }}>{salon?.name}</h2>
        <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{salon?.city || 'Bosna i Hercegovina'}</p>
      </div>

      <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '0 1rem' }}>

        {/* Korak 1 — Odabir usluge */}
        {korak === 1 && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' }}>
              Odaberite uslugu
            </h3>
            {usluge.map((u, i) => (
              <div key={i} onClick={() => { setOdabranaUsluga(u); setKorak(2) }} style={{
                background: 'white', borderRadius: '12px', padding: '1rem 1.25rem',
                marginBottom: '10px', cursor: 'pointer', border: '2px solid transparent',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1a1a1a' }}>{u.name}</p>
                  <p style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>{u.duration || u.duration_minutes} min</p>
                </div>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a7a4a' }}>{u.price} KM</p>
              </div>
            ))}
          </div>
        )}

        {/* Korak 2 — Odabir uposlenika */}
        {korak === 2 && (
          <div>
            <button onClick={() => setKorak(1)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginBottom: '1rem', fontSize: '14px' }}>
              ← Nazad
            </button>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' }}>
              Odaberite uposlenika
            </h3>
            <div onClick={() => { setOdabraniUposlenik(null); setKorak(3) }} style={{
              background: 'white', borderRadius: '12px', padding: '1rem 1.25rem',
              marginBottom: '10px', cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                👥
              </div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1a1a1a' }}>Bilo koji uposlenik</p>
                <p style={{ fontSize: '13px', color: '#888' }}>Prvi slobodni termin</p>
              </div>
            </div>
            {uposlenici.map((u, i) => (
              <div key={i} onClick={() => { setOdabraniUposlenik(u); setKorak(3) }} style={{
                background: 'white', borderRadius: '12px', padding: '1rem 1.25rem',
                marginBottom: '10px', cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', gap: '12px',
                border: '2px solid ' + (odabraniUposlenik?.id === u.id ? '#1a7a4a' : 'transparent')
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: u.color || '#1a7a4a', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '16px', fontWeight: '600', color: 'white'
                }}>
                  {u.name?.charAt(0)}
                </div>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1a1a1a' }}>{u.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Korak 3 — Odabir datuma */}
        {korak === 3 && (
          <div>
            <button onClick={() => setKorak(2)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginBottom: '1rem', fontSize: '14px' }}>
              ← Nazad
            </button>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' }}>
              Odaberite datum
            </h3>
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <input
                type="date"
                min={minDatum()}
                max={maxDatum()}
                value={odabranDatum}
                onChange={e => {
                  setOdabranDatum(e.target.value)
                  setOdabranoVrijeme(null)
                  setSlobodnaVremena([])
                }}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }}
              />
              {!odabranDatum && (
              <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
                  👆 Kliknite na polje iznad da odaberete datum
                </p>
              )}
              {odabranDatum && (
                <button onClick={() => { ucitajSlobodnaVremena(odabranDatum); setKorak(4) }} style={{
                  width: '100%', marginTop: '1rem', background: '#1a7a4a', color: 'white',
                  border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px',
                  fontWeight: '500', cursor: 'pointer'
                }}>
                  Dalje →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Korak 4 — Odabir vremena */}
        {korak === 4 && (
          <div>
            <button onClick={() => setKorak(3)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginBottom: '1rem', fontSize: '14px' }}>
              ← Nazad
            </button>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' }}>
              Odaberite vrijeme
            </h3>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '1rem' }}>{formatDatum(odabranDatum)}</p>
            {ucitavaVremena ? (
              <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>Učitavanje slobodnih termina...</p>
            ) : slobodnaVremena.length === 0 ? (
              <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <p style={{ color: '#888' }}>Nema slobodnih termina za ovaj dan.</p>
                <button onClick={() => setKorak(3)} style={{ marginTop: '1rem', background: '#1a7a4a', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer' }}>
                  Odaberi drugi datum
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {slobodnaVremena.map((slot, i) => (
                  <div key={i} onClick={() => { setOdabranoVrijeme(slot); setKorak(5) }} style={{
                    background: odabranoVrijeme === slot ? '#1a7a4a' : 'white',
                    color: odabranoVrijeme === slot ? 'white' : '#1a1a1a',
                    borderRadius: '8px', padding: '12px', textAlign: 'center',
                    cursor: 'pointer', fontSize: '15px', fontWeight: '500',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    border: '2px solid ' + (odabranoVrijeme === slot ? '#1a7a4a' : 'transparent')
                  }}>
                    {formatVrijeme(slot)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Korak 5 — Podaci klijenta */}
        {korak === 5 && (
          <div>
            <button onClick={() => setKorak(4)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginBottom: '1rem', fontSize: '14px' }}>
              ← Nazad
            </button>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' }}>
              Vaši podaci
            </h3>
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '6px' }}>Ime i prezime</label>
                <input
                  type="text"
                  value={ime}
                  onChange={e => setIme(e.target.value)}
                  placeholder="Ana Hodžić"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '6px' }}>Broj telefona</label>
                <input
            
                  type="tel"
                  value={telefon}
                  onChange={e => setTelefon(e.target.value)}
                  placeholder="061 123 456"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '6px' }}>Email <span style={{color: '#e24b4a'}}>*</span> ili telefon (bar jedno obavezno)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ana@gmail.com"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Pregled */}
              <div style={{ background: '#f9f9f9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Pregled termina:</p>
                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>📋 {odabranaUsluga?.name}</p>
                {odabraniUposlenik && <p style={{ fontSize: '14px', color: '#1a1a1a', marginTop: '4px' }}>✂️ {odabraniUposlenik.name}</p>}
                <p style={{ fontSize: '14px', color: '#1a1a1a', marginTop: '4px' }}>📅 {formatDatum(odabranDatum)}</p>
                <p style={{ fontSize: '14px', color: '#1a1a1a', marginTop: '4px' }}>🕐 {formatVrijeme(odabranoVrijeme)}</p>
                <p style={{ fontSize: '14px', color: '#1a7a4a', fontWeight: '600', marginTop: '4px' }}>💰 {odabranaUsluga?.price} KM</p>
              </div>

              {greska && <p style={{ color: '#e24b4a', fontSize: '13px', marginBottom: '1rem' }}>{greska}</p>}

              <button
                onClick={zakaziTermin}
                disabled={!ime || (!telefon && !email) || saljeZahtjev}
                style={{
                  width: '100%', background: (!ime || (!telefon && !email)) ? '#ccc' : '#1a7a4a',
                  color: 'white', border: 'none', borderRadius: '8px',
                  padding: '14px', fontSize: '15px', fontWeight: '600',
                  cursor: (!ime || (!telefon && !email)) ? 'not-allowed' : 'pointer'
                }}>
                {saljeZahtjev ? 'Zakazivanje...' : 'Potvrdi termin →'}
              </button>
            </div>
          </div>
        )}

        {/* Korak 6 — Potvrda */}
        {korak === 6 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '48px', marginBottom: '1rem' }}>🎉</p>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>
              Termin zakazan!
            </h3>
            <p style={{ color: '#888', fontSize: '15px', marginBottom: '2rem' }}>
              Vidimo se {formatDatum(odabranDatum)} u {formatVrijeme(odabranoVrijeme)}
            </p>
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', color: '#1a1a1a' }}>📋 {odabranaUsluga?.name}</p>
              {odabraniUposlenik && <p style={{ fontSize: '14px', color: '#1a1a1a', marginTop: '8px' }}>✂️ {odabraniUposlenik.name}</p>}
              <p style={{ fontSize: '14px', color: '#1a1a1a', marginTop: '8px' }}>📅 {formatDatum(odabranDatum)}</p>
              <p style={{ fontSize: '14px', color: '#1a1a1a', marginTop: '8px' }}>🕐 {formatVrijeme(odabranoVrijeme)}</p>
              <p style={{ fontSize: '14px', color: '#1a7a4a', fontWeight: '600', marginTop: '8px' }}>💰 {odabranaUsluga?.price} KM</p>
            </div>
           <p style={{ color: '#888', fontSize: '13px', marginTop: '1.5rem' }}>
              {email && telefon && `Potvrda je poslana na ${email} i ${telefon}`}
              {email && !telefon && `Potvrda je poslana na ${email}`}
              {!email && telefon && `Potvrda je poslana na ${telefon}`}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Booking