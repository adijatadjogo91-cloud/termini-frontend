import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const zanimanja = ['frizere', 'zubare', 'tattoo studije', 'kozmetičare', 'terapeute', 'nail studije']
  const [trenutnoZanimanje, setTrenutnoZanimanje] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTrenutnoZanimanje(prev => (prev + 1) % zanimanja.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>

      {/* Navbar */}
      <div style={{
        height: '64px', background: 'white', borderBottom: '1px solid #eee',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', position: 'sticky', top: 0, zIndex: 100
      }}>
        <h2 style={{ fontSize: '20px' }}>
          termini<span style={{ color: '#1a7a4a' }}>.pro</span>
        </h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/login')} style={{
            background: 'none', border: '1px solid #ddd', borderRadius: '8px',
            padding: '8px 16px', fontSize: '14px', cursor: 'pointer', color: '#555'
          }}>
            Prijava
          </button>
          <button onClick={() => navigate('/register')} style={{
            background: '#1a7a4a', border: 'none', borderRadius: '8px',
            padding: '8px 16px', fontSize: '14px', cursor: 'pointer', color: 'white',
            fontWeight: '500'
          }}>
            Probaj besplatno
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #f0faf4 0%, #ffffff 100%)',
        padding: '80px 2rem', textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{
            background: '#eaf3de', color: '#1a7a4a', padding: '6px 14px',
            borderRadius: '20px', fontSize: '13px', fontWeight: '500'
          }}>
            🎉 14 dana besplatno — bez kartice
          </span>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginTop: '24px', lineHeight: '1.2' }}>
            Dok spavate, vaši termini<br />
            <span style={{ color: '#1a7a4a' }}>se pune sami.</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#555', marginTop: '20px', lineHeight: '1.6' }}>
            Jedan link. Vaši klijenti zakazuju sami — 24/7.<br />
            termini.pro za{' '}
            <span style={{
              color: '#1a7a4a', fontWeight: '600',
              borderBottom: '2px solid #1a7a4a',
              transition: 'all 0.3s ease'
            }}>
              {zanimanja[trenutnoZanimanje]}
            </span>
            {' '}i još mnogo više.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '36px' }}>
            <button onClick={() => navigate('/register')} style={{
              background: '#1a7a4a', color: 'white', border: 'none',
              borderRadius: '10px', padding: '14px 28px', fontSize: '16px',
              fontWeight: '600', cursor: 'pointer'
            }}>
              Počni besplatno →
            </button>
            <button onClick={() => navigate('/login')} style={{
              background: 'white', color: '#1a1a1a', border: '1px solid #ddd',
              borderRadius: '10px', padding: '14px 28px', fontSize: '16px',
              cursor: 'pointer'
            }}>
              Prijavi se
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '80px 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '700', marginBottom: '48px' }}>
            Sve što vam treba na jednom mjestu
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { icon: '📅', title: 'Termini', opis: 'Lako zakazujte i pratite sve termine. Pregled po danu, sedmici ili mjesecu.' },
              { icon: '👥', title: 'Klijenti', opis: 'Baza svih vaših klijenata sa historijom posjeta i kontakt informacijama.' },
              { icon: '📱', title: 'SMS podsjetnici', opis: 'Automatski podsjetnici klijentima dan prije termina. Manje otkaza!' },
              { icon: '💰', title: 'Prihodi', opis: 'Pratite prihode po danu, sedmici i mjesecu. Znajte gdje stojite.' },
              { icon: '📋', title: 'Usluge', opis: 'Definirajte svoje usluge, cijene i trajanje. Prilagodite svom biznisu.' },
              { icon: '✨', title: 'AI asistent', opis: 'Pametni asistent koji analizira vaše poslovanje i daje savjete.' },
            ].map((f, i) => (
              <div key={i} style={{
                padding: '28px', borderRadius: '12px', border: '1px solid #eee',
                background: '#fafafa'
              }}>
                <p style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</p>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{f.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cijene */}
      <div style={{ padding: '80px 2rem', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>
            Jednostavne cijene
          </h2>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '48px' }}>
            Jedan plan, sve uključeno. Bez skrivenih troškova.
          </p>
          <div style={{
            background: 'white', borderRadius: '16px', padding: '48px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '2px solid #1a7a4a'
          }}>
            <p style={{ fontSize: '14px', color: '#1a7a4a', fontWeight: '600', marginBottom: '8px' }}>
              STARTER PLAN
            </p>
            <p style={{ fontSize: '48px', fontWeight: '700', marginBottom: '4px' }}>
              49 KM<span style={{ fontSize: '18px', color: '#888', fontWeight: '400' }}>/mjesečno</span>
            </p>
            <p style={{ color: '#888', marginBottom: '32px' }}>14 dana besplatno, bez kartice</p>
            <div style={{ textAlign: 'left', marginBottom: '32px' }}>
              {[
                '✅ Neograničeni termini',
                '✅ Neograničeni klijenti',
                '✅ SMS podsjetnici',
                '✅ Praćenje prihoda',
                '✅ AI asistent',
                '✅ Podrška putem emaila',
              ].map((s, i) => (
                <p key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: '15px' }}>{s}</p>
              ))}
            </div>
            <button onClick={() => window.open('https://termini-pro.lemonsqueezy.com/checkout/buy/8a033a28-cf56-428a-bd22-abca6bba37f9', '_blank')} style={{
              width: '100%', background: '#1a7a4a', color: 'white', border: 'none',
              borderRadius: '10px', padding: '16px', fontSize: '16px',
              fontWeight: '600', cursor: 'pointer'
            }}>
              Počni 14 dana besplatno →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '32px 2rem', background: 'white', borderTop: '1px solid #eee', textAlign: 'center' }}>
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