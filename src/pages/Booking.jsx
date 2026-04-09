import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://termini-pro.onrender.com'

function Booking() {
  const slug = window.location.pathname.split('/booking/')[1]
  const [datumBlokiran, setDatumBlokiran] = useState(false)
  const [salon, setSalon] = useState(null)
  const [usluge, setUsluge] = useState([])
  const [korak, setKorak] = useState(1)
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

  useEffect(() => { ucitajSalon() }, [])

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
    setDatumBlokiran(res.data.closed || false)
  } catch (err) {
    setSlobodnaVremena([])
    setDatumBlokiran(false)
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
        name: ime, phone: telefon, email: email,
      })
      setKorak(6)
    } catch (err) {
      setGreska(err.response?.data?.error || 'Greška pri zakazivanju.')
    }
    setSaljeZahtjev(false)
  }

  function minDatum() { return new Date().toISOString().split('T')[0] }
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #1a7a4a', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#888', fontSize: '14px' }}>Učitavanje...</p>
      </div>
    </div>
  )

  if (greska && !salon) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <p style={{ color: '#e24b4a' }}>{greska}</p>
    </div>
  )

  // Progress bar koraci
  const ukupnoKoraka = 5
  const progress = ((korak - 1) / (ukupnoKoraka - 1)) * 100

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a7a4a 0%, #2d9e64 100%)',
        padding: '1.5rem 1.5rem 2.5rem',
        textAlign: 'center', color: 'white'
      }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>{salon?.name}</h2>
        <p style={{ fontSize: '13px', opacity: 0.85 }}>📍 {salon?.city || 'Bosna i Hercegovina'}</p>
      </div>

      {/* Progress bar */}
      {korak < 6 && (
        <div style={{ background: 'white', padding: '12px 1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            {['Usluga', 'Uposlenik', 'Datum', 'Vrijeme', 'Podaci'].map((k, i) => (
              <span key={i} style={{
                fontSize: '10px', fontWeight: i + 1 <= korak ? '600' : '400',
                color: i + 1 <= korak ? '#1a7a4a' : '#bbb'
              }}>{k}</span>
            ))}
          </div>
          <div style={{ background: '#eee', borderRadius: '4px', height: '4px' }}>
            <div style={{
              background: '#1a7a4a', height: '4px', borderRadius: '4px',
              width: `${progress}%`, transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      )}

      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '1.5rem 1rem' }}>

        {/* Korak 1 — Usluga */}
        {korak === 1 && (
          <div>

            {/* O salonu */}
            {(salon?.description || salon?.address || salon?.phone) && (
              <div style={{
                background: 'white', borderRadius: '14px', padding: '1.25rem',
                marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                {salon?.description && (
                  <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.6', marginBottom: '12px' }}>
                    {salon.description}
                  </p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {salon?.address && (
                    <p style={{ fontSize: '13px', color: '#555' }}>📍 {salon.address}{salon.city ? `, ${salon.city}` : ''}</p>
                  )}
                  {salon?.phone && (
                    <a href={`tel:${salon.phone}`} style={{ fontSize: '13px', color: '#1a7a4a', textDecoration: 'none', fontWeight: '500' }}>
                      📞 {salon.phone}
                    </a>
                  )}
                </div>
              </div>
            )}

            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '1rem', color: '#1a1a1a' }}>
              Odaberite uslugu
            </h3>
            {usluge.map((u, i) => (
              <div key={i} onClick={() => { setOdabranaUsluga(u); setKorak(2) }} style={{
                background: 'white', borderRadius: '14px', padding: '1rem 1.25rem',
                marginBottom: '10px', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: '2px solid transparent',
                transition: 'border-color 0.2s'
              }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>{u.name}</p>
                  <p style={{ fontSize: '13px', color: '#555', marginTop: '3px' }}>⏱ {u.duration || u.duration_minutes} min</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a7a4a' }}>{u.price} KM</p>
                  <p style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>→</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Korak 2 — Uposlenik */}
        {korak === 2 && (
          <div>
            <button onClick={() => setKorak(1)} style={{
              background: 'none', border: 'none', color: '#1a7a4a', cursor: 'pointer',
              marginBottom: '1rem', fontSize: '14px', fontWeight: '500', padding: 0
            }}>
              ← Nazad
            </button>
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '1rem', color: '#1a1a1a' }}>
              Odaberite uposlenika
            </h3>
            <div onClick={() => { setOdabraniUposlenik(null); setKorak(3) }} style={{
              background: 'white', borderRadius: '14px', padding: '1rem 1.25rem',
              marginBottom: '10px', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: '14px'
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: '#f0f0f0', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px', flexShrink: 0
              }}>👥</div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>Bilo koji uposlenik</p>
                <p style={{ fontSize: '13px', color: '#555' }}>Prvi slobodni termin</p>
              </div>
            </div>
            {uposlenici.map((u, i) => (
              <div key={i} onClick={() => { setOdabraniUposlenik(u); setKorak(3) }} style={{
                background: 'white', borderRadius: '14px', padding: '1rem 1.25rem',
                marginBottom: '10px', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', gap: '14px',
                border: '2px solid ' + (odabraniUposlenik?.id === u.id ? '#1a7a4a' : 'transparent')
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: u.color || '#1a7a4a', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '18px', fontWeight: '700',
                  color: 'white', flexShrink: 0
                }}>
                  {u.name?.charAt(0)}
                </div>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>{u.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Korak 3 — Datum */}
{korak === 3 && (
  <div>
    <button onClick={() => setKorak(2)} style={{
      background: 'none', border: 'none', color: '#1a7a4a', cursor: 'pointer',
      marginBottom: '1rem', fontSize: '14px', fontWeight: '500', padding: 0
    }}>
      ← Nazad
    </button>
    <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '1rem', color: '#1a1a1a' }}>
      Odaberite datum
    </h3>

    {/* Prikaz radnog vremena po danima */}
    {salon?.working_hours && (() => {
      const daniRedoslijed = ['mon','tue','wed','thu','fri','sat','sun']
      const daniNazivi = { mon:'Pon', tue:'Uto', wed:'Sri', thu:'Čet', fri:'Pet', sat:'Sub', sun:'Ned' }
      const wh = typeof salon.working_hours === 'string'
        ? JSON.parse(salon.working_hours)
        : salon.working_hours
      return (
        <div style={{
          background: 'white', borderRadius: '14px', padding: '1rem 1.25rem',
          marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <p style={{ fontSize: '12px', color: '#888', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase' }}>
            Radno vrijeme
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {daniRedoslijed.map(dan => (
              <div key={dan} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontSize: '13px', color: wh[dan] ? '#333' : '#bbb', fontWeight: '500' }}>
                  {daniNazivi[dan]}
                </span>
                <span style={{ fontSize: '13px', color: wh[dan] ? '#1a7a4a' : '#bbb' }}>
                  {wh[dan] ? `${wh[dan].from} – ${wh[dan].to}` : 'Zatvoreno'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    })()}

    <div style={{ background: 'white', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <input
        type="date"
        min={minDatum()}
        max={maxDatum()}
        value={odabranDatum}
        onChange={e => {
          const noviDatum = e.target.value
          // Provjeri da li salon radi tog dana
          const wh = typeof salon?.working_hours === 'string'
            ? JSON.parse(salon.working_hours)
            : salon.working_hours
          const dayMap = { 0:'sun', 1:'mon', 2:'tue', 3:'wed', 4:'thu', 5:'fri', 6:'sat' }
          const dayKey = dayMap[new Date(noviDatum + 'T00:00:00').getDay()]
          if (!wh?.[dayKey]) {
            alert('Salon ne radi tog dana. Molimo odaberite drugi datum.')
            return
          }
          setOdabranDatum(noviDatum)
          setOdabranoVrijeme(null)
          setSlobodnaVremena([])
        }}
        style={{
          width: '100%', padding: '14px', border: '2px solid #eee',
          borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box',
          color: '#1a1a1a', outline: 'none'
        }}
      />

      {/* Prikaz radnog vremena za odabrani datum */}
      {odabranDatum && (() => {
        const wh = typeof salon?.working_hours === 'string'
          ? JSON.parse(salon.working_hours)
          : salon.working_hours
        const dayMap = { 0:'sun', 1:'mon', 2:'tue', 3:'wed', 4:'thu', 5:'fri', 6:'sat' }
        const dayKey = dayMap[new Date(odabranDatum + 'T00:00:00').getDay()]
        const hours = wh?.[dayKey]
        return hours ? (
          <p style={{ fontSize: '13px', color: '#1a7a4a', marginTop: '10px', textAlign: 'center', fontWeight: '500' }}>
            🕐 Radno vrijeme: {hours.from} – {hours.to}
          </p>
        ) : null
      })()}

      {!odabranDatum && (
        <p style={{ fontSize: '13px', color: '#666', marginTop: '10px', textAlign: 'center' }}>
          👆 Kliknite na polje iznad da odaberete datum
        </p>
      )}
      {odabranDatum && (
        <button onClick={() => { ucitajSlobodnaVremena(odabranDatum); setKorak(4) }} style={{
          width: '100%', marginTop: '1rem', background: '#1a7a4a', color: 'white',
          border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px',
          fontWeight: '600', cursor: 'pointer'
        }}>
          Dalje →
        </button>
      )}
    </div>
  </div>
)}

        {/* Korak 4 — Vrijeme */}
        {korak === 4 && (
          <div>
            <button onClick={() => setKorak(3)} style={{
              background: 'none', border: 'none', color: '#1a7a4a', cursor: 'pointer',
              marginBottom: '1rem', fontSize: '14px', fontWeight: '500', padding: 0
            }}>
              ← Nazad
            </button>
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '4px', color: '#1a1a1a' }}>
              Odaberite vrijeme
            </h3>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '1rem' }}>📅 {formatDatum(odabranDatum)}</p>
            {ucitavaVremena ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                <p>Učitavanje slobodnih termina...</p>
              </div>
            ) : slobodnaVremena.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '14px', padding: '2rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '32px', marginBottom: '12px' }}>{datumBlokiran ? '🚫' : '😔'}</p>
            <p style={{ color: '#555', fontWeight: '500' }}>
            {datumBlokiran ? 'Salon ne radi ovaj dan.' : 'Nema slobodnih termina za ovaj dan.'}
            </p>
            <button onClick={() => setKorak(3)} style={{
            marginTop: '1rem', background: '#1a7a4a', color: 'white',
            border: 'none', borderRadius: '10px', padding: '12px 24px', cursor: 'pointer',
            fontWeight: '600'
            }}>
            Odaberi drugi datum
            </button>
            </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {slobodnaVremena.map((slot, i) => (
                  <div key={i} onClick={() => { setOdabranoVrijeme(slot); setKorak(5) }} style={{
                    background: odabranoVrijeme === slot ? '#1a7a4a' : 'white',
                    color: odabranoVrijeme === slot ? 'white' : '#1a1a1a',
                    borderRadius: '10px', padding: '14px', textAlign: 'center',
                    cursor: 'pointer', fontSize: '15px', fontWeight: '600',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    border: '2px solid ' + (odabranoVrijeme === slot ? '#1a7a4a' : '#eee')
                  }}>
                    {formatVrijeme(slot)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Korak 5 — Podaci */}
        {korak === 5 && (
          <div>
            <button onClick={() => setKorak(4)} style={{
              background: 'none', border: 'none', color: '#1a7a4a', cursor: 'pointer',
              marginBottom: '1rem', fontSize: '14px', fontWeight: '500', padding: 0
            }}>
              ← Nazad
            </button>
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '1rem', color: '#1a1a1a' }}>
              Vaši podaci
            </h3>
            <div style={{ background: 'white', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              {[
                { label: 'Ime i prezime', key: 'ime', type: 'text', placeholder: 'Ana Hodžić', value: ime, set: setIme },
                { label: 'Broj telefona', key: 'tel', type: 'tel', placeholder: '061 123 456', value: telefon, set: setTelefon },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'ana@gmail.com', value: email, set: setEmail },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '13px', color: '#333', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                    {f.label}
                    {f.key === 'email' && <span style={{ color: '#e24b4a' }}> *</span>}
                    
                  </label>
                  <input
                    type={f.type}
                    value={f.value}
                    onChange={e => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    style={{
                      width: '100%', padding: '12px 14px', border: '2px solid #eee',
                      borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box',
                      color: '#1a1a1a', outline: 'none'
                    }}
                  />
                </div>
              ))}

              {/* Pregled */}
              <div style={{
                background: '#f8f9fa', borderRadius: '10px', padding: '1rem',
                marginBottom: '1.5rem', marginTop: '0.5rem'
              }}>
                <p style={{ fontSize: '12px', color: '#888', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pregled termina</p>
                <p style={{ fontSize: '14px', color: '#1a1a1a', marginBottom: '6px' }}>📋 {odabranaUsluga?.name}</p>
                {odabraniUposlenik && <p style={{ fontSize: '14px', color: '#1a1a1a', marginBottom: '6px' }}>✂️ {odabraniUposlenik.name}</p>}
                <p style={{ fontSize: '14px', color: '#1a1a1a', marginBottom: '6px' }}>📅 {formatDatum(odabranDatum)}</p>
                <p style={{ fontSize: '14px', color: '#1a1a1a', marginBottom: '6px' }}>🕐 {formatVrijeme(odabranoVrijeme)}</p>
                <p style={{ fontSize: '15px', fontWeight: '700', color: '#1a7a4a' }}>💰 {odabranaUsluga?.price} KM</p>
              </div>

              {greska && <p style={{ color: '#e24b4a', fontSize: '13px', marginBottom: '1rem' }}>{greska}</p>}

              <button
                onClick={zakaziTermin}
                disabled={!ime || (!telefon && !email) || saljeZahtjev}
                style={{
                  width: '100%',
                  background: (!ime || (!telefon && !email)) ? '#ccc' : '#1a7a4a',
                  color: 'white', border: 'none', borderRadius: '10px',
                  padding: '16px', fontSize: '16px', fontWeight: '700',
                  cursor: (!ime || (!telefon && !email)) ? 'not-allowed' : 'pointer'
                }}>
                {saljeZahtjev ? 'Zakazivanje...' : '✅ Potvrdi termin'}
              </button>
            </div>
          </div>
        )}

        {/* Korak 6 — Potvrda */}
        {korak === 6 && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#eaf3de', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '40px', margin: '0 auto 1.5rem'
            }}>🎉</div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>
              Termin zakazan!
            </h3>
            <p style={{ color: '#555', fontSize: '15px', marginBottom: '2rem' }}>
              Vidimo se {formatDatum(odabranDatum)} u {formatVrijeme(odabranoVrijeme)}
            </p>
            <div style={{
              background: 'white', borderRadius: '14px', padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'left', marginBottom: '1.5rem'
            }}>
              <p style={{ fontSize: '14px', color: '#1a1a1a', marginBottom: '8px' }}>📋 {odabranaUsluga?.name}</p>
              {odabraniUposlenik && <p style={{ fontSize: '14px', color: '#1a1a1a', marginBottom: '8px' }}>✂️ {odabraniUposlenik.name}</p>}
              <p style={{ fontSize: '14px', color: '#1a1a1a', marginBottom: '8px' }}>📅 {formatDatum(odabranDatum)}</p>
              <p style={{ fontSize: '14px', color: '#1a1a1a', marginBottom: '8px' }}>🕐 {formatVrijeme(odabranoVrijeme)}</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a7a4a' }}>💰 {odabranaUsluga?.price} KM</p>
            </div>
            <p style={{ color: '#555', fontSize: '13px' }}>
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