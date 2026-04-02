import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'https://termini-pro.onrender.com';

export default function NoviKlijent() {
  const navigate = useNavigate();
  const [forma, setForma] = useState({
    name: '',
    phone: '',
    email: '',
    napomena: ''
  });
  const [greska, setGreska] = useState('');
  const [uspjeh, setUspjeh] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska('');
    setUspjeh('');

    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');

    const res = await fetch(`${API}/api/clients/${businessId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: forma.name,
        phone: forma.phone,
        email: forma.email,
        notes: forma.napomena
      })
    });

    const data = await res.json();

    if (res.ok) {
      setUspjeh('Klijent uspješno dodan! ✅');
      setTimeout(() => navigate('/klijenti'), 1500);
    } else {
      setGreska(data.error || 'Greška pri dodavanju klijenta.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      <h2>👤 Novi klijent</h2>

      {greska && <p style={{ color: 'red' }}>{greska}</p>}
      {uspjeh && <p style={{ color: 'green' }}>{uspjeh}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

        <div>
          <label>Ime i prezime:</label>
          <input
            type="text"
            value={forma.name}
            onChange={e => setForma({ ...forma, name: e.target.value })}
            required
            placeholder="npr. Ana Kovač"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Telefon:</label>
          <input
            type="text"
            value={forma.phone}
            onChange={e => setForma({ ...forma, phone: e.target.value })}
            placeholder="npr. 061 123 456"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Email (opciono):</label>
          <input
            type="email"
            value={forma.email}
            onChange={e => setForma({ ...forma, email: e.target.value })}
            placeholder="npr. ana@gmail.com"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Napomena (opciono):</label>
          <textarea
            value={forma.napomena}
            onChange={e => setForma({ ...forma, napomena: e.target.value })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            rows={3}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#6c63ff',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Dodaj klijenta
        </button>

        <button
          type="button"
          onClick={() => navigate('/klijenti')}
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