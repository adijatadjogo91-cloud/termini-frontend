import { useState } from 'react'
import axios from 'axios'

const API = 'https://termini-pro.onrender.com'

function AsistentChat() {
  const [otvoren, setOtvoren] = useState(false)
  const [poruke, setPoruke] = useState([
    { role: 'assistant', text: 'Hej! Ja sam vaš AI asistent. Kako vam mogu pomoći danas? 😊' }
  ])
  const [unos, setUnos] = useState('')
  const [salje, setSalje] = useState(false)
  const token = localStorage.getItem('token')

  async function posaljiPoruku() {
    if (!unos.trim() || salje) return
    const novaPoruka = { role: 'user', text: unos }
    setPoruke(prev => [...prev, novaPoruka])
    setUnos('')
    setSalje(true)

    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id

      const history = poruke.map(p => ({
        role: p.role === 'user' ? 'user' : 'assistant',
        content: p.text
      }))

      const res = await axios.post(API + `/api/ai/${bizId}/chat`, {
        message: unos,
        history
      }, { headers })

      setPoruke(prev => [...prev, { role: 'assistant', text: res.data.reply }])
    } catch (err) {
      setPoruke(prev => [...prev, { role: 'assistant', text: 'Žao mi je, došlo je do greške. Pokušajte ponovo.' }])
    }
    setSalje(false)
  }

  return (
    <>
      {/* Chat prozor */}
      {otvoren && (
        <div style={{
          position: 'fixed', bottom: '80px', right: '24px',
          width: '340px', height: '460px',
          background: 'white', borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column',
          zIndex: 1000, fontFamily: 'Inter, sans-serif'
        }}>
          {/* Header */}
          <div style={{
            background: '#1a7a4a', borderRadius: '16px 16px 0 0',
            padding: '1rem', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🤖</span>
              <div>
                <p style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>AI Asistent</p>
                <p style={{ color: '#a7f3d0', fontSize: '11px' }}>termini.pro</p>
              </div>
            </div>
            <button onClick={() => setOtvoren(false)} style={{
              background: 'none', border: 'none', color: 'white',
              fontSize: '18px', cursor: 'pointer'
            }}>✕</button>
          </div>

          {/* Poruke */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '1rem',
            display: 'flex', flexDirection: 'column', gap: '10px'
          }}>
            {poruke.map((p, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: p.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: '12px',
                  fontSize: '13px', lineHeight: '1.5',
                  background: p.role === 'user' ? '#1a7a4a' : '#f5f5f5',
                  color: p.role === 'user' ? 'white' : '#1a1a1a'
                }}>
                  {p.text}
                </div>
              </div>
            ))}
            {salje && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: '#f5f5f5', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: '#888' }}>
                  Pišem odgovor...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '1rem', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={unos}
              onChange={e => setUnos(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && posaljiPoruku()}
              placeholder="Upiši poruku..."
              style={{
                flex: 1, padding: '10px 12px', border: '1px solid #ddd',
                borderRadius: '8px', fontSize: '13px', outline: 'none'
              }}
            />
            <button onClick={posaljiPoruku} disabled={!unos.trim() || salje} style={{
              background: !unos.trim() ? '#ccc' : '#1a7a4a', color: 'white',
              border: 'none', borderRadius: '8px', padding: '10px 14px',
              fontSize: '13px', cursor: !unos.trim() ? 'not-allowed' : 'pointer'
            }}>
              →
            </button>
          </div>
        </div>
      )}

      {/* Chat dugme */}
      <button
        onClick={() => setOtvoren(!otvoren)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#1a7a4a', color: 'white', border: 'none',
          fontSize: '24px', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(26,122,74,0.4)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        🤖
      </button>
    </>
  )
}

export default AsistentChat