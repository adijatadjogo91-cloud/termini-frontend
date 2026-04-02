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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <p style={{ color: '#888' }}>Učitavanje...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '4px' }}>Usluge</h1>
            <p style={{ color: '#888', fontSize: '15px' }}>{usluge.length} usluga ukupno</p>
          </div>
          <button
            onClick={() => navigate('/nova-usluga')}
            style={{
              background: '#1a7a4a', color: 'white', border: 'none',
              borderRadius: '8px', padding: '10px 20px', fontSize: '14px',
              fontWeight: '500', cursor: 'pointer'
            }}>
            + Nova usluga
          </button>
        </div>

        {/* Lista usluga */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {usluge.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ fontSize: '32px', marginBottom: '1rem' }}>✂️</p>
              <p style={{ color: '#888', fontSize: '15px' }}>Nema usluga još.</p>
              <p style={{ color: '#bbb', fontSize: '13px', marginTop: '8px' }}>
                Dodajte prvu uslugu klikom na dugme iznad.
              </p>
            </div>
          ) : (
            usluge.map((u, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < usluge.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '12px', height: '40px', borderRadius: '4px',
                    backgroundColor: u.color || '#4a7c59'
                  }} />
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '500', color: '#1a1a1a' }}>{u.name}</p>
                    <p style={{ fontSize: '13px', color: '#888' }}>{u.duration} min</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a7a4a' }}>{u.price} KM</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}