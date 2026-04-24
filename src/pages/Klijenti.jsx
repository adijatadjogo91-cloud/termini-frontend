import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = 'https://termini-pro.onrender.com'

function Klijenti() {
  const [klijenti, setKlijenti] = useState([])
  const [ucitava, setUcitava] = useState(true)
  const [pretraga, setPretraga] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { window.location.href = '/login'; return }
    ucitajKlijente()
  }, [])

  async function ucitajKlijente() {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      const res = await axios.get(API + `/api/clients/${bizId}`, { headers })
      setKlijenti(res.data.clients || [])
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    setUcitava(false)
  }

  async function blokirajKlijenta(klijentId, trenutnoBlokiran) {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      await axios.patch(API + `/api/clients/${bizId}/${klijentId}/block`,
        { is_blocked: !trenutnoBlokiran }, { headers })
      ucitajKlijente()
    } catch (err) {
      alert('Greška pri blokiranju klijenta.')
    }
  }

  async function iskoristiBodove(klijentId, trenutniBodovi) {
    const bodovi = prompt(`Klijent ima ${trenutniBodovi} bodova (${trenutniBodovi} KM popusta). Koliko bodova iskoristiti?`)
    if (!bodovi || isNaN(bodovi) || parseInt(bodovi) <= 0) return
    if (parseInt(bodovi) > trenutniBodovi) {
      alert('Klijent nema dovoljno bodova!')
      return
    }
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      const res = await axios.post(API + `/api/clients/${bizId}/${klijentId}/redeem`,
        { points: parseInt(bodovi) }, { headers })
      alert(res.data.message)
      ucitajKlijente()
    } catch (err) {
      alert(err.response?.data?.error || 'Greška pri iskorištavanju bodova.')
    }
  }

  const filtrirani = klijenti.filter(k =>
    k.name?.toLowerCase().includes(pretraga.toLowerCase()) ||
    k.phone?.includes(pretraga) ||
    k.email?.toLowerCase().includes(pretraga.toLowerCase())
  )

  function inicijali(ime) {
    if (!ime) return '?'
    return ime.split(' ').map(r => r[0]).join('').toUpperCase().slice(0, 2)
  }

  const boje = ['#4ade80', '#60a5fa', '#c084fc', '#fb923c', '#f472b6', '#34d399']

  function bojaPoBroju(i) {
    return boje[i % boje.length]
  }

  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#6b7fa3', fontSize: '14px' }}>Učitavanje...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
              👥 Klijenti
            </h1>
            <p style={{ color: '#6b7fa3', fontSize: '15px' }}>
              {klijenti.length} klijenata ukupno
            </p>
          </div>
          <button onClick={() => window.location.href = '/novi-klijent'} style={{
            background: '#16a34a', color: 'white', border: 'none',
            borderRadius: '10px', padding: '11px 22px', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
          }}>
            + Novi klijent
          </button>
        </div>

        {/* Pretraga */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <span style={{
            position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
            fontSize: '16px', pointerEvents: 'none'
          }}>🔍</span>
          <input
            type="text"
            placeholder="Pretraži po imenu, telefonu ili emailu..."
            value={pretraga}
            onChange={e => setPretraga(e.target.value)}
            style={{
              width: '100%', height: '46px',
              padding: '0 16px 0 42px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', fontSize: '14px',
              color: '#f0f4ff', outline: 'none', boxSizing: 'border-box',
              fontFamily: 'Inter, sans-serif'
            }}
          />
        </div>

        {/* Stat kartice */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px', marginBottom: '1.5rem'
        }}>
          {[
            { label: 'Ukupno klijenata', vrijednost: klijenti.length, boja: '#4ade80', icon: '👥' },
            { label: 'Rezultati pretrage', vrijednost: filtrirani.length, boja: '#60a5fa', icon: '🔍' },
          ].map((k, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <span style={{ fontSize: '22px' }}>{k.icon}</span>
              <div>
                <p style={{ fontSize: '22px', fontWeight: '700', color: k.boja, margin: 0 }}>{k.vrijednost}</p>
                <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '2px' }}>{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lista klijenata */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', overflow: 'hidden'
        }}>
          {filtrirani.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ fontSize: '40px', marginBottom: '12px' }}>👥</p>
              <p style={{ color: '#c8d0e8', fontSize: '15px', fontWeight: '500' }}>
                {pretraga ? 'Nema rezultata pretrage.' : 'Nema klijenata još.'}
              </p>
              <p style={{ color: '#6b7fa3', fontSize: '13px', marginTop: '8px' }}>
                {pretraga ? 'Pokušajte drugi pojam.' : 'Dodajte prvog klijenta klikom na dugme iznad.'}
              </p>
            </div>
          ) : (
            filtrirani.map((k, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < filtrirani.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'background 0.15s',
                flexWrap: 'wrap', gap: '8px'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Lijeva strana — avatar + info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                 <div style={{
  width: '42px', height: '42px', borderRadius: '50%',
  background: `linear-gradient(135deg, ${bojaPoBroju(i)}33, ${bojaPoBroju(i)}11)`,
  border: `2px solid ${bojaPoBroju(i)}44`,
  boxShadow: `0 0 12px ${bojaPoBroju(i)}22`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '14px', fontWeight: '700', color: bojaPoBroju(i), flexShrink: 0
}}>
                    {inicijali(k.name)}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: k.is_blocked ? '#f87171' : '#e2e8f7', margin: 0 }}>
                      {k.name}
                      {k.is_blocked && (
                        <span style={{ fontSize: '11px', background: 'rgba(248,113,113,0.15)', color: '#f87171', padding: '2px 8px', borderRadius: '20px', marginLeft: '6px' }}>
                          Blokiran
                        </span>
                      )}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '3px' }}>
                      {k.phone && k.email
                        ? `${k.phone} · ${k.email}`
                        : k.phone || k.email || 'Nema kontakta'}
                    </p>
                    {k.loyalty_points > 0 && (
                      <span style={{ fontSize: '11px', background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '2px 8px', borderRadius: '20px', marginTop: '4px', display: 'inline-block' }}>
                        ⭐ {k.loyalty_points} bodova
                      </span>
                    )}
                  </div>
                </div>

                {/* Desna strana — dugmad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span style={{
                    background: 'rgba(74,222,128,0.1)', color: '#4ade80',
                    fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px'
                  }}>
                    {k.total_appointments || 0} termina
                  </span>

                  {k.loyalty_points > 0 && (
                    <button
                      onClick={() => iskoristiBodove(k.id, k.loyalty_points)}
                      title="Iskoristi loyalty bodove"
                      style={{
                        background: 'rgba(251,191,36,0.1)',
                        border: '1px solid rgba(251,191,36,0.2)',
                        color: '#fbbf24', borderRadius: '8px', padding: '4px 10px',
                        fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      ⭐ {k.loyalty_points} bod.
                    </button>
                  )}

                  <button
                    onClick={() => blokirajKlijenta(k.id, k.is_blocked)}
                    title={k.is_blocked ? 'Odblokiraj klijenta' : 'Blokiraj klijenta'}
                    style={{
                      background: k.is_blocked ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
                      border: k.is_blocked ? '1px solid rgba(74,222,128,0.2)' : '1px solid rgba(248,113,113,0.2)',
                      color: k.is_blocked ? '#4ade80' : '#f87171',
                      borderRadius: '8px', padding: '4px 10px',
                      fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {k.is_blocked ? '✓ Odblokiraj' : '🚫 Blokiraj'}
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Klijenti
