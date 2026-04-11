import { useState } from 'react'
import axios from 'axios'

const API = 'https://termini-pro.onrender.com'

function Register() {
  const [korak, setKorak] = useState(1)
  const [ime, setIme] = useState('')
  const [prezime, setPrezime] = useState('')
  const [email, setEmail] = useState('')
  const [lozinka, setLozinka] = useState('')
  const [salon, setSalon] = useState('')
  const [grad, setGrad] = useState('')
  const [plan, setPlan] = useState('starter')
  const [greska, setGreska] = useState('')
  const [ucitava, setUcitava] = useState(false)

  function handleKorak1() {
    setGreska('')
    if (!ime || !prezime) { setGreska('Unesite ime i prezime.'); return }
    if (!email || !email.includes('@')) { setGreska('Unesite ispravnu email adresu.'); return }
    if (lozinka.length < 8) { setGreska('Lozinka mora imati najmanje 8 znakova.'); return }
    setKorak(2)
  }

  async function handleRegistracija() {
    setGreska('')
    if (!salon) { setGreska('Unesite naziv salona.'); return }
    setUcitava(true)
    try {
      await axios.post(API + '/api/auth/register', {
        name: ime + ' ' + prezime,
        email: email,
        password: lozinka,
        businessName: salon,
        businessType: 'salon',
        city: grad,
        plan: plan
      })
      window.location.href = '/login'
    } catch (err) {
      setGreska(err.response?.data?.error || 'Greška pri registraciji.')
    }
    setUcitava(false)
  }

  const inputStyle = {
    width: '100%', height: '46px', padding: '0 14px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', fontSize: '14px',
    color: '#f0f4ff', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'Inter, sans-serif'
  }

  const labelStyle = {
    display: 'block', fontSize: '13px',
    color: '#8b9ec7', marginBottom: '6px'
  }

  const planovi = [
    {
      id: 'starter',
      naziv: 'Starter',
      cijena: '59 KM',
      opis: 'Za početnike',
      features: ['Email podsjetnici', 'AI asistent (20/dan)', 'Booking stranica'],
    },
    {
      id: 'premium',
      naziv: 'Premium',
      cijena: '119 KM',
      opis: 'Najpopularnije',
      features: ['SMS podsjetnici', 'AI neograničeno', 'WhatsApp'],
      popular: true,
    },
  ]

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0f1e', fontFamily: 'Inter, sans-serif', padding: '1rem',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Gradijent pozadina */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 50% at 20% 40%, rgba(74,222,128,0.1) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 80% 60%, rgba(99,102,241,0.1) 0%, transparent 60%)
        `
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '2.5rem 2rem', borderRadius: '20px',
        width: '100%', maxWidth: '420px',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f4ff', margin: '0 0 8px' }}>
            termini<span style={{ color: '#4ade80' }}>.pro</span>
          </h2>
          <p style={{ color: '#6b7fa3', fontSize: '14px', margin: 0 }}>
            Kreirajte vaš nalog — 14 dana besplatno
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: '#16a34a' }} />
          <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: korak === 2 ? '#16a34a' : 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Greška */}
        {greska && (
          <div style={{
            background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)',
            color: '#f87171', padding: '10px 14px', borderRadius: '10px',
            marginBottom: '1rem', fontSize: '14px'
          }}>
            {greska}
          </div>
        )}

        {/* Korak 1 */}
        {korak === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Ime</label>
                <input style={inputStyle} type="text" value={ime}
                  onChange={e => setIme(e.target.value)} placeholder="Amra" />
              </div>
              <div>
                <label style={labelStyle}>Prezime</label>
                <input style={inputStyle} type="text" value={prezime}
                  onChange={e => setPrezime(e.target.value)} placeholder="Hodžić" />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Email adresa</label>
              <input style={inputStyle} type="email" value={email}
                onChange={e => setEmail(e.target.value)} placeholder="salon@example.ba" />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Lozinka</label>
              <input style={inputStyle} type="password" value={lozinka}
                onChange={e => setLozinka(e.target.value)} placeholder="Min. 8 znakova"
                onKeyDown={e => e.key === 'Enter' && handleKorak1()} />
            </div>
            <button onClick={handleKorak1} style={{
              width: '100%', height: '46px', background: '#16a34a',
              color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '15px', fontWeight: '600', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}>
              Nastavi →
            </button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7fa3', marginTop: '1.25rem' }}>
              Imate nalog?{' '}
              <a href="/login" style={{ color: '#4ade80', fontWeight: '500', textDecoration: 'none' }}>
                Prijavite se
              </a>
            </p>
          </div>
        )}

        {/* Korak 2 */}
        {korak === 2 && (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Naziv salona</label>
              <input style={inputStyle} type="text" value={salon}
                onChange={e => setSalon(e.target.value)} placeholder="Salon Amra" />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Grad</label>
              <input style={inputStyle} type="text" value={grad}
                onChange={e => setGrad(e.target.value)} placeholder="Sarajevo" />
            </div>

            {/* Plan odabir */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Odaberite plan</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {planovi.map(p => (
                  <div key={p.id} onClick={() => setPlan(p.id)} style={{
                    border: plan === p.id ? '1px solid rgba(74,222,128,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    background: plan === p.id ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.03)',
                    borderRadius: '12px', padding: '14px 16px',
                    cursor: 'pointer', position: 'relative',
                    transition: 'all 0.2s'
                  }}>
                    {p.popular && (
                      <div style={{
                        position: 'absolute', top: '-10px', right: '16px',
                        background: '#16a34a', color: 'white', fontSize: '10px',
                        fontWeight: '600', padding: '2px 10px', borderRadius: '20px'
                      }}>
                        NAJPOPULARNIJE
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '16px', height: '16px', borderRadius: '50%',
                          border: plan === p.id ? '2px solid #4ade80' : '2px solid rgba(255,255,255,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {plan === p.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />}
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: '600', color: '#e2e8f7' }}>{p.naziv}</span>
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#4ade80' }}>{p.cijena}/mj</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingLeft: '24px' }}>
                      {p.features.map((f, i) => (
                        <span key={i} style={{ fontSize: '12px', color: '#6b7fa3' }}>✓ {f}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#4a5a7a', marginTop: '8px', textAlign: 'center' }}>
                14 dana besplatno — bez kartice
              </p>
            </div>

            <button onClick={handleRegistracija} disabled={ucitava} style={{
              width: '100%', height: '46px',
              background: ucitava ? 'rgba(255,255,255,0.1)' : '#16a34a',
              color: ucitava ? '#6b7fa3' : 'white',
              border: 'none', borderRadius: '10px',
              fontSize: '15px', fontWeight: '600',
              cursor: ucitava ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}>
              {ucitava ? 'Kreiranje...' : 'Kreiraj nalog →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7fa3', marginTop: '1.25rem' }}>
              <span onClick={() => setKorak(1)} style={{ color: '#4ade80', fontWeight: '500', cursor: 'pointer' }}>
                ← Nazad
              </span>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Register
