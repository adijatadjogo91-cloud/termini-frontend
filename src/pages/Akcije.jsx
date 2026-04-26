import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = 'https://termini-pro.onrender.com'

function Akcije() {
  const [akcije, setAkcije] = useState([])
  const [usluge, setUsluge] = useState([])
  const [ucitava, setUcitava] = useState(true)
  const [pokaziFormu, setPokaziFormu] = useState(false)
  const [greska, setGreska] = useState('')
  const [uspjeh, setUspjeh] = useState('')
  const [forma, setForma] = useState({
    title: '',
    description: '',
    service_id: '',
    discount_percent: '',
    discount_amount: '',
    valid_from: '',
    valid_to: '',
  })
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { window.location.href = '/login'; return }
    ucitajPodatke()
  }, [])

  async function ucitajPodatke() {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      const [akcijeRes, uslugeRes] = await Promise.all([
        axios.get(API + `/api/promotions/${bizId}`, { headers }),
        axios.get(API + `/api/services/${bizId}`, { headers }),
      ])
      setAkcije(akcijeRes.data.promotions || [])
      setUsluge(uslugeRes.data.services || [])
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    setUcitava(false)
  }

  async function kreirajAkciju() {
    setGreska('')
    setUspjeh('')
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      await axios.post(API + `/api/promotions/${bizId}`, {
        ...forma,
        discount_percent: forma.discount_percent ? parseInt(forma.discount_percent) : null,
        discount_amount: forma.discount_amount ? parseFloat(forma.discount_amount) : null,
        service_id: forma.service_id || null,
      }, { headers })
      setUspjeh('Akcija kreirana!')
      setPokaziFormu(false)
      setForma({ title: '', description: '', service_id: '', discount_percent: '', discount_amount: '', valid_from: '', valid_to: '' })
      ucitajPodatke()
    } catch (err) {
      setGreska(err.response?.data?.error || 'Greška pri kreiranju akcije.')
    }
  }

  async function toggleAkcija(id, trenutnoAktivna) {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      await axios.patch(API + `/api/promotions/${bizId}/${id}`, { is_active: !trenutnoAktivna }, { headers })
      ucitajPodatke()
    } catch (err) {
      alert('Greška pri ažuriranju akcije.')
    }
  }

  async function obrisiAkciju(id) {
    if (!window.confirm('Obrisati ovu akciju?')) return
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const bizRes = await axios.get(API + '/api/businesses', { headers })
      const bizId = bizRes.data.businesses[0].id
      await axios.delete(API + `/api/promotions/${bizId}/${id}`, { headers })
      ucitajPodatke()
    } catch (err) {
      alert('Greška pri brisanju akcije.')
    }
  }

  function formatDatum(datum) {
    if (!datum) return ''
    return new Date(datum).toLocaleDateString('hr-HR', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  function jeAktivna(akcija) {
    const danas = new Date()
    const od = new Date(akcija.valid_from)
    const do_ = new Date(akcija.valid_to)
    return akcija.is_active && danas >= od && danas <= do_
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', fontSize: '14px',
    color: '#f0f4ff', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'Inter, sans-serif'
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
              🎯 Akcije i popusti
            </h1>
            <p style={{ color: '#6b7fa3', fontSize: '15px' }}>
              {akcije.length} akcija ukupno
            </p>
          </div>
          <button onClick={() => setPokaziFormu(!pokaziFormu)} style={{
            background: '#16a34a', color: 'white', border: 'none',
            borderRadius: '10px', padding: '11px 22px', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
          }}>
            + Nova akcija
          </button>
        </div>

        {/* Forma za novu akciju */}
        {pokaziFormu && (
          <div style={{
            background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)',
            borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#f0f4ff', marginBottom: '1.25rem' }}>
              Nova akcija
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>Naziv akcije *</label>
                <input type="text" value={forma.title} onChange={e => setForma({ ...forma, title: e.target.value })}
                  placeholder="npr. Ljetni popust, Popust za nove klijente..." style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>Opis (opciono)</label>
                <input type="text" value={forma.description} onChange={e => setForma({ ...forma, description: e.target.value })}
                  placeholder="Kratki opis akcije..." style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>Usluga (opciono)</label>
                <select value={forma.service_id} onChange={e => setForma({ ...forma, service_id: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Sve usluge</option>
                  {usluge.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>Popust u % </label>
                <input type="number" value={forma.discount_percent} onChange={e => setForma({ ...forma, discount_percent: e.target.value, discount_amount: '' })}
                  placeholder="npr. 20" min="1" max="100" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>Ili popust u KM</label>
                <input type="number" value={forma.discount_amount} onChange={e => setForma({ ...forma, discount_amount: e.target.value, discount_percent: '' })}
                  placeholder="npr. 10" min="1" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>Datum početka *</label>
                <input type="date" value={forma.valid_from} onChange={e => setForma({ ...forma, valid_from: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>Datum završetka *</label>
                <input type="date" value={forma.valid_to} onChange={e => setForma({ ...forma, valid_to: e.target.value })} style={inputStyle} />
              </div>
            </div>
            {greska && <p style={{ color: '#f87171', fontSize: '13px', marginTop: '12px' }}>{greska}</p>}
            {uspjeh && <p style={{ color: '#4ade80', fontSize: '13px', marginTop: '12px' }}>{uspjeh}</p>}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={kreirajAkciju} style={{
                background: '#16a34a', color: 'white', border: 'none',
                borderRadius: '10px', padding: '11px 22px', fontSize: '14px',
                fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
              }}>
                Sačuvaj akciju
              </button>
              <button onClick={() => setPokaziFormu(false)} style={{
                background: 'rgba(255,255,255,0.07)', color: '#c8d0e8',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px',
                padding: '11px 22px', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
              }}>
                Otkaži
              </button>
            </div>
          </div>
        )}

        {/* Lista akcija */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
          {akcije.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ fontSize: '40px', marginBottom: '12px' }}>🎯</p>
              <p style={{ color: '#c8d0e8', fontSize: '15px', fontWeight: '500' }}>Nema akcija još.</p>
              <p style={{ color: '#6b7fa3', fontSize: '13px', marginTop: '8px' }}>
                Kreirajte prvu akciju klikom na dugme iznad.
              </p>
            </div>
          ) : (
            akcije.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < akcije.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                flexWrap: 'wrap', gap: '8px',
                transition: 'background 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '10px',
                    background: jeAktivna(a) ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0
                  }}>
                    🎯
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f7', margin: 0 }}>
                      {a.title}
                      {jeAktivna(a) && (
                        <span style={{ fontSize: '11px', background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '2px 8px', borderRadius: '20px', marginLeft: '8px' }}>
                          Aktivna
                        </span>
                      )}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '3px' }}>
                      {a.service_name ? `${a.service_name} · ` : 'Sve usluge · '}
                      {a.discount_percent ? `${a.discount_percent}% popusta` : `${a.discount_amount} KM popusta`}
                      {' · '}
                      {formatDatum(a.valid_from)} — {formatDatum(a.valid_to)}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => toggleAkcija(a.id, a.is_active)} style={{
                    background: a.is_active ? 'rgba(251,191,36,0.1)' : 'rgba(74,222,128,0.1)',
                    border: a.is_active ? '1px solid rgba(251,191,36,0.2)' : '1px solid rgba(74,222,128,0.2)',
                    color: a.is_active ? '#fbbf24' : '#4ade80',
                    borderRadius: '8px', padding: '4px 12px', fontSize: '12px',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                  }}>
                    {a.is_active ? 'Deaktiviraj' : 'Aktiviraj'}
                  </button>
                  <button onClick={() => obrisiAkciju(a.id)} style={{
                    background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
                    color: '#f87171', borderRadius: '8px', padding: '4px 12px',
                    fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                  }}>
                    Obriši
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

export default Akcije
