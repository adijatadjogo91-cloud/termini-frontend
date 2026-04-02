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

      // Preuzmi businessId i sačuvaj ga
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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ marginBottom: '0.5rem', color: '#1a1a1a' }}>
          termini<span style={{ color: '#1a7a4a' }}>.pro</span>
        </h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Prijavite se u vaš nalog
        </p>

        {greska && (
          <div style={{
            background: '#fcebeb',
            color: '#a32d2d',
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '14px'
          }}>
            {greska}
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '6px' }}>
            Email adresa
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="salon@example.ba"
            style={{
              width: '100%',
              height: '42px',
              padding: '0 12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '6px' }}>
            Lozinka
          </label>
          <input
            type="password"
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
            placeholder="••••••••"
            style={{
              width: '100%',
              height: '42px',
              padding: '0 12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handlePrijava}
          disabled={ucitava}
          style={{
            width: '100%',
            height: '44px',
            background: ucitava ? '#7ab89a' : '#1a7a4a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '500',
            cursor: ucitava ? 'not-allowed' : 'pointer'
          }}
        >
          {ucitava ? 'Prijavljivanje...' : 'Prijavi se'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#666', marginTop: '1.25rem' }}>
          Nemate nalog?{' '}
          <a href="/register" style={{ color: '#1a7a4a', fontWeight: '500' }}>
            Registrujte se
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login