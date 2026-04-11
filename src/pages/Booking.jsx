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
  const [galerija, setGalerija] = useState([])
  const [waitlistIme, setWaitlistIme] = useState('')
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistUspjeh, setWaitlistUspjeh] = useState(false)
  const [waitlistGreska, setWaitlistGreska] = useState('')
  const [recenzije, setRecenzije] = useState([])
  const [avgOcjena, setAvgOcjena] = useState(null)

  useEffect(() => { ucitajSalon() }, [])

  async function ucitajSalon() {
    try {
      const res = await axios.get(API + `/api/public/b/${slug}`)
      setSalon(res.data.business)
      setUsluge(res.data.services || [])
      setUposlenici(res.data.staff || [])
      try {
        const galRes = await axios.get(API + `/api/public/b/${slug}/gallery`)
        setGalerija(galRes.data.gallery || [])
      } catch (e) {}
      try {
  const revRes = await axios.get(API + `/api/reviews/business/${slug}`)
  setRecenzije(revRes.data.reviews || [])
  setAvgOcjena(revRes.data.avg_rating)
} catch (e) {}
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
async function dodajNaWaitlist() {
  if (!waitlistIme || !waitlistEmail) { setWaitlistGreska('Unesite ime i email.'); return }
  try {
    await axios.post(API + `/api/waitlist/b/${slug}`, {
      name: waitlistIme, email: waitlistEmail,
      serviceId: odabranaUsluga.id,
      date: odabranDatum, time: '00:00'
    })
    setWaitlistUspjeh(true)
  } catch (err) {
    setWaitlistGreska('Greška pri dodavanju na listu čekanja.')
  }
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

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px', fontSize: '15px',
    color: '#f0f4ff', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'Inter, sans-serif'
  }

  const karticaStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px', padding: '1rem 1.25rem',
    marginBottom: '10px',
  }

  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1628' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#6b7fa3', fontSize: '14px' }}>Učitavanje...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (greska && !salon) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1628' }}>
      <p style={{ color: '#f87171' }}>{greska}</p>
    </div>
  )

  const ukupnoKoraka = 5
  const progress = ((korak - 1) / (ukupnoKoraka - 1)) * 100

  return (
    <div style={{ minHeight: '100vh', background: '#0d1628', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2d1f 0%, #0d1628 100%)',
        borderBottom: '1px solid rgba(74,222,128,0.15)',
        padding: '1.5rem 1.5rem 2rem',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 120%, rgba(74,222,128,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px', position: 'relative' }}>
          {salon?.name}
        </h2>
        <p style={{ fontSize: '13px', color: '#4ade80', position: 'relative', margin: 0 }}>
          📍 {salon?.city || 'Bosna i Hercegovina'}
        </p>
      </div>

      {/* Progress bar */}
      {korak < 6 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            {['Usluga', 'Uposlenik', 'Datum', 'Vrijeme', 'Podaci'].map((k, i) => (
              <span key={i} style={{
                fontSize: '10px', fontWeight: i + 1 <= korak ? '600' : '400',
                color: i + 1 <= korak ? '#4ade80' : '#8b9ec7'
              }}>{k}</span>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '4px' }}>
            <div style={{
              background: 'linear-gradient(to right, #16a34a, #4ade80)',
              height: '4px', borderRadius: '4px',
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
              <div style={{ ...karticaStyle, marginBottom: '1rem' }}>
                {salon?.description && (
                  <p style={{ fontSize: '14px', color: '#c8d0e8', lineHeight: '1.6', marginBottom: '12px' }}>
                    {salon.description}
                  </p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {salon?.address && (
                    <p style={{ fontSize: '13px', color: '#8b9ec7', margin: 0 }}>📍 {salon.address}{salon.city ? `, ${salon.city}` : ''}</p>
                  )}
                  {salon?.phone && (
                    <a href={`tel:${salon.phone}`} style={{ fontSize: '13px', color: '#4ade80', textDecoration: 'none', fontWeight: '500' }}>
                      📞 {salon.phone}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Galerija */}
            {galerija.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '13px', color: '#4ade80', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  ✨ Naši radovi
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {galerija.map((slika, i) => (
                    <img key={i} src={slika.image_url} alt="Rad salona"
                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px', border: '1px solid rgba(74,222,128,0.2)' }}
                    />
                  ))}
                </div>
              </div>
            )}
            {recenzije.length > 0 && (
  <div style={{ marginBottom: '1.25rem' }}>
    <p style={{ fontSize: '13px', color: '#4ade80', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
      ⭐ Recenzije klijenata
    </p>
    <div style={{ ...karticaStyle, marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <span style={{ fontSize: '32px', fontWeight: '700', color: '#fbbf24' }}>{avgOcjena}</span>
        <div>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ fontSize: '16px', opacity: i <= Math.round(avgOcjena) ? 1 : 0.3 }}>⭐</span>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#6b7fa3', margin: '2px 0 0' }}>{recenzije.length} recenzija</p>
        </div>
      </div>
      {recenzije.slice(0, 3).map((r, i) => (
        <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f7' }}>{r.client_name}</span>
            <span style={{ fontSize: '12px', color: '#fbbf24' }}>{'⭐'.repeat(r.rating)}</span>
          </div>
          {r.comment && <p style={{ fontSize: '13px', color: '#8b9ec7', margin: 0 }}>{r.comment}</p>}
        </div>
      ))}
    </div>
  </div>
)}
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '1rem', color: '#f0f4ff' }}>
              Odaberite uslugu
            </h3>
            {usluge.map((u, i) => (
              <div key={i} onClick={() => { setOdabranaUsluga(u); setKorak(2) }} style={{
                ...karticaStyle,
                cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)'; e.currentTarget.style.background = 'rgba(74,222,128,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              >
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: '#e2e8f7', margin: 0 }}>{u.name}</p>
                  <p style={{ fontSize: '13px', color: '#6b7fa3', marginTop: '3px' }}>⏱ {u.duration || u.duration_minutes} min</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#4ade80', margin: 0 }}>{u.price} KM</p>
                  <p style={{ fontSize: '11px', color: '#4a5a7a', marginTop: '2px' }}>→</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Korak 2 — Uposlenik */}
        {korak === 2 && (
          <div>
            <button onClick={() => setKorak(1)} style={{
              background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer',
              marginBottom: '1rem', fontSize: '14px', fontWeight: '500', padding: 0
            }}>← Nazad</button>
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '1rem', color: '#f0f4ff' }}>
              Odaberite uposlenika
            </h3>
            <div onClick={() => { setOdabraniUposlenik(null); setKorak(3) }} style={{
              ...karticaStyle, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '14px'
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'rgba(74,222,128,0.15)',
                border: '2px solid rgba(74,222,128,0.3)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px', flexShrink: 0
              }}>🙋</div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#e2e8f7', margin: 0 }}>Bilo koji uposlenik</p>
                <p style={{ fontSize: '13px', color: '#6b7fa3', marginTop: '2px' }}>Prvi slobodni termin</p>
              </div>
            </div>
            {uposlenici.map((u, i) => (
              <div key={i} onClick={() => { setOdabraniUposlenik(u); setKorak(3) }} style={{
                ...karticaStyle, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '14px',
                borderColor: odabraniUposlenik?.id === u.id ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: u.color || '#16a34a', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '18px', fontWeight: '700',
                  color: 'white', flexShrink: 0
                }}>
                  {u.name?.charAt(0)}
                </div>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#e2e8f7', margin: 0 }}>{u.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Korak 3 — Datum */}
        {korak === 3 && (
          <div>
            <button onClick={() => setKorak(2)} style={{
              background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer',
              marginBottom: '1rem', fontSize: '14px', fontWeight: '500', padding: 0
            }}>← Nazad</button>
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '1rem', color: '#f0f4ff' }}>
              Odaberite datum
            </h3>

            {salon?.working_hours && (() => {
              const daniRedoslijed = ['mon','tue','wed','thu','fri','sat','sun']
              const daniNazivi = { mon:'Pon', tue:'Uto', wed:'Sri', thu:'Čet', fri:'Pet', sat:'Sub', sun:'Ned' }
              const wh = typeof salon.working_hours === 'string' ? JSON.parse(salon.working_hours) : salon.working_hours
              return (
                <div style={{ ...karticaStyle, marginBottom: '1rem' }}>
                  <p style={{ fontSize: '12px', color: '#4ade80', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🕐 Radno vrijeme
                  </p>
                  {daniRedoslijed.map(dan => (
                    <div key={dan} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', color: wh[dan] ? '#c8d0e8' : '#4a5a7a', fontWeight: '500' }}>
                        {daniNazivi[dan]}
                      </span>
                      <span style={{ fontSize: '13px', color: wh[dan] ? '#4ade80' : '#4a5a7a' }}>
                        {wh[dan] ? `${wh[dan].from} – ${wh[dan].to}` : 'Zatvoreno'}
                      </span>
                    </div>
                  ))}
                </div>
              )
            })()}

            <div style={{ ...karticaStyle }}>
              <input
                type="date" min={minDatum()} max={maxDatum()} value={odabranDatum}
                onChange={e => {
                  const noviDatum = e.target.value
                  const wh = typeof salon?.working_hours === 'string' ? JSON.parse(salon.working_hours) : salon.working_hours
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
                  width: '100%', padding: '14px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px', fontSize: '15px',
                  boxSizing: 'border-box', color: '#f0f4ff', outline: 'none',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
              {odabranDatum && (() => {
                const wh = typeof salon?.working_hours === 'string' ? JSON.parse(salon.working_hours) : salon.working_hours
                const dayMap = { 0:'sun', 1:'mon', 2:'tue', 3:'wed', 4:'thu', 5:'fri', 6:'sat' }
                const dayKey = dayMap[new Date(odabranDatum + 'T00:00:00').getDay()]
                const hours = wh?.[dayKey]
                return hours ? (
                  <p style={{ fontSize: '13px', color: '#4ade80', marginTop: '10px', textAlign: 'center', fontWeight: '500' }}>
                    🕐 Radno vrijeme: {hours.from} – {hours.to}
                  </p>
                ) : null
              })()}
              {!odabranDatum && (
                <p style={{ fontSize: '13px', color: '#6b7fa3', marginTop: '10px', textAlign: 'center' }}>
                  👆 Kliknite na polje iznad da odaberete datum
                </p>
              )}
              {odabranDatum && (
                <button onClick={() => { ucitajSlobodnaVremena(odabranDatum); setKorak(4) }} style={{
                  width: '100%', marginTop: '1rem', background: '#16a34a', color: 'white',
                  border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px',
                  fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
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
              background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer',
              marginBottom: '1rem', fontSize: '14px', fontWeight: '500', padding: 0
            }}>← Nazad</button>
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '4px', color: '#f0f4ff' }}>
              Odaberite vrijeme
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7fa3', marginBottom: '1rem' }}>📅 {formatDatum(odabranDatum)}</p>
            {ucitavaVremena ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7fa3' }}>
                <div style={{ width: '32px', height: '32px', border: '3px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
                <p>Učitavanje slobodnih termina...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : slobodnaVremena.length === 0 ? (
  <div>
    <div style={{ ...karticaStyle, textAlign: 'center', padding: '2rem', marginBottom: '1rem' }}>
      <p style={{ fontSize: '32px', marginBottom: '12px' }}>{datumBlokiran ? '🚫' : '😔'}</p>
      <p style={{ color: '#c8d0e8', fontWeight: '500' }}>
        {datumBlokiran ? 'Salon ne radi ovaj dan.' : 'Nema slobodnih termina za ovaj dan.'}
      </p>
      <button onClick={() => setKorak(3)} style={{
        marginTop: '1rem', background: '#16a34a', color: 'white',
        border: 'none', borderRadius: '10px', padding: '12px 24px',
        cursor: 'pointer', fontWeight: '600', fontFamily: 'Inter, sans-serif'
      }}>
        Odaberi drugi datum
      </button>
    </div>

    {!datumBlokiran && (
      <div style={{ ...karticaStyle, padding: '1.5rem' }}>
        <p style={{ fontSize: '14px', fontWeight: '700', color: '#4ade80', marginBottom: '4px' }}>
          📋 Lista čekanja
        </p>
        <p style={{ fontSize: '13px', color: '#6b7fa3', marginBottom: '1rem' }}>
          Dodajte se na listu čekanja — obavijestit ćemo vas ako se termin oslobodi!
        </p>
        {waitlistUspjeh ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <p style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</p>
            <p style={{ color: '#4ade80', fontWeight: '600' }}>Dodani ste na listu čekanja!</p>
            <p style={{ fontSize: '13px', color: '#6b7fa3', marginTop: '4px' }}>Javit ćemo vam se čim se termin oslobodi.</p>
          </div>
        ) : (
          <div>
            {[
              { label: 'Ime i prezime', type: 'text', placeholder: 'Ana Hodžić', value: waitlistIme, set: setWaitlistIme },
              { label: 'Email', type: 'email', placeholder: 'ana@gmail.com', value: waitlistEmail, set: setWaitlistEmail },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>{f.label}</label>
                <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)}
                  placeholder={f.placeholder} style={inputStyle} />
              </div>
            ))}
            {waitlistGreska && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '8px' }}>{waitlistGreska}</p>}
            <button onClick={dodajNaWaitlist} style={{
              width: '100%', background: '#16a34a', color: 'white', border: 'none',
              borderRadius: '10px', padding: '12px', fontSize: '14px',
              fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: '8px'
            }}>
              Dodaj me na listu čekanja
            </button>
          </div>
        )}
      </div>
    )}
  </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {slobodnaVremena.map((slot, i) => (
                  <div key={i} onClick={() => { setOdabranoVrijeme(slot); setKorak(5) }} style={{
                    background: odabranoVrijeme === slot ? '#16a34a' : 'rgba(255,255,255,0.06)',
                    color: odabranoVrijeme === slot ? 'white' : '#e2e8f7',
                    borderRadius: '10px', padding: '14px', textAlign: 'center',
                    cursor: 'pointer', fontSize: '15px', fontWeight: '600',
                    border: '1px solid ' + (odabranoVrijeme === slot ? '#16a34a' : 'rgba(255,255,255,0.1)'),
                    transition: 'all 0.15s'
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
              background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer',
              marginBottom: '1rem', fontSize: '14px', fontWeight: '500', padding: 0
            }}>← Nazad</button>
            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '1rem', color: '#f0f4ff' }}>
              Vaši podaci
            </h3>
            <div style={{ ...karticaStyle, padding: '1.5rem' }}>
              {[
                { label: 'Ime i prezime', key: 'ime', type: 'text', placeholder: 'Ana Hodžić', value: ime, set: setIme },
                { label: 'Broj telefona', key: 'tel', type: 'tel', placeholder: '061 123 456', value: telefon, set: setTelefon },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'ana@gmail.com', value: email, set: setEmail },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '13px', color: '#8b9ec7', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                    {f.label}
                    {f.key === 'email' && <span style={{ color: '#f87171' }}> *</span>}
                  </label>
                  <input
                    type={f.type} value={f.value}
                    onChange={e => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    style={inputStyle}
                  />
                </div>
              ))}

              {/* Pregled */}
              <div style={{
                background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)',
                borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', marginTop: '0.5rem'
              }}>
                <p style={{ fontSize: '12px', color: '#4ade80', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Pregled termina
                </p>
                <p style={{ fontSize: '14px', color: '#c8d0e8', marginBottom: '6px' }}>📋 {odabranaUsluga?.name}</p>
                {odabraniUposlenik && <p style={{ fontSize: '14px', color: '#c8d0e8', marginBottom: '6px' }}>👤 {odabraniUposlenik.name}</p>}
                <p style={{ fontSize: '14px', color: '#c8d0e8', marginBottom: '6px' }}>📅 {formatDatum(odabranDatum)}</p>
                <p style={{ fontSize: '14px', color: '#c8d0e8', marginBottom: '6px' }}>🕐 {formatVrijeme(odabranoVrijeme)}</p>
                <p style={{ fontSize: '15px', fontWeight: '700', color: '#4ade80' }}>💰 {odabranaUsluga?.price} KM</p>
              </div>

              {greska && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '1rem' }}>{greska}</p>}

              <button
                onClick={zakaziTermin}
                disabled={!ime || (!telefon && !email) || saljeZahtjev}
                style={{
                  width: '100%',
                  background: (!ime || (!telefon && !email)) ? 'rgba(255,255,255,0.1)' : '#16a34a',
                  color: (!ime || (!telefon && !email)) ? '#6b7fa3' : 'white',
                  border: 'none', borderRadius: '10px',
                  padding: '16px', fontSize: '16px', fontWeight: '700',
                  cursor: (!ime || (!telefon && !email)) ? 'not-allowed' : 'pointer',
                  fontFamily: 'Inter, sans-serif'
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
              background: 'rgba(74,222,128,0.15)', border: '2px solid rgba(74,222,128,0.3)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '40px', margin: '0 auto 1.5rem'
            }}>🎉</div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#f0f4ff', marginBottom: '8px' }}>
              Termin zakazan!
            </h3>
            <p style={{ color: '#8b9ec7', fontSize: '15px', marginBottom: '2rem' }}>
              Vidimo se {formatDatum(odabranDatum)} u {formatVrijeme(odabranoVrijeme)}
            </p>
            <div style={{ ...karticaStyle, textAlign: 'left', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '14px', color: '#c8d0e8', marginBottom: '8px' }}>📋 {odabranaUsluga?.name}</p>
              {odabraniUposlenik && <p style={{ fontSize: '14px', color: '#c8d0e8', marginBottom: '8px' }}>👤 {odabraniUposlenik.name}</p>}
              <p style={{ fontSize: '14px', color: '#c8d0e8', marginBottom: '8px' }}>📅 {formatDatum(odabranDatum)}</p>
              <p style={{ fontSize: '14px', color: '#c8d0e8', marginBottom: '8px' }}>🕐 {formatVrijeme(odabranoVrijeme)}</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#4ade80' }}>💰 {odabranaUsluga?.price} KM</p>
            </div>
            <p style={{ color: '#6b7fa3', fontSize: '13px' }}>
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
