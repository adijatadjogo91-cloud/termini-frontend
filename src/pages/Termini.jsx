import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = 'https://termini-pro.onrender.com'

function Termini() {
  const [termini, setTermini] = useState([])
  const [ucitava, setUcitava] = useState(true)
  const [prikaz, setPrikaz] = useState('lista') // lista ili kalendar
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
    if (!window.confirm('Da li ste sigurni da želite otkazati ovaj termin?')) return;
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
    const boje = { confirmed: '#1a7a4a', pending: '#d97706', cancelled: '#e24b4a', completed: '#2563eb', no_show: '#888' }
    return boje[status] || '#888'
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
    const startDan = (prvogDana.getDay() + 6) % 7 // Ponedjeljak = 0
    const dani = []
    for (let i = 0; i < startDan; i++) dani.push(null)
    for (let i = 1; i <= zadnjiDan.getDate(); i++) {
      dani.push(new Date(godina, mjesec, i))
    }
    return dani
  }

  const naziviMjeseci = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
  const naziviDana = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned']

  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <p style={{ color: '#888' }}>Učitavanje...</p>
    </div>
  )

  const kalendarDani = generisiKalendar()
  const danas = new Date()
  const odabranTermini = odabranDan ? terminiZaDan(odabranDan) : []

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '4px' }}>Termini</h1>
            <p style={{ color: '#888', fontSize: '15px' }}>Pregled svih termina vašeg salona</p>
          </div>
          <button onClick={() => window.location.href = '/novi-termin'} style={{
            background: '#1a7a4a', color: 'white', border: 'none',
            borderRadius: '8px', padding: '10px 20px', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer'
          }}>
            + Novi termin
          </button>
        </div>

        {/* Tabovi prikaz */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
          {[
            { key: 'lista', naziv: '📋 Lista' },
            { key: 'kalendar', naziv: '📅 Kalendar' }
          ].map(p => (
            <button key={p.key} onClick={() => setPrikaz(p.key)} style={{
              padding: '8px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
              border: '1px solid #ddd',
              background: prikaz === p.key ? '#1a7a4a' : 'white',
              color: prikaz === p.key ? 'white' : '#555',
              fontWeight: prikaz === p.key ? '500' : '400'
            }}>
              {p.naziv}
            </button>
          ))}
        </div>

        {/* LISTA PRIKAZ */}
        {prikaz === 'lista' && (
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {termini.length === 0 ? (
              <div style={{ padding: '4rem', textAlign: 'center' }}>
                <p style={{ fontSize: '32px', marginBottom: '1rem' }}>📅</p>
                <p style={{ color: '#888', fontSize: '15px' }}>Nema termina za prikaz.</p>
              </div>
            ) : (
              termini.map((t, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  borderBottom: i < termini.length - 1 ? '1px solid #f0f0f0' : 'none',
                  flexWrap: 'wrap', gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: '#eaf3de', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '16px', flexShrink: 0
                    }}>👤</div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{t.client_name || 'Nepoznat klijent'}</p>
                      <p style={{ fontSize: '13px', color: '#888' }}>{t.service_name || 'Usluga'}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '13px', color: '#555', marginBottom: '4px' }}>{formatDatum(t.starts_at)}</p>
                      <span style={{
                        fontSize: '12px', padding: '3px 10px', borderRadius: '20px',
                        background: statusBoja(t.status) + '20',
                        color: statusBoja(t.status), fontWeight: '500'
                      }}>
                        {statusNaziv(t.status)}
                      </span>
                    </div>
                    {t.status !== 'cancelled' && t.status !== 'completed' && (
                      <button onClick={() => otkaziTermin(t.id)} style={{
                        background: 'none', border: '1px solid #e24b4a', color: '#e24b4a',
                        borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer'
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
            {/* Navigacija mjeseca */}
            <div style={{
              background: 'white', borderRadius: '12px', padding: '1.5rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <button onClick={() => setTrenutniMjesec(new Date(trenutniMjesec.getFullYear(), trenutniMjesec.getMonth() - 1))} style={{
                  background: 'none', border: '1px solid #ddd', borderRadius: '8px',
                  padding: '8px 16px', cursor: 'pointer', fontSize: '16px'
                }}>←</button>
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>
                  {naziviMjeseci[trenutniMjesec.getMonth()]} {trenutniMjesec.getFullYear()}
                </h3>
                <button onClick={() => setTrenutniMjesec(new Date(trenutniMjesec.getFullYear(), trenutniMjesec.getMonth() + 1))} style={{
                  background: 'none', border: '1px solid #ddd', borderRadius: '8px',
                  padding: '8px 16px', cursor: 'pointer', fontSize: '16px'
                }}>→</button>
              </div>

              {/* Dani u sedmici */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
                {naziviDana.map(d => (
                  <div key={d} style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#888', padding: '4px' }}>
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
                  return (
                    <div
                      key={i}
                      onClick={() => setOdabranDan(jeOdabran ? null : dan)}
                      style={{
                        padding: '6px 4px', borderRadius: '8px', textAlign: 'center',
                        cursor: 'pointer', minHeight: '52px',
                        background: jeOdabran ? '#1a7a4a' : jeDanas ? '#eaf3de' : 'transparent',
                        border: jeOdabran ? '2px solid #1a7a4a' : jeDanas ? '2px solid #1a7a4a' : '2px solid transparent',
                      }}
                    >
                      <p style={{
                        fontSize: '13px', fontWeight: jeDanas ? '700' : '400',
                        color: jeOdabran ? 'white' : jeDanas ? '#1a7a4a' : '#1a1a1a',
                        marginBottom: '4px'
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
                      {dTermini.filter(t => t.status !== 'cancelled').length > 3 && (
                        <p style={{ fontSize: '9px', color: jeOdabran ? 'white' : '#888' }}>
                          +{dTermini.length - 3}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Termini odabranog dana */}
            {odabranDan && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' }}>
                  📅 {odabranDan.getDate()}. {naziviMjeseci[odabranDan.getMonth()]}
                </h3>
                {odabranTermini.length === 0 ? (
                  <p style={{ color: '#888', fontSize: '14px' }}>Nema termina za ovaj dan.</p>
                ) : (
                  odabranTermini.map((t, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 0', borderBottom: i < odabranTermini.length - 1 ? '1px solid #f0f0f0' : 'none',
                      flexWrap: 'wrap', gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: statusBoja(t.status), flexShrink: 0
                        }} />
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '500' }}>{t.client_name || 'Nepoznat klijent'}</p>
                          <p style={{ fontSize: '12px', color: '#888' }}>{t.service_name} — {new Date(t.starts_at).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontSize: '12px', padding: '3px 10px', borderRadius: '20px',
                          background: statusBoja(t.status) + '20', color: statusBoja(t.status), fontWeight: '500'
                        }}>
                          {statusNaziv(t.status)}
                        </span>
                        {t.status !== 'cancelled' && t.status !== 'completed' && (
                          <button onClick={() => otkaziTermin(t.id)} style={{
                            background: 'none', border: '1px solid #e24b4a', color: '#e24b4a',
                            borderRadius: '8px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer'
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