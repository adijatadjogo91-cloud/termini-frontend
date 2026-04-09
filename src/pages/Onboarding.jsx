import { useState } from 'react'

const API = 'https://termini-pro.onrender.com'

const DANI = [
  { key: 'mon', naziv: 'Pon' },
  { key: 'tue', naziv: 'Uto' },
  { key: 'wed', naziv: 'Sri' },
  { key: 'thu', naziv: 'Čet' },
  { key: 'fri', naziv: 'Pet' },
  { key: 'sat', naziv: 'Sub' },
  { key: 'sun', naziv: 'Ned' },
]

export default function Onboarding({ biznis, onZavrsi }) {
  const [korak, setKorak] = useState(1)
  const [sprema, setSprema] = useState(false)
  const [greska, setGreska] = useState('')

  // Korak 2 — podaci
  const [naziv, setNaziv] = useState(biznis?.name || '')
  const [grad, setGrad] = useState(biznis?.city || '')
  const [telefon, setTelefon] = useState(biznis?.phone || '')
  const [opis, setOpis] = useState(biznis?.description || '')

  // Korak 3 — radno vrijeme
  const [radnoVrijeme, setRadnoVrijeme] = useState({
    mon: { active: true, from: '09:00', to: '17:00' },
    tue: { active: true, from: '09:00', to: '17:00' },
    wed: { active: true, from: '09:00', to: '17:00' },
    thu: { active: true, from: '09:00', to: '17:00' },
    fri: { active: true, from: '09:00', to: '17:00' },
    sat: { active: true, from: '09:00', to: '14:00' },
    sun: { active: false, from: '09:00', to: '14:00' },
  })

  // Korak 4 — usluga
  const [uslugaNaziv, setUslugaNaziv] = useState('')
  const [uslugaCijena, setUslugaCijena] = useState('')
  const [uslugaTrajanje, setUslugaTrajanje] = useState(60)

  const token = localStorage.getItem('token')
  const businessId = localStorage.getItem('businessId')

  const ukupnoKoraka = 5
  const progress = ((korak - 1) / (ukupnoKoraka - 1)) * 100

  async function spremiPodatke() {
    if (!naziv.trim()) { setGreska('Unesite naziv salona.'); return }
    setSprema(true); setGreska('')
    try {
      await fetch(`${API}/api/businesses/${businessId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: naziv, city: grad, phone: telefon, description: opis })
      })
      setKorak(3)
    } catch (err) {
      setGreska('Greška pri čuvanju. Pokušajte ponovo.')
    }
    setSprema(false)
  }

  async function spremiRadnoVrijeme() {
    setSprema(true); setGreska('')
    const working_hours = {}
    DANI.forEach(({ key }) => {
      if (radnoVrijeme[key].active) working_hours[key] = { from: radnoVrijeme[key].from, to: radnoVrijeme[key].to }
    })
    try {
      await fetch(`${API}/api/businesses/${businessId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ working_hours })
      })
      setKorak(4)
    } catch (err) {
      setGreska('Greška pri čuvanju. Pokušajte ponovo.')
    }
    setSprema(false)
  }

  async function spremiUslugu() {
    if (!uslugaNaziv.trim()) { setGreska('Unesite naziv usluge.'); return }
    if (!uslugaCijena) { setGreska('Unesite cijenu usluge.'); return }
    setSprema(true); setGreska('')
    try {
      await fetch(`${API}/api/services/${businessId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: uslugaNaziv, price: parseFloat(uslugaCijena), duration: uslugaTrajanje })
      })
      setKorak(5)
    } catch (err) {
      setGreska('Greška pri čuvanju. Pokušajte ponovo.')
    }
    setSprema(false)
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', fontSize: '14px',
    color: '#f0f4ff', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'Inter, sans-serif'
  }

  const labelStyle = {
    fontSize: '13px', color: '#8b9ec7',
    display: 'block', marginBottom: '6px'
  }

  const btnPrimary = {
    width: '100%', background: '#16a34a', color: 'white',
    border: 'none', borderRadius: '10px', padding: '13px',
    fontSize: '15px', fontWeight: '600', cursor: 'pointer',
    fontFamily: 'Inter, sans-serif', marginTop: '8px'
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0f1e',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', padding: '1rem'
    }}>
      {/* Radijalni gradijent u pozadini */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 50% at 20% 40%, rgba(74,222,128,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 80% 60%, rgba(99,102,241,0.08) 0%, transparent 60%)
        `
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '480px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px', padding: '2rem',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#f0f4ff', margin: 0 }}>
            termini<span style={{ color: '#4ade80' }}>.pro</span>
          </h2>
        </div>

        {/* Progress bar */}
        {korak < 5 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              {['Dobrodošli', 'Podaci', 'Radno vrijeme', 'Usluga'].map((k, i) => (
                <span key={i} style={{
                  fontSize: '10px', fontWeight: i + 1 <= korak ? '600' : '400',
                  color: i + 1 <= korak ? '#4ade80' : '#4a5a7a'
                }}>{k}</span>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '4px' }}>
              <div style={{
                background: '#16a34a', height: '4px', borderRadius: '4px',
                width: `${progress}%`, transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        )}

        {/* Greška */}
        {greska && (
          <div style={{
            background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)',
            color: '#f87171', padding: '10px 14px', borderRadius: '10px',
            marginBottom: '16px', fontSize: '13px'
          }}>
            {greska}
          </div>
        )}

        {/* KORAK 1 — Dobrodošli */}
        {korak === 1 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#f0f4ff', marginBottom: '12px' }}>
              Dobrodošli u termini.pro!
            </h3>
            <p style={{ color: '#8b9ec7', fontSize: '15px', lineHeight: '1.7', marginBottom: '2rem' }}>
              Hajmo postaviti vaš salon za <strong style={{ color: '#4ade80' }}>5 minuta</strong>.<br />
              Vodit ćemo vas korak po korak.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem', textAlign: 'left' }}>
              {[
                { icon: '📋', text: 'Osnovni podaci salona' },
                { icon: '🕐', text: 'Radno vrijeme' },
                { icon: '📌', text: 'Prva usluga' },
                { icon: '🔗', text: 'Vaš booking link spreman' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px' }}>
                  <span style={{ fontSize: '18px' }}>{s.icon}</span>
                  <span style={{ fontSize: '14px', color: '#c8d0e8' }}>{s.text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setKorak(2)} style={btnPrimary}>
              Krećemo! →
            </button>
          </div>
        )}

        {/* KORAK 2 — Osnovni podaci */}
        {korak === 2 && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
              📋 Osnovni podaci
            </h3>
            <p style={{ color: '#6b7fa3', fontSize: '13px', marginBottom: '1.25rem' }}>
              Kako se zove vaš salon i gdje se nalazi?
            </p>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Naziv salona *</label>
              <input type="text" value={naziv} onChange={e => setNaziv(e.target.value)} placeholder="Salon Amra" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Grad</label>
              <input type="text" value={grad} onChange={e => setGrad(e.target.value)} placeholder="Sarajevo" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Telefon</label>
              <input type="tel" value={telefon} onChange={e => setTelefon(e.target.value)} placeholder="061 123 456" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Kratki opis (opciono)</label>
              <textarea
                value={opis} onChange={e => setOpis(e.target.value)}
                placeholder="Npr. Frizerski salon u centru Sarajeva..."
                rows={2}
                style={{ ...inputStyle, resize: 'none', padding: '11px 14px' }}
              />
            </div>
            <button onClick={spremiPodatke} disabled={sprema} style={btnPrimary}>
              {sprema ? 'Čuvanje...' : 'Nastavi →'}
            </button>
          </div>
        )}

        {/* KORAK 3 — Radno vrijeme */}
        {korak === 3 && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
              🕐 Radno vrijeme
            </h3>
            <p style={{ color: '#6b7fa3', fontSize: '13px', marginBottom: '1.25rem' }}>
              Kada vaš salon radi? Klijenti će moći bookirati samo u ovo vrijeme.
            </p>
            {DANI.map(({ key, naziv }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={radnoVrijeme[key].active}
                  onChange={e => setRadnoVrijeme({ ...radnoVrijeme, [key]: { ...radnoVrijeme[key], active: e.target.checked } })}
                  style={{ accentColor: '#4ade80', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ width: '36px', fontSize: '13px', color: radnoVrijeme[key].active ? '#e2e8f7' : '#4a5a7a', fontWeight: '500' }}>
                  {naziv}
                </span>
                {radnoVrijeme[key].active ? (
                  <>
                    <input type="time" value={radnoVrijeme[key].from}
                      onChange={e => setRadnoVrijeme({ ...radnoVrijeme, [key]: { ...radnoVrijeme[key], from: e.target.value } })}
                      style={{ ...inputStyle, width: 'auto', padding: '7px 10px', flex: 1 }}
                    />
                    <span style={{ color: '#6b7fa3', fontSize: '13px' }}>—</span>
                    <input type="time" value={radnoVrijeme[key].to}
                      onChange={e => setRadnoVrijeme({ ...radnoVrijeme, [key]: { ...radnoVrijeme[key], to: e.target.value } })}
                      style={{ ...inputStyle, width: 'auto', padding: '7px 10px', flex: 1 }}
                    />
                  </>
                ) : (
                  <span style={{ fontSize: '12px', color: '#4a5a7a' }}>Zatvoreno</span>
                )}
              </div>
            ))}
            <button onClick={spremiRadnoVrijeme} disabled={sprema} style={{ ...btnPrimary, marginTop: '16px' }}>
              {sprema ? 'Čuvanje...' : 'Nastavi →'}
            </button>
          </div>
        )}

        {/* KORAK 4 — Prva usluga */}
        {korak === 4 && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
              📌 Vaša prva usluga
            </h3>
            <p style={{ color: '#6b7fa3', fontSize: '13px', marginBottom: '1.25rem' }}>
              Dodajte prvu uslugu — možete dodati više kasnije.
            </p>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Naziv usluge *</label>
              <input type="text" value={uslugaNaziv} onChange={e => setUslugaNaziv(e.target.value)} placeholder="npr. Šišanje, Manikir, Masaža..." style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Cijena (KM) *</label>
                <input type="number" value={uslugaCijena} onChange={e => setUslugaCijena(e.target.value)} placeholder="30" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Trajanje (min)</label>
                <select value={uslugaTrajanje} onChange={e => setUslugaTrajanje(parseInt(e.target.value))} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {[15, 20, 30, 45, 60, 90, 120].map(d => (
                    <option key={d} value={d} style={{ background: '#1a2035' }}>{d} min</option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={spremiUslugu} disabled={sprema} style={btnPrimary}>
              {sprema ? 'Čuvanje...' : 'Nastavi →'}
            </button>
          </div>
        )}

        {/* KORAK 5 — Gotovo! */}
        {korak === 5 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🚀</div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#f0f4ff', marginBottom: '12px' }}>
              Vaš salon je spreman!
            </h3>
            <p style={{ color: '#8b9ec7', fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Čestitamo! Klijenti već mogu bookirati termine na vašem linku:
            </p>
            <div style={{
              background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)',
              borderRadius: '12px', padding: '14px 16px', marginBottom: '1.5rem'
            }}>
              <p style={{ fontSize: '13px', color: '#4ade80', fontWeight: '600', marginBottom: '4px' }}>
                🔗 Vaš booking link
              </p>
              <p style={{ fontSize: '14px', color: '#c8d0e8', wordBreak: 'break-all' }}>
                termini.pro/booking/{biznis?.slug}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://termini.pro/booking/${biznis?.slug}`)
                  alert('Link kopiran!')
                }}
                style={{
                  ...btnPrimary, background: 'rgba(74,222,128,0.12)',
                  border: '1px solid rgba(74,222,128,0.25)', color: '#4ade80',
                  marginTop: 0
                }}
              >
                Kopiraj booking link
              </button>
              <button onClick={onZavrsi} style={{ ...btnPrimary, marginTop: 0 }}>
                Idi na Dashboard →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
