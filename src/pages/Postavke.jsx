import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'https://termini-pro.onrender.com';

const DANI = [
  { key: 'mon', naziv: 'Ponedjeljak' },
  { key: 'tue', naziv: 'Utorak' },
  { key: 'wed', naziv: 'Srijeda' },
  { key: 'thu', naziv: 'Četvrtak' },
  { key: 'fri', naziv: 'Petak' },
  { key: 'sat', naziv: 'Subota' },
  { key: 'sun', naziv: 'Nedjelja' },
];

export default function Postavke() {
  const navigate = useNavigate();
  const [forma, setForma] = useState({
    name: '', type: '', address: '', city: '',
    phone: '', email: '', description: '', slot_duration: 30,
  });
  const [radnoVrijeme, setRadnoVrijeme] = useState({
    mon: { active: true, from: '09:00', to: '17:00' },
    tue: { active: true, from: '09:00', to: '17:00' },
    wed: { active: true, from: '09:00', to: '17:00' },
    thu: { active: true, from: '09:00', to: '17:00' },
    fri: { active: true, from: '09:00', to: '17:00' },
    sat: { active: false, from: '09:00', to: '14:00' },
    sun: { active: false, from: '09:00', to: '14:00' },
  });
  const [blokiraniDani, setBlokiraniDani] = useState([]);
  const [noviBlokiran, setNoviBlokiran] = useState('');
  const [ucitava, setUcitava] = useState(true);
  const [sprema, setSprema] = useState(false);
  const [uspjeh, setUspjeh] = useState('');
  const [greska, setGreska] = useState('');

  useEffect(() => {
    ucitajPodatke();
  }, []);

  async function ucitajPodatke() {
    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');
    try {
      const res = await fetch(`${API}/api/businesses/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const b = data.business;
      setForma({
        name: b.name || '',
        type: b.type || '',
        address: b.address || '',
        city: b.city || '',
        phone: b.phone || '',
        email: b.email || '',
        description: b.description || '',
        slot_duration: b.slot_duration || 30,
      });
      if (b.blocked_dates) {
      const bd = typeof b.blocked_dates === 'string'
    ? JSON.parse(b.blocked_dates)
    : b.blocked_dates
    setBlokiraniDani(bd || [])
    }
      if (b.working_hours) {
        const wh = typeof b.working_hours === 'string'
          ? JSON.parse(b.working_hours)
          : b.working_hours;
        const novo = { ...radnoVrijeme };
        DANI.forEach(({ key }) => {
          if (wh[key]) {
            novo[key] = { active: true, from: wh[key].from, to: wh[key].to };
          } else {
            novo[key] = { ...novo[key], active: false };
          }
        });
        setRadnoVrijeme(novo);
      }
    } catch (err) {
      setGreska('Greška pri učitavanju podataka.');
    }
    setUcitava(false);
  }

  async function handleSave() {
    setSprema(true);
    setUspjeh('');
    setGreska('');
    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');

    const working_hours = {};
    DANI.forEach(({ key }) => {
      if (radnoVrijeme[key].active) {
        working_hours[key] = { from: radnoVrijeme[key].from, to: radnoVrijeme[key].to };
      }
    });

    try {
      const res = await fetch(`${API}/api/businesses/${businessId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
       body: JSON.stringify({ ...forma, working_hours, blocked_dates: blokiraniDani })
      });
      if (res.ok) {
        setUspjeh('Postavke su sačuvane! ✅');
        setTimeout(() => setUspjeh(''), 3000);
      } else {
        setGreska('Greška pri čuvanju.');
      }
    } catch (err) {
      setGreska('Greška pri čuvanju.');
    }
    setSprema(false);
  }

  if (ucitava) return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Učitavanje...</div>
  );

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <button onClick={() => navigate('/dashboard')} style={{
          background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px'
        }}>←</button>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>⚙️ Postavke salona</h2>
      </div>

      {uspjeh && <p style={{ background: '#eaf3de', color: '#1a7a4a', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>{uspjeh}</p>}
      {greska && <p style={{ background: '#fdecea', color: '#e24b4a', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>{greska}</p>}

      {/* Osnovni podaci */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Osnovni podaci</h3>
        {[
          { label: 'Naziv salona', key: 'name', placeholder: 'Salon Amra' },
          { label: 'Tip biznisa', key: 'type', placeholder: 'frizer, kozmetičar...' },
          { label: 'Grad', key: 'city', placeholder: 'Sarajevo' },
          { label: 'Adresa', key: 'address', placeholder: 'Ulica bb' },
          { label: 'Telefon', key: 'phone', placeholder: '061 123 456' },
          { label: 'Email (za obavijesti)', key: 'email', placeholder: 'salon@gmail.com' },
        ].map(({ label, key, placeholder }) => (
          <div key={key} style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '4px' }}>{label}</label>
            <input
              type={key === 'email' ? 'email' : 'text'}
              value={forma[key]}
              onChange={e => setForma({ ...forma, [key]: e.target.value })}
              placeholder={placeholder}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
        ))}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '4px' }}>Opis salona</label>
          <textarea
            value={forma.description}
            onChange={e => setForma({ ...forma, description: e.target.value })}
            placeholder="Kratki opis vašeg salona..."
            rows={3}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '4px' }}>Trajanje slota (min)</label>
          <select
            value={forma.slot_duration}
            onChange={e => setForma({ ...forma, slot_duration: parseInt(e.target.value) })}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }}
          >
            {[15, 20, 30, 45, 60].map(d => (
              <option key={d} value={d}>{d} minuta</option>
            ))}
          </select>
        </div>
      </div>

      {/* Radno vrijeme */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Radno vrijeme</h3>
        {DANI.map(({ key, naziv }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={radnoVrijeme[key].active}
              onChange={e => setRadnoVrijeme({ ...radnoVrijeme, [key]: { ...radnoVrijeme[key], active: e.target.checked } })}
            />
            <span style={{ width: '110px', fontSize: '14px', color: radnoVrijeme[key].active ? '#1a1a1a' : '#aaa' }}>{naziv}</span>
            {radnoVrijeme[key].active ? (
              <>
                <input
                  type="time"
                  value={radnoVrijeme[key].from}
                  onChange={e => setRadnoVrijeme({ ...radnoVrijeme, [key]: { ...radnoVrijeme[key], from: e.target.value } })}
                  style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                />
                <span style={{ color: '#888' }}>—</span>
                <input
                  type="time"
                  value={radnoVrijeme[key].to}
                  onChange={e => setRadnoVrijeme({ ...radnoVrijeme, [key]: { ...radnoVrijeme[key], to: e.target.value } })}
                  style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                />
              </>
            ) : (
              <span style={{ fontSize: '13px', color: '#aaa' }}>Zatvoreno</span>
            )}
          </div>
        ))}
      </div>
{/* Blokirani dani */}
<div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>🚫 Blokirani dani</h3>
  <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>
    Dodajte datume kada salon ne radi (praznici, godišnji odmor...).
  </p>
  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
    <input
      type="date"
      value={noviBlokiran}
      min={new Date().toISOString().split('T')[0]}
      onChange={e => setNoviBlokiran(e.target.value)}
      style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }}
    />
    <button
      onClick={() => {
        if (!noviBlokiran) return
        if (blokiraniDani.includes(noviBlokiran)) return
        setBlokiraniDani([...blokiraniDani, noviBlokiran].sort())
        setNoviBlokiran('')
      }}
      style={{
        background: '#1a7a4a', color: 'white', border: 'none',
        borderRadius: '8px', padding: '10px 16px', fontSize: '14px',
        fontWeight: '600', cursor: 'pointer'
      }}
    >
      + Dodaj
    </button>
  </div>
  {blokiraniDani.length === 0 ? (
    <p style={{ fontSize: '13px', color: '#aaa', textAlign: 'center', padding: '12px' }}>
      Nema blokiranih dana
    </p>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {blokiraniDani.map(datum => (
        <div key={datum} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#fdecea', borderRadius: '8px', padding: '10px 14px'
        }}>
          <span style={{ fontSize: '14px', color: '#1a1a1a', fontWeight: '500' }}>
            🚫 {new Date(datum + 'T00:00:00').toLocaleDateString('hr-HR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => setBlokiraniDani(blokiraniDani.filter(d => d !== datum))}
            style={{ background: 'none', border: 'none', color: '#e24b4a', cursor: 'pointer', fontSize: '18px' }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )}
</div>
      <button
        onClick={handleSave}
        disabled={sprema}
        style={{
          width: '100%', background: '#1a7a4a', color: 'white',
          border: 'none', borderRadius: '10px', padding: '14px',
          fontSize: '16px', fontWeight: '600', cursor: 'pointer'
        }}
      >
        {sprema ? 'Čuvanje...' : 'Sačuvaj postavke →'}
      </button>
    </div>
  );
}