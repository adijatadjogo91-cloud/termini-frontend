import { useState } from 'react'
import axios from 'axios'

const API = 'https://termini-pro.onrender.com'

function Login() {
  const [email, setEmail] = useState('')
  const [lozinka, setLozinka] = useState('')
  const [greska, setGreska] = useState('')
  const [ucitava, setUcitava] = useState(false)

  async function handlePrijava() {
    setGreska('')
    setUcitava(true)
    try {
      const odgovor = await axios.post(API + '/api/auth/login', {
        email: email,
        password: lozinka
      })
      const token = odgovor.data.access_token
      localStorage.setItem('token', token)
      const bizOdgovor = await axios.get(API + '/api/businesses', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const businesses = bizOdgovor.data.businesses
      if (businesses && businesses.length > 0) {
        localStorage.setItem('businessId', businesses[0].id)
      }
      window.location.href = '/dashboard'
    } catch (err) {
      setGreska('Pogrešan email ili lozinka.')
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
        width: '100%', maxWidth: '400px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f4ff', margin: '0 0 8px' }}>
            termini<span style={{ color: '#4ade80' }}>.pro</span>
          </h2>
          <p style={{ color: '#6b7fa3', fontSize: '14px', margin: 0 }}>
            Prijavite se u vaš nalog
          </p>
        </div>

        {greska && (
          <div style={{
            background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)',
            color: '#f87171', padding: '10px 14px', borderRadius: '10px',
            marginBottom: '1rem', fontSize: '14px'
          }}>
            {greska}
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#8b9ec7', marginBottom: '6px' }}>
            Email adresa
          </label>
          <input
            type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="salon@example.ba"
            onKeyDown={e => e.key === 'Enter' && handlePrijava()}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#8b9ec7', marginBottom: '6px' }}>
            Lozinka
          </label>
          <input
            type="password" value={lozinka}
            onChange={e => setLozinka(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handlePrijava()}
            style={inputStyle}
          />
        </div>

        <button
          onClick={handlePrijava}
          disabled={ucitava}
          style={{
            width: '100%', height: '46px',
            background: ucitava ? 'rgba(255,255,255,0.1)' : '#16a34a',
            color: ucitava ? '#6b7fa3' : 'white',
            border: 'none', borderRadius: '10px',
            fontSize: '15px', fontWeight: '600',
            cursor: ucitava ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {ucitava ? 'Prijavljivanje...' : 'Prijavi se →'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7fa3', marginTop: '1.25rem' }}>
          Nemate nalog?{' '}
          <a href="/register" style={{ color: '#4ade80', fontWeight: '500', textDecoration: 'none' }}>
            Registrujte se
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
