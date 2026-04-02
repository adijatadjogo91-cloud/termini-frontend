import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'https://termini-pro.onrender.com';

export default function NoviTermin() {
  const navigate = useNavigate();
  const [klijenti, setKlijenti] = useState([]);
  const [usluge, setUsluge] = useState([]);
  const [forma, setForma] = useState({
    klijent_id: '',
    usluga_id: '',
    datum: '',
    vrijeme: '',
    napomena: ''
  });
  const [greska, setGreska] = useState('');
  const [uspjeh, setUspjeh] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');

    // Učitaj klijente
    fetch(`${API}/api/clients/${businessId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setKlijenti(data.clients || []));

    // Učitaj usluge
    fetch(`${API}/api/services/${businessId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setUsluge(data.services || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska('');
    setUspjeh('');

    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');
    const dateTime = `${forma.datum}T${forma.vrijeme}:00+02:00`;

    const res = await fetch(`${API}/api/appointments/${businessId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
  clientId: forma.klijent_id,
  serviceId: forma.usluga_id,
  startsAt: dateTime,
  notes: forma.napomena
})
    });

    const data = await res.json();

    if (res.ok) {
      setUspjeh('Termin uspješno zakazan! ✅');
      setTimeout(() => navigate('/termini'), 1500);
    } else {
      setGreska(data.error || 'Greška pri zakazivanju termina.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      <h2>📅 Novi termin</h2>

      {greska && <p style={{ color: 'red' }}>{greska}</p>}
      {uspjeh && <p style={{ color: 'green' }}>{uspjeh}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

        <div>
          <label>Klijent:</label>
          <select
            value={forma.klijent_id}
            onChange={e => setForma({ ...forma, klijent_id: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">-- Odaberi klijenta --</option>
            {klijenti.map(k => (
              <option key={k.id} value={k.id}>{k.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Usluga:</label>
          <select
            value={forma.usluga_id}
            onChange={e => setForma({ ...forma, usluga_id: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">-- Odaberi uslugu --</option>
            {usluge.map(u => (
              <option key={u.id} value={u.id}>{u.name} — {u.price} KM</option>
            ))}
          </select>
        </div>

        <div>
          <label>Datum:</label>
          <input
            type="date"
            value={forma.datum}
            onChange={e => setForma({ ...forma, datum: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Vrijeme:</label>
          <input
            type="time"
            value={forma.vrijeme}
            onChange={e => setForma({ ...forma, vrijeme: e.target.value })}
            required
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
            backgroundColor: '#1a7a4a',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Zakaži termin
        </button>

        <button
          type="button"
          onClick={() => navigate('/termini')}
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