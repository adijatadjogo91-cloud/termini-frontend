import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const zanimanja = ['frizere', 'zubare', 'tattoo studije', 'kozmetičare', 'terapeute', 'nail studije'];
  const [trenutnoZanimanje, setTrenutnoZanimanje] = useState(0);
  const [sirina, setSirina] = useState(window.innerWidth);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrenutnoZanimanje(prev => (prev + 1) % zanimanja.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setSirina(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mob = sirina < 768;

  const styles = {
    land: {
      fontFamily: 'Inter, sans-serif',
      background: '#0a0f1e',
      color: '#f0f4ff',
      minHeight: '100vh',
    },
    nav: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem', height: '60px',
      background: 'rgba(10,15,30,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      position: 'sticky', top: 0, zIndex: 100,
    },
    logo: { fontSize: '18px', fontWeight: '600', color: '#f0f4ff', margin: 0 },
    logoSpan: { color: '#4ade80' },
    navBtns: { display: 'flex', gap: '8px' },
    btnGhost: {
      background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
      color: '#c8d0e8', borderRadius: '8px', padding: mob ? '7px 12px' : '7px 14px',
      fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
    },
    btnGreen: {
      background: '#16a34a', border: 'none', color: 'white',
      borderRadius: '8px', padding: mob ? '7px 12px' : '7px 14px',
      fontSize: '13px', cursor: 'pointer', fontWeight: '500', fontFamily: 'Inter, sans-serif',
    },
    hero: {
      padding: mob ? '56px 1.5rem 48px' : '88px 2rem 64px',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    },
    heroBg: {
      position: 'absolute', inset: 0, zIndex: 0,
      background: `
        radial-gradient(ellipse 60% 50% at 20% 40%, rgba(74,222,128,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 50% 60% at 80% 60%, rgba(99,102,241,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 50% 100%, rgba(20,184,166,0.08) 0%, transparent 50%)
      `,
    },
    heroInner: { position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' },
    badge: {
      display: 'inline-block',
      background: 'rgba(74,222,128,0.12)',
      color: '#4ade80',
      border: '1px solid rgba(74,222,128,0.25)',
      padding: '5px 14px', borderRadius: '20px',
      fontSize: '12px', fontWeight: '500', marginBottom: '24px',
    },
    h1: {
      fontSize: mob ? '30px' : '46px', fontWeight: '700',
      lineHeight: '1.15', color: '#f0f4ff', margin: '0 0 20px',
    },
    h1Span: { color: '#4ade80' },
    heroP: { fontSize: mob ? '15px' : '17px', color: '#8b9ec7', lineHeight: '1.7', marginBottom: '36px' },
    heroPStrong: { color: '#4ade80', fontWeight: '600' },
    heroBtns: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
    btnPrimary: {
      background: '#16a34a', color: 'white', border: 'none',
      borderRadius: '10px', padding: '13px 28px', fontSize: '15px',
      fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
      width: mob ? '100%' : 'auto',
    },
    btnSecondary: {
      background: 'rgba(255,255,255,0.07)', color: '#c8d0e8',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '10px', padding: '13px 28px', fontSize: '15px',
      cursor: 'pointer', fontFamily: 'Inter, sans-serif',
      width: mob ? '100%' : 'auto',
    },
    statsBar: {
      display: 'flex', justifyContent: 'center', gap: mob ? '24px' : '48px',
      padding: '28px 2rem', flexWrap: 'wrap',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(255,255,255,0.02)',
    },
    statNum: { fontSize: '22px', fontWeight: '700', color: '#4ade80', margin: 0 },
    statLabel: { fontSize: '12px', color: '#6b7fa3', marginTop: '2px' },
    featuresSection: {
      padding: mob ? '56px 1.5rem' : '72px 2rem',
      maxWidth: '1000px', margin: '0 auto',
    },
    sectionTitle: {
      textAlign: 'center', fontSize: mob ? '22px' : '28px',
      fontWeight: '700', color: '#f0f4ff', margin: '0 0 8px',
    },
    sectionSub: {
      textAlign: 'center', color: '#6b7fa3', fontSize: '15px', marginBottom: '40px',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)',
      gap: '16px',
    },
    featCard: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '14px', padding: '24px',
    },
    featIcon: {
      width: '40px', height: '40px', borderRadius: '10px',
      background: 'rgba(74,222,128,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '14px', fontSize: '18px',
    },
    featH3: { fontSize: '15px', fontWeight: '600', color: '#e2e8f7', marginBottom: '6px' },
    featP: { fontSize: '13px', color: '#6b7fa3', lineHeight: '1.6', margin: 0 },
    pricingSection: {
      padding: mob ? '56px 1.5rem' : '72px 2rem',
      background: 'rgba(255,255,255,0.02)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    },
    pricingInner: { maxWidth: '860px', margin: '0 auto' },
    pricingGrid: {
      display: 'grid',
      gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
      gap: '20px', marginTop: '40px',
    },
    priceCard: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px', padding: mob ? '28px' : '36px 32px',
      textAlign: 'left', position: 'relative',
    },
    priceCardFeatured: {
      background: 'rgba(74,222,128,0.05)',
      border: '1px solid rgba(74,222,128,0.4)',
      borderRadius: '16px', padding: mob ? '28px' : '36px 32px',
      textAlign: 'left', position: 'relative',
    },
    popularBadge: {
      position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
      background: '#16a34a', color: 'white', fontSize: '11px', fontWeight: '600',
      padding: '3px 14px', borderRadius: '20px', whiteSpace: 'nowrap',
    },
    planName: { fontSize: '12px', fontWeight: '600', color: '#6b7fa3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' },
    planNameFeatured: { fontSize: '12px', fontWeight: '600', color: '#4ade80', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' },
    priceRow: { display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' },
    priceBig: { fontSize: '40px', fontWeight: '700', color: '#f0f4ff' },
    priceCurrency: { fontSize: '20px', fontWeight: '600', color: '#c8d0e8' },
    pricePeriod: { fontSize: '13px', color: '#6b7fa3' },
    priceTrial: { fontSize: '12px', color: '#6b7fa3', marginBottom: '24px' },
    priceFeatures: { marginBottom: '28px' },
    pf: {
      padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
      fontSize: '13px', color: '#8b9ec7', display: 'flex', alignItems: 'center', gap: '8px',
    },
    pfDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 },
    btnPlan: {
      width: '100%', background: '#16a34a', color: 'white', border: 'none',
      borderRadius: '10px', padding: '13px', fontSize: '14px',
      fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
    },
    btnPlanOutline: {
      width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
      color: '#c8d0e8', borderRadius: '10px', padding: '13px', fontSize: '14px',
      cursor: 'pointer', fontFamily: 'Inter, sans-serif',
    },
    footer: {
      padding: '28px 1.5rem', textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      color: '#4a5a7a', fontSize: '13px',
    },
  };

  const features = [
    { icon: '📅', title: 'Termini', opis: 'Pregled po danu, sedmici ili mjesecu. Klijenti zakazuju sami 24/7.' },
    { icon: '👥', title: 'Klijenti', opis: 'Baza klijenata sa historijom posjeta i kontakt informacijama.' },
    { icon: '📧', title: 'Email podsjetnici', opis: 'Automatski emailovi dan prije termina. Manje otkaza!' },
    { icon: '💰', title: 'Prihodi', opis: 'Pratite prihode po danu, sedmici i mjesecu. Znajte gdje stojite.' },
    { icon: '📋', title: 'Usluge', opis: 'Definirajte usluge, cijene i trajanje. Prilagodite svom biznisu.' },
    { icon: '✨', title: 'AI asistent', opis: 'Pametni asistent koji analizira vaše poslovanje i daje savjete.' },
  ];

  const starterFeatures = [
  'Neograničeni termini i klijenti',
  'Email podsjetnici',
  'Praćenje prihoda',
  'AI asistent (20 upita/dan)',
  'Booking mini-stranica',
  'Mjesečni izvještaj',
  'Podrška putem emaila',
];

  const premiumFeatures = [
  'Sve iz Starter plana',
  'SMS podsjetnici',
  'WhatsApp podsjetnici',
  'AI asistent (neograničeno)',
  'Automatski ponovni dolazak',
  'Recenzije nakon termina',
  'Prioritetna podrška',
];

  return (
    <div style={styles.land}>

      {/* Navbar */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>
          termini<span style={styles.logoSpan}>.pro</span>
        </h2>
        <div style={styles.navBtns}>
          <button onClick={() => navigate('/login')} style={styles.btnGhost}>Prijava</button>
          <button onClick={() => navigate('/register')} style={styles.btnGreen}>
            {mob ? 'Probaj' : 'Probaj besplatno'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroInner}>
          <div style={styles.badge}>🎉 14 dana besplatno — bez kartice</div>
          <h1 style={styles.h1}>
            Dok spavate, vaši termini<br />
            <span style={styles.h1Span}>se pune sami.</span>
          </h1>
          <p style={styles.heroP}>
            Jedan link. Vaši klijenti zakazuju sami — 24/7.<br />
            termini.pro za{' '}
            <strong style={styles.heroPStrong}>
              {zanimanja[trenutnoZanimanje]}
            </strong>
            {' '}i još mnogo više.
          </p>
          <div style={styles.heroBtns}>
            <button onClick={() => navigate('/register')} style={styles.btnPrimary}>
              Počni besplatno →
            </button>
            <button onClick={() => navigate('/login')} style={styles.btnSecondary}>
              Prijavi se
            </button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={styles.statsBar}>
        {[
          { num: '24/7', label: 'Online booking' },
          { num: '14 dana', label: 'Besplatni trial' },
          { num: '0 KM', label: 'Setup troškovi' },
          { num: '5 min', label: 'Do prvog termina' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={styles.statNum}>{s.num}</p>
            <p style={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <section>
        <div style={styles.featuresSection}>
          <h2 style={styles.sectionTitle}>Sve što vam treba na jednom mjestu</h2>
          <p style={styles.sectionSub}>Jednostavno. Pouzdano. Napravljeno za BiH.</p>
          <div style={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} style={styles.featCard}>
                <div style={styles.featIcon}>{f.icon}</div>
                <h3 style={styles.featH3}>{f.title}</h3>
                <p style={styles.featP}>{f.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cijene */}
      <section style={styles.pricingSection}>
        <div style={styles.pricingInner}>
          <h2 style={styles.sectionTitle}>Jednostavne cijene</h2>
          <p style={styles.sectionSub}>Bez skrivenih troškova. Otkaži kad god želiš.</p>
          <div style={styles.pricingGrid}>

            {/* Starter */}
            <div style={styles.priceCard}>
              <p style={styles.planName}>Starter</p>
              <div style={styles.priceRow}>
                <span style={styles.priceBig}>59</span>
                <span style={styles.priceCurrency}>KM</span>
                <span style={styles.pricePeriod}>/mj</span>
              </div>
              <p style={styles.priceTrial}>14 dana besplatno, bez kartice</p>
              <div style={styles.priceFeatures}>
                {starterFeatures.map((s, i) => (
                  <div key={i} style={styles.pf}>
                    <div style={styles.pfDot} />
                    {s}
                  </div>
                ))}
              </div>
              <button
                onClick={() => window.open('https://termini-pro.lemonsqueezy.com/checkout/buy/8a033a28-cf56-428a-bd22-abca6bba37f9', '_blank')}
                style={styles.btnPlanOutline}
              >
                Počni besplatno →
              </button>
            </div>

            {/* Premium */}
            <div style={styles.priceCardFeatured}>
              <div style={styles.popularBadge}>NAJPOPULARNIJE</div>
              <p style={styles.planNameFeatured}>Premium</p>
              <div style={styles.priceRow}>
                <span style={styles.priceBig}>119</span>
                <span style={styles.priceCurrency}>KM</span>
                <span style={styles.pricePeriod}>/mj</span>
              </div>
              <p style={styles.priceTrial}>14 dana besplatno, bez kartice</p>
              <div style={styles.priceFeatures}>
                {premiumFeatures.map((s, i) => (
                  <div key={i} style={styles.pf}>
                    <div style={styles.pfDot} />
                    {s}
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/register')} style={styles.btnPlan}>
                Počni besplatno →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <div style={styles.footer}>
        <p>© 2026 termini.pro — Napravljeno s ❤️ u Bosni i Hercegovini</p>
        <p style={{ marginTop: '8px' }}>
          <a href="/terms" style={{ color: '#4a5a7a', textDecoration: 'underline' }}>
            Uslovi korištenja
          </a>
        </p>
      </div>

    </div>
  );
}
