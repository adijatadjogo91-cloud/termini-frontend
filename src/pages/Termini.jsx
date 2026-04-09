import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = 'https://termini-pro.onrender.com'

function Termini() {
  const [termini, setTermini] = useState([])
  const [ucitava, setUcitava] = useState(true)
  const [prikaz, setPrikaz] = useState('lista')
  const [trenutniMjesec, setTrenutniMjesec] = useState(new Date())
  const [odabranDan, setOdabranDan] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { window.location.href = '/login'; return }
    ucitajTermine()
  }, [])

  async function ucitajTermine() {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      const res = await axios.get(API + `/api/appointments/${bizId}?from=2026-01-01&to=2026-12-31`, { headers })
      setTermini(res.data.appointments || [])
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    setUcitava(false)
  }

  async function otkaziTermin(terminId) {
    if (!window.confirm('Da li ste sigurni da želite otkazati ovaj termin?')) return
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      await axios.patch(API + `/api/appointments/${bizId}/${terminId}/status`,
        { status: 'cancelled' }, { headers })
      ucitajTermine()
    } catch (err) {
      alert('Greška pri otkazivanju termina.')
    }
  }

  function formatDatum(datum) {
    const d = new Date(datum)
    const dani = ['ned','pon','uto','sri','čet','pet','sub']
    const mjeseci = ['jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec']
    return `${dani[d.getDay()]}, ${d.getDate()}. ${mjeseci[d.getMonth()]} — ${d.toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}`
  }

  function statusBoja(status) {
    const boje = { confirmed: '#4ade80', pending: '#fbbf24', cancelled: '#f87171', completed: '#60a5fa', no_show: '#6b7fa3' }
    return boje[status] || '#6b7fa3'
  }

  function statusNaziv(status) {
    const nazivi = { confirmed: 'Potvrđen', pending: 'Čeka', cancelled: 'Otkazan', completed: 'Završen', no_show: 'Nije došao' }
    return nazivi[status] || status
  }

  function terminiZaDan(datum) {
    return termini.filter(t => {
      const d = new Date(t.starts_at)
      return d.getDate() === datum.getDate() &&
        d.getMonth() === datum.getMonth() &&
        d.getFullYear() === datum.getFullYear()
    })
  }

  function generisiKalendar() {
    const godina = trenutniMjesec.getFullYear()
    const mjesec = trenutniMjesec.getMonth()
    const prvogDana = new Date(godina, mjesec, 1)
    const zadnjiDan = new Date(godina, mjesec + 1, 0)
    const startDan = (prvogDana.getDay() + 6) % 7
    const dani = []
    for (let i = 0; i < startDan; i++) dani.push(null)
    for (let i = 1; i <= zadnjiDan.getDate(); i++) {
      dani.push(new Date(godina, mjesec, i))
    }
    return dani
  }

  function inicijali(ime) {
    if (!ime) return '?'
    return ime.split(' ').map(r => r[0]).join('').toUpperCase().slice(0, 2)
  }

  const naziviMjeseci = ['Januar','Februar','Mart','April','Maj','Juni','Juli','August','Septembar','Oktobar','Novembar','Decembar']
  const naziviDana = ['Pon','Uto','Sri','Čet','Pet','Sub','Ned']

  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#6b7fa3', fontSize: '14px' }}>Učitavanje...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  const kalendarDani = generisiKalendar()
  const danas = new Date()
  const odabranTermini = odabranDan ? terminiZaDan(odabranDan) : []

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
              📅 Termini
            </h1>
            <p style={{ color: '#6b7fa3', fontSize: '15px' }}>
              {termini.filter(t => t.status !== 'cancelled').length} aktivnih termina
            </p>
          </div>
          <button onClick={() => window.location.href = '/novi-termin'} style={{
            background: '#16a34a', color: 'white', border: 'none',
            borderRadius: '10px', padding: '11px 22px', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
          }}>
            + Novi termin
          </button>
        </div>

        {/* Tabovi */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
          {[
            { key: 'lista', naziv: '📋 Lista' },
            { key: 'kalendar', naziv: '📅 Kalendar' }
          ].map(p => (
            <button key={p.key} onClick={() => setPrikaz(p.key)} style={{
              padding: '9px 20px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontWeight: '500',
              border: '1px solid rgba(255,255,255,0.1)',
              background: prikaz === p.key ? '#16a34a' : 'rgba(255,255,255,0.05)',
              color: prikaz === p.key ? 'white' : '#8b9ec7',
            }}>
              {p.naziv}
            </button>
          ))}
        </div>

        {/* LISTA PRIKAZ */}
        {prikaz === 'lista' && (
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px', overflow: 'hidden'
          }}>
            {termini.length === 0 ? (
              <div style={{ padding: '4rem', textAlign: 'center' }}>
                <p style={{ fontSize: '40px', marginBottom: '12px' }}>📅</p>
                <p style={{ color: '#c8d0e8', fontSize: '15px', fontWeight: '500' }}>Nema termina za prikaz.</p>
                <p style={{ color: '#6b7fa3', fontSize: '13px', marginTop: '8px' }}>Dodajte prvi termin klikom na dugme iznad.</p>
              </div>
            ) : (
              termini.map((t, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  borderBottom: i < termini.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  flexWrap: 'wrap', gap: '8px',
                  transition: 'background 0.15s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      background: 'rgba(74,222,128,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: '700', color: '#4ade80', flexShrink: 0
                    }}>
                      {inicijali(t.client_name)}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f7', margin: 0 }}>
                        {t.client_name || 'Nepoznat klijent'}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '3px' }}>
                        {t.service_name || 'Usluga'}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '13px', color: '#8b9ec7', marginBottom: '5px' }}>
                        {formatDatum(t.starts_at)}
                      </p>
                      <span style={{
                        fontSize: '12px', padding: '3px 10px', borderRadius: '20px',
                        background: statusBoja(t.status) + '22',
                        color: statusBoja(t.status), fontWeight: '600'
                      }}>
                        {statusNaziv(t.status)}
                      </span>
                    </div>
                    {t.status !== 'cancelled' && t.status !== 'completed' && (
                      <button onClick={() => otkaziTermin(t.id)} style={{
                        background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
                        color: '#f87171', borderRadius: '8px', padding: '6px 12px',
                        fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                      }}>
                        Otkaži
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* KALENDAR PRIKAZ */}
        {prikaz === 'kalendar' && (
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '1.5rem', marginBottom: '16px'
            }}>
              {/* Navigacija */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <button onClick={() => setTrenutniMjesec(new Date(trenutniMjesec.getFullYear(), trenutniMjesec.getMonth() - 1))} style={{
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', padding: '8px 16px', cursor: 'pointer',
                  fontSize: '16px', color: '#c8d0e8'
                }}>←</button>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f0f4ff' }}>
                  {naziviMjeseci[trenutniMjesec.getMonth()]} {trenutniMjesec.getFullYear()}
                </h3>
                <button onClick={() => setTrenutniMjesec(new Date(trenutniMjesec.getFullYear(), trenutniMjesec.getMonth() + 1))} style={{
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', padding: '8px 16px', cursor: 'pointer',
                  fontSize: '16px', color: '#c8d0e8'
                }}>→</button>
              </div>

              {/* Nazivi dana */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
                {naziviDana.map(d => (
                  <div key={d} style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7fa3', padding: '4px' }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Dani */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {kalendarDani.map((dan, i) => {
                  if (!dan) return <div key={i} />
                  const dTermini = terminiZaDan(dan)
                  const jeDanas = dan.toDateString() === danas.toDateString()
                  const jeOdabran = odabranDan && dan.toDateString() === odabranDan.toDateString()
                  const imaTermina = dTermini.filter(t => t.status !== 'cancelled').length > 0
                  return (
                    <div key={i} onClick={() => setOdabranDan(jeOdabran ? null : dan)} style={{
                      padding: '6px 4px', borderRadius: '8px', textAlign: 'center',
                      cursor: 'pointer', minHeight: '52px',
                      background: jeOdabran ? '#16a34a' : jeDanas ? 'rgba(74,222,128,0.1)' : 'transparent',
                      border: jeOdabran ? '1px solid #16a34a' : jeDanas ? '1px solid rgba(74,222,128,0.3)' : '1px solid transparent',
                    }}>
                      <p style={{
                        fontSize: '13px', fontWeight: jeDanas ? '700' : '400', marginBottom: '4px',
                        color: jeOdabran ? 'white' : jeDanas ? '#4ade80' : '#c8d0e8'
                      }}>
                        {dan.getDate()}
                      </p>
                      {dTermini.filter(t => t.status !== 'cancelled').slice(0, 3).map((t, j) => (
                        <div key={j} style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: jeOdabran ? 'white' : statusBoja(t.status),
                          margin: '0 auto 2px'
                        }} />
                      ))}
                      {imaTermina && dTermini.filter(t => t.status !== 'cancelled').length > 3 && (
                        <p style={{ fontSize: '9px', color: jeOdabran ? 'white' : '#6b7fa3' }}>
                          +{dTermini.filter(t => t.status !== 'cancelled').length - 3}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Termini odabranog dana */}
            {odabranDan && (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '1.5rem'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '1rem', color: '#f0f4ff' }}>
                  📅 {odabranDan.getDate()}. {naziviMjeseci[odabranDan.getMonth()]}
                </h3>
                {odabranTermini.length === 0 ? (
                  <p style={{ color: '#6b7fa3', fontSize: '14px' }}>Nema termina za ovaj dan.</p>
                ) : (
                  odabranTermini.map((t, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: i < odabranTermini.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      flexWrap: 'wrap', gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: statusBoja(t.status), flexShrink: 0
                        }} />
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f7', margin: 0 }}>
                            {t.client_name || 'Nepoznat klijent'}
                          </p>
                          <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '3px' }}>
                            {t.service_name} — {new Date(t.starts_at).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontSize: '12px', padding: '3px 10px', borderRadius: '20px',
                          background: statusBoja(t.status) + '22',
                          color: statusBoja(t.status), fontWeight: '600'
                        }}>
                          {statusNaziv(t.status)}
                        </span>
                        {t.status !== 'cancelled' && t.status !== 'completed' && (
                          <button onClick={() => otkaziTermin(t.id)} style={{
                            background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
                            color: '#f87171', borderRadius: '8px', padding: '4px 10px',
                            fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                          }}>
                            Otkaži
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default Termini
