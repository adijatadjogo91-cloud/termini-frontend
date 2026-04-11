import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://termini-pro.onrender.com'

export default function Recenzija() {
  const token = window.location.pathname.split('/recenzija/')[1]
  const [recenzija, setRecenzija] = useState(null)
  const [ocjena, setOcjena] = useState(0)
  const [komentar, setKomentar] = useState('')
  const [ucitava, setUcitava] = useState(true)
  const [saljeZahtjev, setSaljeZahtjev] = useState(false)
  const [uspjeh, setUspjeh] = useState(false)
  const [greska, setGreska] = useState('')

  useEffect(() => { ucitajRecenziju() }, [])

  async function ucitajRecenziju() {
    try {
      const res = await axios.get(API + `/api/reviews/token/${token}`)
      setRecenzija(res.data.review)
    } catch (err) {
      setGreska('Recenzija nije pronađena ili je već ostavljena.')
    }
    setUcitava(false)
  }

  async function posaljiRecenziju() {
    if (!ocjena) { setGreska('Odaberite ocjenu.'); return }
    setSaljeZahtjev(true)
    setGreska('')
    try {
      await axios.post(API + `/api/reviews/token/${token}`, {
        rating: ocjena, comment: komentar
      })
      setUspjeh(true)
    } catch (err) {
      setGreska(err.response?.data?.error || 'Greška pri slanju recenzije.')
    }
    setSaljeZahtjev(false)
  }

  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )

  if (greska && !recenzija) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>😔</p>
        <p style={{ color: '#f87171', fontSize: '16px' }}>{greska}</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
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
        borderRadius: '20px', padding: '2.5rem 2rem',
        width: '100%', maxWidth: '420px', textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#f0f4ff', margin: '0 0 8px' }}>
          termini<span style={{ color: '#4ade80' }}>.pro</span>
        </h2>

        {uspjeh ? (
          <div>
            <p style={{ fontSize: '56px', margin: '1.5rem 0' }}>🌟</p>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#f0f4ff', marginBottom: '12px' }}>
              Hvala na recenziji!
            </h3>
            <p style={{ color: '#8b9ec7', fontSize: '15px' }}>
              Vaše mišljenje nam puno znači. Vidimo se uskoro! 😊
            </p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '40px', margin: '1rem 0' }}>⭐</p>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#f0f4ff', marginBottom: '8px' }}>
              Kako ste zadovoljni?
            </h3>
            <p style={{ color: '#6b7fa3', fontSize: '14px', marginBottom: '2rem' }}>
              {recenzija?.business_name}
            </p>

            {/* Zvjezdice */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <span
                  key={i}
                  onClick={() => setOcjena(i)}
                  style={{
                    fontSize: '40px', cursor: 'pointer',
                    opacity: i <= ocjena ? 1 : 0.3,
                    transition: 'all 0.15s',
                    filter: i <= ocjena ? 'none' : 'grayscale(1)'
                  }}
                >
                  ⭐
                </span>
              ))}
            </div>

            {ocjena > 0 && (
              <p style={{ color: '#4ade80', fontSize: '14px', fontWeight: '600', marginBottom: '1rem' }}>
                {['', 'Loše 😞', 'Može bolje 😐', 'Dobro 🙂', 'Odlično 😊', 'Izvrsno! 🤩'][ocjena]}
              </p>
            )}

            {/* Komentar */}
            <textarea
              value={komentar}
              onChange={e => setKomentar(e.target.value)}
              placeholder="Ostavite komentar (opciono)..."
              rows={3}
              style={{
                width: '100%', padding: '12px 14px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px', fontSize: '14px',
                color: '#f0f4ff', outline: 'none', resize: 'none',
                boxSizing: 'border-box', fontFamily: 'Inter, sans-serif',
                marginBottom: '1rem'
              }}
            />

            {greska && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '1rem' }}>{greska}</p>}

            <button
              onClick={posaljiRecenziju}
              disabled={!ocjena || saljeZahtjev}
              style={{
                width: '100%', background: !ocjena ? 'rgba(255,255,255,0.1)' : '#16a34a',
                color: !ocjena ? '#6b7fa3' : 'white', border: 'none',
                borderRadius: '10px', padding: '14px', fontSize: '15px',
                fontWeight: '600', cursor: !ocjena ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {saljeZahtjev ? 'Slanje...' : '⭐ Pošalji recenziju'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}