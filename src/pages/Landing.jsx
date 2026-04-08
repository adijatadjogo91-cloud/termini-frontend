import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const zanimanja = ['frizere', 'zubare', 'tattoo studije', 'kozmetičare', 'terapeute', 'nail studije']
  const [trenutnoZanimanje, setTrenutnoZanimanje] = useState(0)
  const [sirina, setSirina] = useState(window.innerWidth)

  useEffect(() => {
    const interval = setInterval(() => {
      setTrenutnoZanimanje(prev => (prev + 1) % zanimanja.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleResize = () => setSirina(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const mobitel = sirina < 768

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>

      {/* Navbar */}
      <div style={{
        height: '64px', background: 'white', borderBottom: '1px solid #eee',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem', position: 'sticky', top: 0, zIndex: 100
      }}>
        <h2 style={{ fontSize: '20px' }}>
          termini<span style={{ color: '#1a7a4a' }}>.pro</span>
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/login')} style={{
            background: 'none', border: '1px solid #ddd', borderRadius: '8px',
            padding: mobitel ? '7px 12px' : '8px 16px', fontSize: '13px', cursor: 'pointer', color: '#555'
          }}>
            Prijava
          </button>
          <button onClick={() => navigate('/register')} style={{
            background: '#1a7a4a', border: 'none', borderRadius: '8px',
            padding: mobitel ? '7px 12px' : '8px 16px', fontSize: '13px', cursor: 'pointer', color: 'white',
            fontWeight: '500'
          }}>
            {mobitel ? 'Probaj' : 'Probaj besplatno'}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #f0faf4 0%, #ffffff 100%)',
        padding: mobitel ? '48px 1.5rem' : '80px 2rem', textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{
            background: '#eaf3de', color: '#1a7a4a', padding: '6px 14px',
            borderRadius: '20px', fontSize: '13px', fontWeight: '500'
          }}>
            🎉 14 dana besplatno — bez kartice
          </span>
          <h1 style={{ fontSize: mobitel ? '32px' : '48px', fontWeight: '700', marginTop: '24px', lineHeight: '1.2' }}>
            Dok spavate, vaši termini<br />
            <span style={{ color: '#1a7a4a' }}>se pune sami.</span>
          </h1>
          <p style={{ fontSize: mobitel ? '15px' : '18px', color: '#555', marginTop: '20px', lineHeight: '1.6' }}>
            Jedan link. Vaši klijenti zakazuju sami — 24/7.<br />
            termini.pro za{' '}
            <span style={{
              color: '#1a7a4a', fontWeight: '600',
              borderBottom: '2px solid #1a7a4a',
            }}>
              {zanimanja[trenutnoZanimanje]}
            </span>
            {' '}i još mnogo više.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '36px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/register')} style={{
              background: '#1a7a4a', color: 'white', border: 'none',
              borderRadius: '10px', padding: '14px 28px', fontSize: '16px',
              fontWeight: '600', cursor: 'pointer', width: mobitel ? '100%' : 'auto'
            }}>
              Počni besplatno →
            </button>
            <button onClick={() => navigate('/login')} style={{
              background: 'white', color: '#1a1a1a', border: '1px solid #ddd',
              borderRadius: '10px', padding: '14px 28px', fontSize: '16px',
              cursor: 'pointer', width: mobitel ? '100%' : 'auto'
            }}>
              Prijavi se
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: mobitel ? '48px 1.5rem' : '80px 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: mobitel ? '24px' : '32px', fontWeight: '700', marginBottom: '32px' }}>
            Sve što vam treba na jednom mjestu
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobitel ? '1fr' : 'repeat(3, 1fr)',
            gap: mobitel ? '16px' : '32px'
          }}>
            {[
              { icon: '📅', title: 'Termini', opis: 'Lako zakazujte i pratite sve termine. Pregled po danu, sedmici ili mjesecu.' },
              { icon: '👥', title: 'Klijenti', opis: 'Baza svih vaših klijenata sa historijom posjeta i kontakt informacijama.' },
              { icon: '📧', title: 'Email podsjetnici', opis: 'Automatski email podsjetnici klijentima dan prije termina. Manje otkaza!' },
              { icon: '💰', title: 'Prihodi', opis: 'Pratite prihode po danu, sedmici i mjesecu. Znajte gdje stojite.' },
              { icon: '📋', title: 'Usluge', opis: 'Definirajte svoje usluge, cijene i trajanje. Prilagodite svom biznisu.' },
              { icon: '✨', title: 'AI asistent', opis: 'Pametni asistent koji analizira vaše poslovanje i daje savjete.' },
            ].map((f, i) => (
              <div key={i} style={{
                padding: '24px', borderRadius: '12px', border: '1px solid #eee',
                background: '#fafafa', display: 'flex', alignItems: 'flex-start', gap: mobitel ? '16px' : '0',
                flexDirection: mobitel ? 'row' : 'column'
              }}>
                <p style={{ fontSize: '28px', marginBottom: mobitel ? '0' : '12px', minWidth: '36px' }}>{f.icon}</p>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>{f.title}</h3>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{f.opis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cijene */}
      <div style={{ padding: mobitel ? '48px 1.5rem' : '80px 2rem', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: mobitel ? '24px' : '32px', fontWeight: '700', marginBottom: '12px' }}>
            Jednostavne cijene
          </h2>
          <p style={{ color: '#666', fontSize: '15px', marginBottom: '36px' }}>
            Odaberite plan koji odgovara vašem biznisu. Bez skrivenih troškova.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: mobitel ? '1fr' : '1fr 1fr',
            gap: '20px'
          }}>

            {/* Starter */}
            <div style={{
              background: 'white', borderRadius: '16px', padding: mobitel ? '28px' : '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #eee',
              textAlign: 'left'
            }}>
              <p style={{ fontSize: '13px', color: '#888', fontWeight: '600', marginBottom: '8px' }}>
                STARTER
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '36px', fontWeight: '700' }}>49</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>KM</span>
                <span style={{ fontSize: '14px', color: '#888' }}>/mj</span>
              </div>
              <p style={{ color: '#888', fontSize: '13px', marginBottom: '24px' }}>14 dana besplatno, bez kartice</p>
              <div style={{ marginBottom: '24px' }}>
                {[
                  '✅ Neograničeni termini',
                  '✅ Neograničeni klijenti',
                  '✅ Email podsjetnici',
                  '✅ SMS podsjetnici (backup)',
                  '✅ Praćenje prihoda',
                  '✅ AI asistent (20 upita/dan)',
                  '✅ Booking mini-stranica',
                  '✅ Mjesečni izvještaj',
                  '✅ Podrška putem emaila',
                ].map((s, i) => (
                  <p key={i} style={{ padding: '6px 0', borderBottom: '1px solid #f0f0f0', fontSize: '13px' }}>{s}</p>
                ))}
              </div>
              <button onClick={() => window.open('https://termini-pro.lemonsqueezy.com/checkout/buy/8a033a28-cf56-428a-bd22-abca6bba37f9', '_blank')} style={{
                width: '100%', background: '#1a7a4a', color: 'white', border: 'none',
                borderRadius: '10px', padding: '14px', fontSize: '15px',
                fontWeight: '600', cursor: 'pointer'
              }}>
                Počni besplatno →
              </button>
            </div>

            {/* Premium */}
            <div style={{
              background: 'white', borderRadius: '16px', padding: mobitel ? '28px' : '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '2px solid #1a7a4a',
              textAlign: 'left', position: 'relative'
            }}>
              <div style={{
                position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                background: '#1a7a4a', color: 'white', padding: '4px 16px',
                borderRadius: '20px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap'
              }}>
                NAJPOPULARNIJE
              </div>
              <p style={{ fontSize: '13px', color: '#1a7a4a', fontWeight: '600', marginBottom: '8px' }}>
                PREMIUM
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '36px', fontWeight: '700' }}>99</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>KM</span>
                <span style={{ fontSize: '14px', color: '#888' }}>/mj</span>
              </div>
              <p style={{ color: '#888', fontSize: '13px', marginBottom: '24px' }}>14 dana besplatno, bez kartice</p>
              <div style={{ marginBottom: '24px' }}>
                {[
                  '✅ Sve iz Starter plana',
                  '✅ WhatsApp podsjetnici',
                  '✅ AI asistent (neograničeno)',
                  '✅ Automatski ponovni dolazak',
                  '✅ Recenzije nakon termina',
                  '✅ Prioritetna podrška',
                ].map((s, i) => (
                  <p key={i} style={{ padding: '6px 0', borderBottom: '1px solid #f0f0f0', fontSize: '13px' }}>{s}</p>
                ))}
              </div>
              <button onClick={() => navigate('/register')} style={{
                width: '100%', background: '#1a7a4a', color: 'white', border: 'none',
                borderRadius: '10px', padding: '14px', fontSize: '15px',
                fontWeight: '600', cursor: 'pointer'
              }}>
                Počni besplatno →
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '32px 1.5rem', background: 'white', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ color: '#888', fontSize: '14px' }}>
          © 2026 termini.pro — Napravljeno s ❤️ u Bosni i Hercegovini
        </p>
        <p style={{ marginTop: '8px' }}>
          <a href="/terms" style={{ color: '#888', fontSize: '13px', textDecoration: 'underline' }}>
            Uslovi korištenja
          </a>
        </p>
      </div>

    </div>
  );
}