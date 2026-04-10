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
  const [galerija, setGalerija] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [ucitava, setUcitava] = useState(true);
  const [sprema, setSprema] = useState(false);
  const [uspjeh, setUspjeh] = useState('');
  const [greska, setGreska] = useState('');

  useEffect(() => {
    ucitajPodatke();
    ucitajGaleriju();
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
        name: b.name || '', type: b.type || '', address: b.address || '',
        city: b.city || '', phone: b.phone || '', email: b.email || '',
        description: b.description || '', slot_duration: b.slot_duration || 30,
      });
      if (b.blocked_dates) {
        const bd = typeof b.blocked_dates === 'string' ? JSON.parse(b.blocked_dates) : b.blocked_dates;
        setBlokiraniDani(bd || []);
      }
      if (b.working_hours) {
        const wh = typeof b.working_hours === 'string' ? JSON.parse(b.working_hours) : b.working_hours;
        const novo = { ...radnoVrijeme };
        DANI.forEach(({ key }) => {
          if (wh[key]) novo[key] = { active: true, from: wh[key].from, to: wh[key].to };
          else novo[key] = { ...novo[key], active: false };
        });
        setRadnoVrijeme(novo);
      }
    } catch (err) {
      setGreska('Greška pri učitavanju podataka.');
    }
    setUcitava(false);
  }

  async function ucitajGaleriju() {
    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');
    try {
      const res = await fetch(`${API}/api/gallery/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setGalerija(data.gallery || []);
    } catch (err) {}
  }

  async function uploadSliku(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');
    const formData = new FormData();
    formData.append('image', file);
    try {
      await fetch(`${API}/api/gallery/${businessId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      ucitajGaleriju();
    } catch (err) {
      setGreska('Greška pri uploadu slike.');
    }
    setUploading(false);
  }

  async function obrisiSliku(imageId) {
    if (!window.confirm('Obrisati ovu sliku?')) return;
    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');
    try {
      await fetch(`${API}/api/gallery/${businessId}/${imageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      ucitajGaleriju();
    } catch (err) {}
  }

  async function handleSave() {
    setSprema(true); setUspjeh(''); setGreska('');
    const token = localStorage.getItem('token');
    const businessId = localStorage.getItem('businessId');
    const working_hours = {};
    DANI.forEach(({ key }) => {
      if (radnoVrijeme[key].active) working_hours[key] = { from: radnoVrijeme[key].from, to: radnoVrijeme[key].to };
    });
    try {
      const res = await fetch(`${API}/api/businesses/${businessId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...forma, working_hours, blocked_dates: blokiraniDani })
      });
      if (res.ok) { setUspjeh('Postavke su sačuvane! ✅'); setTimeout(() => setUspjeh(''), 3000); }
      else setGreska('Greška pri čuvanju.');
    } catch (err) { setGreska('Greška pri čuvanju.'); }
    setSprema(false);
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', fontSize: '14px',
    color: '#f0f4ff', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'Inter, sans-serif'
  };

  const karticaStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px', padding: '24px', marginBottom: '16px'
  };

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
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>

        {/* Naslov */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <button onClick={() => navigate('/dashboard')} style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px', padding: '8px 14px', cursor: 'pointer',
            fontSize: '16px', color: '#c8d0e8'
          }}>←</button>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#f0f4ff', margin: 0 }}>
            ⚙️ Postavke salona
          </h1>
        </div>

        {/* Poruke */}
        {uspjeh && (
          <div style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '14px' }}>
            {uspjeh}
          </div>
        )}
        {greska && (
          <div style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '14px' }}>
            {greska}
          </div>
        )}

        {/* Osnovni podaci */}
        <div style={karticaStyle}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f0f4ff', marginBottom: '16px' }}>
            📋 Osnovni podaci
          </h3>
          {[
            { label: 'Naziv salona', key: 'name', placeholder: 'Salon Amra' },
            { label: 'Tip biznisa', key: 'type', placeholder: 'frizer, kozmetičar...' },
            { label: 'Grad', key: 'city', placeholder: 'Sarajevo' },
            { label: 'Adresa', key: 'address', placeholder: 'Ulica bb' },
            { label: 'Telefon', key: 'phone', placeholder: '061 123 456' },
            { label: 'Email (za obavijesti)', key: 'email', placeholder: 'salon@gmail.com' },
          ].map(({ label, key, placeholder }) => (
            <div key={key} style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>{label}</label>
              <input
                type={key === 'email' ? 'email' : 'text'}
                value={forma[key]}
                onChange={e => setForma({ ...forma, [key]: e.target.value })}
                placeholder={placeholder}
                style={inputStyle}
              />
            </div>
          ))}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>Opis salona</label>
            <textarea
              value={forma.description}
              onChange={e => setForma({ ...forma, description: e.target.value })}
              placeholder="Kratki opis vašeg salona..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', padding: '11px 14px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', color: '#8b9ec7', display: 'block', marginBottom: '5px' }}>Trajanje slota (min)</label>
            <select
              value={forma.slot_duration}
              onChange={e => setForma({ ...forma, slot_duration: parseInt(e.target.value) })}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {[15, 20, 30, 45, 60].map(d => (
                <option key={d} value={d} style={{ background: '#1a2035' }}>{d} minuta</option>
              ))}
            </select>
          </div>
        </div>

        {/* Radno vrijeme */}
        <div style={karticaStyle}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f0f4ff', marginBottom: '16px' }}>
            🕐 Radno vrijeme
          </h3>
          {DANI.map(({ key, naziv }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={radnoVrijeme[key].active}
                onChange={e => setRadnoVrijeme({ ...radnoVrijeme, [key]: { ...radnoVrijeme[key], active: e.target.checked } })}
                style={{ accentColor: '#4ade80', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span style={{ width: '110px', fontSize: '14px', color: radnoVrijeme[key].active ? '#e2e8f7' : '#4a5a7a' }}>
                {naziv}
              </span>
              {radnoVrijeme[key].active ? (
                <>
                  <input
                    type="time"
                    value={radnoVrijeme[key].from}
                    onChange={e => setRadnoVrijeme({ ...radnoVrijeme, [key]: { ...radnoVrijeme[key], from: e.target.value } })}
                    style={{ ...inputStyle, width: 'auto', padding: '7px 10px' }}
                  />
                  <span style={{ color: '#6b7fa3' }}>—</span>
                  <input
                    type="time"
                    value={radnoVrijeme[key].to}
                    onChange={e => setRadnoVrijeme({ ...radnoVrijeme, [key]: { ...radnoVrijeme[key], to: e.target.value } })}
                    style={{ ...inputStyle, width: 'auto', padding: '7px 10px' }}
                  />
                </>
              ) : (
                <span style={{ fontSize: '13px', color: '#4a5a7a' }}>Zatvoreno</span>
              )}
            </div>
          ))}
        </div>

        {/* Blokirani dani */}
        <div style={karticaStyle}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f0f4ff', marginBottom: '8px' }}>
            🚫 Blokirani dani
          </h3>
          <p style={{ fontSize: '13px', color: '#6b7fa3', marginBottom: '16px' }}>
            Dodajte datume kada salon ne radi (praznici, godišnji odmor...).
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="date"
              value={noviBlokiran}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setNoviBlokiran(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={() => {
                if (!noviBlokiran) return;
                if (blokiraniDani.includes(noviBlokiran)) return;
                setBlokiraniDani([...blokiraniDani, noviBlokiran].sort());
                setNoviBlokiran('');
              }}
              style={{
                background: '#16a34a', color: 'white', border: 'none',
                borderRadius: '10px', padding: '11px 18px', fontSize: '14px',
                fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap'
              }}
            >
              + Dodaj
            </button>
          </div>
          {blokiraniDani.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#4a5a7a', textAlign: 'center', padding: '12px' }}>
              Nema blokiranih dana
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {blokiraniDani.map(datum => (
                <div key={datum} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
                  borderRadius: '10px', padding: '10px 14px'
                }}>
                  <span style={{ fontSize: '14px', color: '#f87171', fontWeight: '500' }}>
                    🚫 {new Date(datum + 'T00:00:00').toLocaleDateString('hr-HR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => setBlokiraniDani(blokiraniDani.filter(d => d !== datum))}
                    style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Galerija radova */}
        <div style={karticaStyle}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f0f4ff', marginBottom: '8px' }}>
            🖼️ Galerija radova
          </h3>
          <p style={{ fontSize: '13px', color: '#6b7fa3', marginBottom: '16px' }}>
            Dodajte slike vaših radova — prikazuju se klijentima na booking stranici.
          </p>
          <label style={{
            display: 'inline-block', background: '#16a34a', color: 'white',
            borderRadius: '10px', padding: '10px 18px', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer', marginBottom: '16px'
          }}>
            {uploading ? 'Uploading...' : '+ Dodaj sliku'}
            <input
              type="file"
              accept="image/*"
              onChange={uploadSliku}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
          {galerija.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#4a5a7a', textAlign: 'center', padding: '16px' }}>
              Nema slika još. Dodajte prve slike vaših radova!
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {galerija.map((slika, i) => (
                <div key={i} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                  <img
                    src={slika.image_url}
                    alt="Rad salona"
                    style={{ width: '100%', height: '100px', objectFit: 'cover', display: 'block' }}
                  />
                  <button
                    onClick={() => obrisiSliku(slika.id)}
                    style={{
                      position: 'absolute', top: '4px', right: '4px',
                      background: 'rgba(0,0,0,0.6)', border: 'none',
                      color: 'white', borderRadius: '50%',
                      width: '24px', height: '24px', cursor: 'pointer',
                      fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dugme */}
        <button
          onClick={handleSave}
          disabled={sprema}
          style={{
            width: '100%', background: sprema ? 'rgba(255,255,255,0.1)' : '#16a34a',
            color: sprema ? '#6b7fa3' : 'white', border: 'none',
            borderRadius: '12px', padding: '15px',
            fontSize: '16px', fontWeight: '600', cursor: sprema ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, sans-serif', marginBottom: '2rem'
          }}
        >
          {sprema ? 'Čuvanje...' : 'Sačuvaj postavke →'}
        </button>

      </div>
    </div>
  );
}
