import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'https://termini-pro.onrender.com';

export default function NovaUsluga() {
  const navigate = useNavigate();
  const [forma, setForma] = useState({
    name: '',
    price: '',
    duration: '',
    description: '',
    color: '#4ade80'
  });
  const [greska, setGreska] = useState('');
  const [uspjeh, setUspjeh] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska('');
    setUspjeh('');

    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');

    const res = await fetch(`${API}/api/services/${businessId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: forma.name,
        price: parseFloat(forma.price),
        duration: parseInt(forma.duration),
        description: forma.description,
        color: forma.color
      })
    });

    const data = await res.json();

    if (res.ok) {
      setUspjeh('Usluga uspješno dodana! ✅');
      setTimeout(() => navigate('/usluge'), 1500);
    } else {
      setGreska(data.error || 'Greška pri dodavanju usluge.');
    }
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', fontSize: '14px',
    color: '#f0f4ff', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'Inter, sans-serif'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <button onClick={() => navigate('/usluge')} style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px', padding: '8px 14px', cursor: 'pointer',
            fontSize: '16px', color: '#c8d0e8'
          }}>←</button>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#f0f4ff', margin: 0 }}>
            📌 Nova usluga
          </h1>
        </div>

        {/* Poruke */}
        {greska && (
          <div style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '14px' }}>
            {greska}
          </div>
        )}
        {uspjeh && (
          <div style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '14px' }}>
            {uspjeh}
          </div>
        )}

        {/* Forma */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div>
              <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '6px' }}>
                Naziv usluge / tretmana
              </label>
              <input
                type="text" value={forma.name}
                onChange={e => setForma({ ...forma, name: e.target.value })}
                required
                placeholder="npr. Pregled, Terapija, Tretman..."
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '6px' }}>
                  Cijena (KM)
                </label>
                <input
                  type="number" value={forma.price}
                  onChange={e => setForma({ ...forma, price: e.target.value })}
                  required placeholder="50"
                  min="0" step="0.50"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '6px' }}>
                  Trajanje (min)
                </label>
                <input
                  type="number" value={forma.duration}
                  onChange={e => setForma({ ...forma, duration: e.target.value })}
                  required placeholder="30"
                  min="5" step="5"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '6px' }}>
                Opis (opciono)
              </label>
              <textarea
                value={forma.description}
                onChange={e => setForma({ ...forma, description: e.target.value })}
                placeholder="Kratki opis usluge..."
                style={{ ...inputStyle, resize: 'vertical', padding: '11px 14px' }}
                rows={3}
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '6px' }}>
                Boja oznake
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="color" value={forma.color}
                  onChange={e => setForma({ ...forma, color: e.target.value })}
                  style={{ width: '48px', height: '48px', cursor: 'pointer', borderRadius: '8px', border: 'none', background: 'none' }}
                />
                <span style={{ fontSize: '13px', color: '#6b7fa3' }}>
                  Odaberite boju za vizualnu oznaku usluge
                </span>
              </div>
            </div>

            <button type="submit" style={{
              width: '100%', background: '#16a34a', color: 'white',
              padding: '13px', border: 'none', borderRadius: '10px',
              cursor: 'pointer', fontSize: '15px', fontWeight: '600',
              fontFamily: 'Inter, sans-serif', marginTop: '8px'
            }}>
              Dodaj uslugu →
            </button>

            <button type="button" onClick={() => navigate('/usluge')} style={{
              width: '100%', background: 'rgba(255,255,255,0.05)',
              color: '#8b9ec7', padding: '13px',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
              cursor: 'pointer', fontSize: '15px', fontFamily: 'Inter, sans-serif'
            }}>
              Odustani
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
