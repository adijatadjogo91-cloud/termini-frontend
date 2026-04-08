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

  const linkStyle = (putanja) => ({
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: trenutnaStrana === putanja ? '600' : '400',
    color: trenutnaStrana === putanja ? '#1a7a4a' : '#555',
    padding: '6px 12px',
    borderRadius: '8px',
    background: trenutnaStrana === putanja ? '#eaf3de' : 'transparent',
    display: 'block'
  })

  const linkovi = [
    { putanja: '/dashboard', naziv: '🏠 Dashboard' },
    { putanja: '/termini', naziv: '📅 Termini' },
    { putanja: '/klijenti', naziv: '👥 Klijenti' },
    { putanja: '/usluge', naziv: '📋 Usluge' },
    { putanja: '/uposlenici', naziv: '👤 Uposlenici' },
    { putanja: '/postavke', naziv: '⚙️ Postavke' },
  ]

  return (
    <>
      <div style={{
        background: 'white',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
        }}>
          <h2 style={{ color: '#1a1a1a', fontSize: '20px', margin: 0 }}>
            termini<span style={{ color: '#1a7a4a' }}>.pro</span>
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleOdjava}
              style={{
                background: 'none', border: '1px solid #ddd', borderRadius: '8px',
                padding: '8px 16px', fontSize: '14px', color: '#555', cursor: 'pointer'
              }}
            >
              Odjava
            </button>
            <button
              onClick={() => setMenuOtvoren(!menuOtvoren)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '24px', padding: '4px', color: '#555'
              }}
            >
              {menuOtvoren ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {menuOtvoren && (
          <div style={{
            borderTop: '1px solid #eee',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            background: 'white'
          }}>
            {linkovi.map(l => (
              <a
                key={l.putanja}
                href={l.putanja}
                onClick={() => setMenuOtvoren(false)}
                style={{
                  ...linkStyle(l.putanja),
                  padding: '12px 16px',
                  fontSize: '15px',
                  borderRadius: '8px',
                }}
              >
                {l.naziv}
              </a>
            ))}
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '8px 0' }} />
            <button
              onClick={handleOdjava}
              style={{
                background: 'none', border: '1px solid #ddd', borderRadius: '8px',
                padding: '12px 16px', fontSize: '15px', color: '#555',
                cursor: 'pointer', textAlign: 'left'
              }}
            >
              🚪 Odjava
            </button>
          </div>
        )}
      </div>
      {pokaziAI && <AsistentChat />}
    </>
  )
}

export default Navbar