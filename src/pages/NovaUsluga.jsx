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
    color: '#4a7c59'
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

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      <h2>✂️ Nova usluga</h2>

      {greska && <p style={{ color: 'red' }}>{greska}</p>}
      {uspjeh && <p style={{ color: 'green' }}>{uspjeh}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

        <div>
          <label>Naziv usluge:</label>
          <input
            type="text"
            value={forma.name}
            onChange={e => setForma({ ...forma, name: e.target.value })}
            required
            placeholder="npr. Šišanje, Manikir, Masaža..."
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label>Cijena (KM):</label>
          <input
            type="number"
            value={forma.price}
            onChange={e => setForma({ ...forma, price: e.target.value })}
            required
            placeholder="npr. 20"
            min="0"
            step="0.50"
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label>Trajanje (minuta):</label>
          <input
            type="number"
            value={forma.duration}
            onChange={e => setForma({ ...forma, duration: e.target.value })}
            required
            placeholder="npr. 30, 60, 90..."
            min="5"
            step="5"
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label>Opis (opciono):</label>
          <textarea
            value={forma.description}
            onChange={e => setForma({ ...forma, description: e.target.value })}
            placeholder="Kratki opis usluge..."
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            rows={3}
          />
        </div>

        <div>
          <label>Boja:</label>
          <input
            type="color"
            value={forma.color}
            onChange={e => setForma({ ...forma, color: e.target.value })}
            style={{ width: '60px', height: '40px', marginTop: '5px', cursor: 'pointer' }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#1a7a4a',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Dodaj uslugu
        </button>

        <button
          type="button"
          onClick={() => navigate('/usluge')}
          style={{
            backgroundColor: '#eee',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Odustani
        </button>

      </form>
    </div>
  );
}