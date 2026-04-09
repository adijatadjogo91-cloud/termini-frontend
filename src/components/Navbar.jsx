import { useState, useEffect } from 'react'
import AsistentChat from './AsistentChat'

function Navbar() {
  const trenutnaStrana = window.location.pathname
  const [pokaziAI, setPokaziAI] = useState(false)
  const [menuOtvoren, setMenuOtvoren] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      JSON.parse(atob(token.split('.')[1]))
      setPokaziAI(true)
    } catch (e) {}
  }, [])

  function handleOdjava() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const linkovi = [
    { putanja: '/dashboard', naziv: 'Dashboard', icon: '🏠' },
    { putanja: '/termini', naziv: 'Termini', icon: '📅' },
    { putanja: '/klijenti', naziv: 'Klijenti', icon: '👥' },
    { putanja: '/usluge', naziv: 'Usluge', icon: '📋' },
    { putanja: '/uposlenici', naziv: 'Uposlenici', icon: '👤' },
    { putanja: '/prihodi', naziv: 'Prihodi', icon: '💰' },
    { putanja: '/postavke', naziv: 'Postavke', icon: '⚙️' },
  ]

  const jeAktivan = (putanja) => trenutnaStrana === putanja

  return (
    <>
      <div style={{
        background: 'rgba(10,15,30,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(12px)',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          height: '60px', maxWidth: '1100px', margin: '0 auto',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 1.5rem',
        }}>
          {/* Logo */}
          <a href="/dashboard" style={{ textDecoration: 'none' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#f0f4ff', margin: 0 }}>
              termini<span style={{ color: '#4ade80' }}>.pro</span>
            </h2>
          </a>

          {/* Desna strana */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleOdjava}
              style={{
                background: 'rgba(248,113,113,0.1)',
                border: '1px solid rgba(248,113,113,0.25)',
                borderRadius: '8px', padding: '7px 16px',
                fontSize: '13px', color: '#f87171',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}
            >
              Odjava
            </button>
            <button
              onClick={() => setMenuOtvoren(!menuOtvoren)}
              style={{
                background: menuOtvoren ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.07)',
                border: menuOtvoren ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px', cursor: 'pointer',
                width: '38px', height: '38px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', color: menuOtvoren ? '#4ade80' : '#c8d0e8',
                transition: 'all 0.2s'
              }}
            >
              {menuOtvoren ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Dropdown meni */}
        {menuOtvoren && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(10,15,30,0.98)',
            padding: '12px 1.5rem 16px',
            maxWidth: '1100px', margin: '0 auto',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '6px', marginBottom: '12px'
            }}>
              {linkovi.map(l => (
                <a
                  key={l.putanja}
                  href={l.putanja}
                  onClick={() => setMenuOtvoren(false)}
                  style={{
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '11px 14px', borderRadius: '10px',
                    fontSize: '14px', fontWeight: jeAktivan(l.putanja) ? '600' : '400',
                    background: jeAktivan(l.putanja) ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.04)',
                    border: jeAktivan(l.putanja) ? '1px solid rgba(74,222,128,0.25)' : '1px solid rgba(255,255,255,0.07)',
                    color: jeAktivan(l.putanja) ? '#4ade80' : '#c8d0e8',
                    transition: 'all 0.15s'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{l.icon}</span>
                  {l.naziv}
                </a>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '12px' }}>
              <button
                onClick={handleOdjava}
                style={{
                  background: 'rgba(248,113,113,0.08)',
                  border: '1px solid rgba(248,113,113,0.2)',
                  borderRadius: '10px', padding: '11px 16px',
                  fontSize: '14px', color: '#f87171',
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}
              >
                🚪 Odjava
              </button>
            </div>
          </div>
        )}
      </div>
      {pokaziAI && <AsistentChat />}
    </>
  )
}

export default Navbar
