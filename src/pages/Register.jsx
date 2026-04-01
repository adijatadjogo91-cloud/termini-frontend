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
  const [plan, setPlan] = useState('pro')
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
      console.log('Greška detalji:', err.response?.data)
      setGreska(JSON.stringify(err.response?.data) || 'Greška pri registraciji.')
    }
    setUcitava(false)
  }

  const inputStyle = {
    width: '100%',
    height: '42px',
    padding: '0 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    color: '#555',
    marginBottom: '6px'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>

        <h2 style={{ marginBottom: '0.5rem', color: '#1a1a1a' }}>
          termini<span style={{ color: '#1a7a4a' }}>.pro</span>
        </h2>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>Kreirajte vaš nalog</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: '#1a7a4a' }}></div>
          <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: korak === 2 ? '#1a7a4a' : '#ddd' }}></div>
        </div>

        {greska && (
          <div style={{ background: '#fcebeb', color: '#a32d2d', padding: '10px 14px', borderRadius: '8px', marginBottom: '1rem', fontSize: '14px' }}>
            {greska}
          </div>
        )}

        {korak === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Ime</label>
                <input style={inputStyle} type="text" value={ime} onChange={e => setIme(e.target.value)} placeholder="Amra" />
              </div>
              <div>
                <label style={labelStyle}>Prezime</label>
                <input style={inputStyle} type="text" value={prezime} onChange={e => setPrezime(e.target.value)} placeholder="Hodžić" />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Email adresa</label>
              <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="salon@example.ba" />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Lozinka</label>
              <input style={inputStyle} type="password" value={lozinka} onChange={e => setLozinka(e.target.value)} placeholder="Min. 8 znakova" />
            </div>
            <button onClick={handleKorak1} style={{ width: '100%', height: '44px', background: '#1a7a4a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>
              Nastavi →
            </button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#666', marginTop: '1.25rem' }}>
              Imate nalog?{' '}
              <a href="/login" style={{ color: '#1a7a4a', fontWeight: '500' }}>Prijavite se</a>
            </p>
          </div>
        )}

        {korak === 2 && (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Naziv salona</label>
              <input style={inputStyle} type="text" value={salon} onChange={e => setSalon(e.target.value)} placeholder="Salon Amra" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Grad</label>
              <input style={inputStyle} type="text" value={grad} onChange={e => setGrad(e.target.value)} placeholder="Sarajevo" />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Odaberite plan</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {[
                  { id: 'starter', naziv: 'Starter', cijena: '19 KM' },
                  { id: 'pro', naziv: 'Pro', cijena: '49 KM' },
                  { id: 'business', naziv: 'Business', cijena: '99 KM' }
                ].map(p => (
                  <div key={p.id} onClick={() => setPlan(p.id)} style={{ border: `1px solid ${plan === p.id ? '#1a7a4a' : '#ddd'}`, background: plan === p.id ? '#eaf3de' : 'white', borderRadius: '8px', padding: '10px 8px', cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: '500' }}>{p.naziv}</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{p.cijena}</div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleRegistracija} disabled={ucitava} style={{ width: '100%', height: '44px', background: ucitava ? '#7ab89a' : '#1a7a4a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: ucitava ? 'not-allowed' : 'pointer' }}>
              {ucitava ? 'Kreiranje...' : 'Kreiraj nalog'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#666', marginTop: '1.25rem' }}>
              <span onClick={() => setKorak(1)} style={{ color: '#1a7a4a', fontWeight: '500', cursor: 'pointer' }}>← Nazad</span>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Register