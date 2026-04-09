import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const API = 'https://termini-pro.onrender.com';

export default function Usluge() {
  const navigate = useNavigate();
  const [usluge, setUsluge] = useState([]);
  const [ucitava, setUcitava] = useState(true);
  const token = localStorage.getItem('token');
  const businessId = localStorage.getItem('businessId');

  useEffect(() => {
    if (!token) { window.location.href = '/login'; return; }
    ucitajUsluge();
  }, []);

  async function ucitajUsluge() {
    try {
      const res = await fetch(`${API}/api/services/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsluge(data.services || []);
    } catch (err) {
      console.error(err);
    }
    setUcitava(false);
  }

  if (ucitava) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#6b7fa3', fontSize: '14px' }}>Učitavanje...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f4ff', marginBottom: '4px' }}>
              ✂️ Usluge
            </h1>
            <p style={{ color: '#6b7fa3', fontSize: '15px' }}>
              {usluge.length} usluga ukupno
            </p>
          </div>
          <button onClick={() => navigate('/nova-usluga')} style={{
            background: '#16a34a', color: 'white', border: 'none',
            borderRadius: '10px', padding: '11px 22px', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
          }}>
            + Nova usluga
          </button>
        </div>

        {/* Stat kartica */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px', marginBottom: '1.5rem'
        }}>
          {[
            { label: 'Ukupno usluga', vrijednost: usluge.length, boja: '#4ade80', icon: '✂️' },
            { label: 'Prosječna cijena', vrijednost: usluge.length ? Math.round(usluge.reduce((s, u) => s + Number(u.price), 0) / usluge.length) + ' KM' : '0 KM', boja: '#c084fc', icon: '💰' },
            { label: 'Prosječno trajanje', vrijednost: usluge.length ? Math.round(usluge.reduce((s, u) => s + Number(u.duration), 0) / usluge.length) + ' min' : '0 min', boja: '#60a5fa', icon: '⏱' },
          ].map((k, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <span style={{ fontSize: '22px' }}>{k.icon}</span>
              <div>
                <p style={{ fontSize: '20px', fontWeight: '700', color: k.boja, margin: 0 }}>{k.vrijednost}</p>
                <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '2px' }}>{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lista usluga */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', overflow: 'hidden'
        }}>
          {usluge.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ fontSize: '40px', marginBottom: '12px' }}>✂️</p>
              <p style={{ color: '#c8d0e8', fontSize: '15px', fontWeight: '500' }}>Nema usluga još.</p>
              <p style={{ color: '#6b7fa3', fontSize: '13px', marginTop: '8px' }}>
                Dodajte prvu uslugu klikom na dugme iznad.
              </p>
            </div>
          ) : (
            usluge.map((u, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < usluge.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'background 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Colour bar */}
                  <div style={{
                    width: '4px', height: '44px', borderRadius: '4px',
                    background: u.color || '#4ade80', flexShrink: 0
                  }} />
                  {/* Icon krug */}
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '10px',
                    background: (u.color || '#4ade80') + '22',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0
                  }}>
                    ✂️
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '500', color: '#e2e8f7', margin: 0 }}>
                      {u.name}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7fa3', marginTop: '3px' }}>
                      ⏱ {u.duration} min
                      {u.description && ` · ${u.description}`}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: '#4ade80', margin: 0 }}>
                    {u.price} KM
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
