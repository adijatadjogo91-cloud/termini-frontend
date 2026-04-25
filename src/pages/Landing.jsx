import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const zanimanja = ['stomatologe', 'ginekologe', 'fizioterapeute', 'psihologe', 'tattoo studije', 'lične trenere', 'frizere', 'kozmetičare', 'terapeute'];
  const [trenutnoZanimanje, setTrenutnoZanimanje] = useState(0);
  const [sirina, setSirina] = useState(window.innerWidth);
  const [otvorenFaq, setOtvorenFaq] = useState(null);
  const [godisnji, setGodisnji] = useState(false);

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
    land: { fontFamily: 'Inter, sans-serif', background: '#0a0f1e', color: '#f0f4ff', minHeight: '100vh' },
    nav: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem', height: '60px',
      background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(12px)',
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
    hero: { padding: mob ? '56px 1.5rem 48px' : '88px 2rem 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' },
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
      display: 'inline-block', background: 'rgba(74,222,128,0.12)', color: '#4ade80',
      border: '1px solid rgba(74,222,128,0.25)', padding: '5px 14px', borderRadius: '20px',
      fontSize: '12px', fontWeight: '500', marginBottom: '24px',
    },
    h1: { fontSize: mob ? '30px' : '46px', fontWeight: '700', lineHeight: '1.15', color: '#f0f4ff', margin: '0 0 20px' },
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
    sectionTitle: { textAlign: 'center', fontSize: mob ? '22px' : '28px', fontWeight: '700', color: '#f0f4ff', margin: '0 0 8px' },
    sectionSub: { textAlign: 'center', color: '#6b7fa3', fontSize: '15px', marginBottom: '40px' },
    featCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '24px' },
    featIcon: { width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', fontSize: '18px' },
    featH3: { fontSize: '15px', fontWeight: '600', color: '#e2e8f7', marginBottom: '6px' },
    featP: { fontSize: '13px', color: '#6b7fa3', lineHeight: '1.6', margin: 0 },
    pf: { padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', color: '#8b9ec7', display: 'flex', alignItems: 'center', gap: '8px' },
    pfDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 },
    btnPlan: { width: '100%', background: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif' },
    btnPlanOutline: { width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#c8d0e8', borderRadius: '10px', padding: '13px', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' },
  };

  const features = [
    { icon: '📅', title: 'Online booking 24/7', opis: 'Klijenti zakazuju sami u bilo koje doba dana. Bez telefoniranja, bez čekanja.' },
    { icon: '👥', title: 'Baza klijenata', opis: 'Evidencija svih klijenata sa historijom posjeta i kontakt informacijama.' },
    { icon: '📧', title: 'Automatski podsjetnici', opis: 'Email podsjetnici dan prije termina. Drastično manje otkaza!' },
    { icon: '💰', title: 'Praćenje prihoda', opis: 'Prihodi po danu, sedmici i mjesecu. Uvijek znate gdje stojite.' },
    { icon: '🔒', title: 'Vlastiti brend', opis: 'Vaša privatna booking stranica. Bez konkurencije pored vas.' },
    { icon: '✨', title: 'AI asistent za rast', opis: 'Svaki dan dobijete konkretan savjet za rast prihoda. Plus AI chatbot na vašoj booking stranici prima rezervacije automatski.' },
  ];

  const nise = [
    { icon: '🦷', naziv: 'Stomatolozi', opis: 'Zakazivanje bez telefoniranja' },
    { icon: '👩‍⚕️', naziv: 'Ginekolozi', opis: 'Diskretno i jednostavno' },
    { icon: '🧘', naziv: 'Fizioterapeuti', opis: 'Redovni termini, manje otkaza' },
    { icon: '🧠', naziv: 'Psiholozi', opis: 'Privatna booking stranica' },
    { icon: '🎨', naziv: 'Tattoo studiji', opis: 'Mladi klijenti zakazuju online' },
    { icon: '💪', naziv: 'Lični treneri', opis: 'Upravljanje svim klijentima' },
    { icon: '✂️', naziv: 'Frizeri', opis: 'Vlastiti brend, ne platforme' },
    { icon: '💅', naziv: 'Kozmetičari', opis: 'Galerija radova + booking' },
  ];

  const painPoints = [
    { problem: 'Telefon zvoni dok ste s klijentom', rjesenje: 'Klijenti zakazuju sami online — 24/7' },
    { problem: 'Dvostruko zakazivanje i zabune', rjesenje: 'Automatska provjera slobodnih termina' },
    { problem: 'Klijenti zaboravljaju termine', rjesenje: 'Automatski email podsjetnici' },
    { problem: 'Ne znate koliko ste zaradili', rjesenje: 'Dashboard sa prihodima u realnom vremenu' },
  ];

  const testimonijali = [
    {
      ime: 'Dr. Amra H.',
      biznis: 'Stomatološka ordinacija',
      grad: 'Sarajevo',
      ikona: '🦷',
      tekst: 'Pacijenti zakazuju sami dok ja radim. Nema više telefoniranja između pacijenata. Ordinacija je popunjena, a ja sam mirnija.'
    },
    {
      ime: 'Lejla Č.',
      biznis: 'Kozmetički salon',
      grad: 'Mostar',
      ikona: '💅',
      tekst: 'Za 5 minuta sam postavila sve i odmah dobila prve online rezervacije. Klijentice cijene što mogu zakazati u ponoć.'
    },
    {
      ime: 'Haris B.',
      biznis: 'Lični trener',
      grad: 'Sarajevo',
      ikona: '💪',
      tekst: 'Loyalty program je genijalan — klijenti dolaze redovnije jer skupljaju bodove. Prihodi su mi porasli za 30% u prvom mjesecu.'
    },
    {
      ime: 'Elvir G.',
      biznis: 'Frizerski salon',
      grad: 'Ilidža',
      ikona: '✂️',
      tekst: 'Konačno prestao da gubim klijente koji ne mogu dočekati da im odgovorim na poruku. Sada zakazuju sami i dolaze. Jednostavno.'
    },
  ];

  const starterFeatures = [
    'Neograničeni termini i klijenti',
    'Neograničene usluge',
    'Email podsjetnici',
    'Praćenje prihoda',
    'AI asistent (20 upita/dan)',
    'Vlastita booking stranica',
    'Galerija radova',
    'Podrška putem emaila',
  ];

  const premiumFeatures = [
    'Sve iz Starter plana',
    'SMS podsjetnici',
    'WhatsApp podsjetnici',
    'AI asistent (neograničeno)',
    'Automatski ponovni dolazak',
    'Recenzije klijenata',
    'Prioritetna podrška',
  ];

  const faqs = [
    {
      pitanje: 'Moraju li klijenti preuzeti aplikaciju?',
      odgovor: 'Ne! Klijenti zakazuju direktno u browseru — kliknu na vaš link i za 30 sekundi su gotovi. Nema preuzimanja, nema registracije, nema komplikacija. Mogu čak dodati booking stranicu na početni ekran telefona kao aplikaciju.'
    },
    {
      pitanje: 'Koliko traje postavljanje?',
      odgovor: 'Većina korisnika je spremna za primanje termina za manje od 5 minuta. Dodajte usluge, postavite radno vrijeme i podijelite link — to je sve!'
    },
    {
      pitanje: 'Mogu li otkazati pretplatu?',
      odgovor: 'Da, u bilo kom trenutku, bez penala i bez pitanja. Nema ugovornih obaveza. Ako odustanete, vaši podaci ostaju sačuvani 30 dana.'
    },
    {
      pitanje: 'Radi li termini.pro na mobitelu?',
      odgovor: 'Da, savršeno! I vaš dashboard i booking stranica za klijente su potpuno prilagođeni mobilnim uređajima. Upravljajte terminima sa telefona gdje god se nalazili.'
    },
    {
      pitanje: 'Je li sigurno za medicinske ordinacije?',
      odgovor: 'Da. termini.pro je GDPR usklađen — podaci pacijenata su zaštićeni i dostupni samo vama. Svaki klijent daje pisani pristanak pri zakazivanju. Niko drugi ne vidi podatke vaših pacijenata.'
    },
    {
      pitanje: 'Šta se desi nakon 14 dana besplatnog triala?',
      odgovor: 'Dobijate obavijest da trial ističe. Možete odabrati plan koji vam odgovara. Nema automatskog naplaćivanja bez vaše potvrde. Ako ne nastavite — ne plaćate ništa.'
    },
    {
      pitanje: 'Postoje li limiti na broj termina ili klijenata?',
      odgovor: 'Ne! termini.pro nema nikakvih limita — neograničeni termini, neograničeni klijenti, neograničene usluge. Plaćate fiksnu cijenu bez obzira na obim posla.'
    },
  ];

  return (
    <div style={styles.land}>

      {/* Navbar */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>termini<span style={styles.logoSpan}>.pro</span></h2>
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
            Dok ste s klijentom,<br />
            <span style={styles.h1Span}>novi već zakazuju.</span>
          </h1>
          <p style={styles.heroP}>
            Vaša privatna booking stranica — klijenti zakazuju sami 24/7.<br />
            termini.pro za{' '}
            <strong style={styles.heroPStrong}>{zanimanja[trenutnoZanimanje]}</strong>
            {' '}i sve uslužne djelatnosti.
          </p>
          <div style={styles.heroBtns}>
            <button onClick={() => navigate('/register')} style={styles.btnPrimary}>
              Postavi biznis besplatno →
            </button>
            <button onClick={() => navigate('/login')} style={styles.btnSecondary}>
              Prijavi se
            </button>
          </div>
          <p style={{ fontSize: '12px', color: '#4a5a7a', marginTop: '16px' }}>
            ✓ Bez kartice &nbsp;&nbsp; ✓ Bez limita &nbsp;&nbsp; ✓ Otkaži kad god želiš
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div style={styles.statsBar}>
        {[
          { num: '24/7', label: 'Online booking' },
          { num: '14 dana', label: 'Besplatni trial' },
          { num: '∞', label: 'Bez limita' },
          { num: '5 min', label: 'Do prvog termina' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={styles.statNum}>{s.num}</p>
            <p style={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Za koga */}
      <section style={{ padding: mob ? '56px 1.5rem' : '72px 2rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Za sve koji rade s klijentima</h2>
          <p style={styles.sectionSub}>Medicinska struka, wellness, ljepota — termini.pro se prilagođava vašem biznisu.</p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
            {nise.map((n, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '28px', marginBottom: '8px' }}>{n.icon}</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f7', marginBottom: '4px' }}>{n.naziv}</p>
                <p style={{ fontSize: '12px', color: '#6b7fa3' }}>{n.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kako radi */}
      <section style={{ padding: mob ? '56px 1.5rem' : '72px 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Kako radi?</h2>
          <p style={styles.sectionSub}>Od registracije do prvog termina — za manje od 5 minuta.</p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { broj: '01', icon: '📝', title: 'Registrujte se', opis: 'Kreirajte nalog za 2 minute. Dodajte naziv, usluge, cijene i radno vrijeme. Bez tehničkog znanja.' },
              { broj: '02', icon: '🔗', title: 'Podijelite link', opis: 'Dobijete vlastiti booking link i QR kod. Stavite ga u Instagram bio, na web stranicu ili odštampajte za ulaz.' },
              { broj: '03', icon: '🎉', title: 'Primajte termine', opis: 'Klijenti zakazuju sami 24/7. Vi dobijete obavijest, oni dobiju automatski podsjetnik. Bez telefoniranja.' },
            ].map((k, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', position: 'relative' }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{k.icon}</div>
                <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '13px', fontWeight: '700', color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '4px 10px', borderRadius: '20px' }}>
                  {k.broj}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f0f4ff', marginBottom: '10px' }}>{k.title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7fa3', lineHeight: '1.7', margin: 0 }}>{k.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Rješenje */}
      <section style={{ padding: mob ? '56px 1.5rem' : '72px 2rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Prepoznajete li se?</h2>
          <p style={styles.sectionSub}>termini.pro rješava svakodnevne probleme.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {painPoints.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '0', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderRight: mob ? 'none' : '1px solid rgba(255,255,255,0.06)', borderBottom: mob ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <span style={{ fontSize: '18px' }}>❌</span>
                  <p style={{ fontSize: '14px', color: '#8b9ec7', margin: 0 }}>{p.problem}</p>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(74,222,128,0.04)' }}>
                  <span style={{ fontSize: '18px' }}>✅</span>
                  <p style={{ fontSize: '14px', color: '#c8d0e8', margin: 0, fontWeight: '500' }}>{p.rjesenje}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ padding: mob ? '56px 1.5rem' : '72px 2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Sve što vam treba na jednom mjestu</h2>
          <p style={styles.sectionSub}>Jednostavno. Pouzdano. Napravljeno za BiH.</p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
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

      {/* Bez limita sekcija */}
      <section style={{ padding: mob ? '56px 1.5rem' : '72px 2rem', background: 'rgba(74,222,128,0.03)', borderTop: '1px solid rgba(74,222,128,0.1)', borderBottom: '1px solid rgba(74,222,128,0.1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={styles.sectionTitle}>Bez skrivenih limita. Ikad.</h2>
          <p style={styles.sectionSub}>Fiksna cijena — neograničeno sve. Vaš biznis raste, cijena ostaje ista.</p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { icon: '📅', label: 'Neograničeni termini' },
              { icon: '👥', label: 'Neograničeni klijenti' },
              { icon: '📋', label: 'Neograničene usluge' },
              { icon: '🧑‍💼', label: 'Neograničeni uposlenici' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)',
                borderRadius: '12px', padding: '20px 16px', textAlign: 'center'
              }}>
                <p style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#4ade80', margin: 0 }}>{item.label}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: '#6b7fa3', marginTop: '24px' }}>
            Za razliku od platformi sa limitima na termine i uposlenike — termini.pro nema ograničenja.
          </p>
        </div>
      </section>

      {/* Zašto termini.pro */}
      <section style={{ padding: mob ? '56px 1.5rem' : '72px 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={styles.sectionTitle}>Zašto termini.pro?</h2>
          <p style={styles.sectionSub}>Za razliku od javnih platformi — ovo je vaš prostor.</p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '16px', marginTop: '8px' }}>
            {[
              { icon: '🔒', title: 'Privatnost', opis: 'Vaša stranica — bez konkurencije pored vas. Idealno za medicinsku struku.' },
              { icon: '🎨', title: 'Vlastiti brend', opis: 'Logo, opis, galerija radova. Sve prilagođeno vašem biznisu.' },
              { icon: '✨', title: 'AI savjetnik za prihode', opis: 'Ne samo zakazivanje — AI analizira vaše prihode i svaki dan predlaže konkretne akcije za rast.' },
              { icon: '📊', title: 'Potpuna kontrola', opis: 'Dashboard, prihodi, klijenti — sve na jednom mjestu.' },
            ].map((k, i) => (
              <div key={i} style={{ ...styles.featCard, textAlign: 'left' }}>
                <p style={{ fontSize: '28px', marginBottom: '10px' }}>{k.icon}</p>
                <h3 style={styles.featH3}>{k.title}</h3>
                <p style={styles.featP}>{k.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof — Testimonijali */}
      <section style={{ padding: mob ? '56px 1.5rem' : '72px 2rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Šta kažu naši korisnici</h2>
          <p style={styles.sectionSub}>Stvarni biznisi. Stvarni rezultati.</p>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '20px' }}>
            {testimonijali.map((r, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '24px',
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1,2,3,4,5].map(s => (
                    <span key={s} style={{ fontSize: '14px', color: '#fbbf24' }}>⭐</span>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#c8d0e8', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                  "{r.tekst}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(74,222,128,0.3), rgba(99,102,241,0.3))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0
                  }}>
                    {r.ikona}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#f0f4ff', margin: 0 }}>{r.ime}</p>
                    <p style={{ fontSize: '12px', color: '#6b7fa3', margin: 0 }}>{r.biznis} · {r.grad}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cijene */}
      <section style={{ padding: mob ? '56px 1.5rem' : '72px 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Jednostavne cijene</h2>
          <p style={styles.sectionSub}>Bez skrivenih troškova. Otkaži kad god želiš.</p>

          {/* Toggle mjesečno/godišnje */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <span style={{ fontSize: '14px', color: !godisnji ? '#f0f4ff' : '#6b7fa3', fontWeight: !godisnji ? '600' : '400' }}>Mjesečno</span>
            <div onClick={() => setGodisnji(!godisnji)} style={{
              width: '48px', height: '26px', borderRadius: '13px',
              background: godisnji ? '#16a34a' : 'rgba(255,255,255,0.15)',
              cursor: 'pointer', position: 'relative', transition: 'background 0.2s'
            }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                position: 'absolute', top: '3px',
                left: godisnji ? '25px' : '3px', transition: 'left 0.2s'
              }} />
            </div>
            <span style={{ fontSize: '14px', color: godisnji ? '#f0f4ff' : '#6b7fa3', fontWeight: godisnji ? '600' : '400' }}>
              Godišnje
              <span style={{ marginLeft: '6px', fontSize: '11px', background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>
                -2 mjeseca gratis
              </span>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px' }}>

            {/* Starter */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: mob ? '28px' : '36px 32px', textAlign: 'left', position: 'relative' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7fa3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Starter</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '40px', fontWeight: '700', color: '#f0f4ff' }}>{godisnji ? '499' : '59'}</span>
                <span style={{ fontSize: '20px', fontWeight: '600', color: '#c8d0e8' }}>KM</span>
                <span style={{ fontSize: '13px', color: '#6b7fa3' }}>{godisnji ? '/god' : '/mj'}</span>
              </div>
              {godisnji && <p style={{ fontSize: '12px', color: '#4ade80', marginBottom: '4px' }}>Uštedite 209 KM godišnje!</p>}
              <p style={{ fontSize: '12px', color: '#6b7fa3', marginBottom: '24px' }}>14 dana besplatno, bez kartice</p>
              <div style={{ marginBottom: '28px' }}>
                {starterFeatures.map((s, i) => (
                  <div key={i} style={styles.pf}><div style={styles.pfDot} />{s}</div>
                ))}
              </div>
              <button onClick={() => navigate('/register')} style={styles.btnPlanOutline}>
                Počni besplatno →
              </button>
            </div>

            {/* Premium */}
            <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.4)', borderRadius: '16px', padding: mob ? '28px' : '36px 32px', textAlign: 'left', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#16a34a', color: 'white', fontSize: '11px', fontWeight: '600', padding: '3px 14px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                NAJPOPULARNIJE
              </div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#4ade80', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Premium</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '40px', fontWeight: '700', color: '#f0f4ff' }}>{godisnji ? '999' : '119'}</span>
                <span style={{ fontSize: '20px', fontWeight: '600', color: '#c8d0e8' }}>KM</span>
                <span style={{ fontSize: '13px', color: '#6b7fa3' }}>{godisnji ? '/god' : '/mj'}</span>
              </div>
              {godisnji && <p style={{ fontSize: '12px', color: '#4ade80', marginBottom: '4px' }}>Uštedite 429 KM godišnje!</p>}
              <p style={{ fontSize: '12px', color: '#6b7fa3', marginBottom: '24px' }}>14 dana besplatno, bez kartice</p>
              <div style={{ marginBottom: '28px' }}>
                {premiumFeatures.map((s, i) => (
                  <div key={i} style={styles.pf}><div style={styles.pfDot} />{s}</div>
                ))}
              </div>
              <button onClick={() => navigate('/register')} style={styles.btnPlan}>
                Počni besplatno →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: mob ? '56px 1.5rem' : '72px 2rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Često postavljana pitanja</h2>
          <p style={styles.sectionSub}>Sve što trebate znati prije nego počnete.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
                <button
                  onClick={() => setOtvorenFaq(otvorenFaq === i ? null : i)}
                  style={{ width: '100%', padding: '18px 20px', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: '12px' }}
                >
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#e2e8f7' }}>{f.pitanje}</span>
                  <span style={{ fontSize: '20px', color: '#4ade80', flexShrink: 0, transition: 'transform 0.2s', transform: otvorenFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                {otvorenFaq === i && (
                  <div style={{ padding: '0 20px 18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontSize: '14px', color: '#8b9ec7', lineHeight: '1.7', margin: '14px 0 0' }}>{f.odgovor}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: mob ? '56px 1.5rem' : '72px 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
          <h2 style={{ ...styles.sectionTitle, marginBottom: '16px' }}>
            Postavite vaš biznis danas
          </h2>
          <p style={{ color: '#6b7fa3', fontSize: '16px', marginBottom: '32px', lineHeight: '1.7' }}>
            Za manje od 5 minuta vaši klijenti mogu zakazivati online.<br />
            14 dana besplatno — bez kartice, bez obaveza.
          </p>
          <button onClick={() => navigate('/register')} style={{ ...styles.btnPrimary, width: mob ? '100%' : 'auto', padding: '16px 40px', fontSize: '16px' }}>
            Počni besplatno — bez kartice →
          </button>
          <p style={{ fontSize: '12px', color: '#4a5a7a', marginTop: '16px' }}>
            ✓ Bez kartice &nbsp;&nbsp; ✓ Bez limita &nbsp;&nbsp; ✓ Otkaži kad god želiš
          </p>

          {/* Mock-up telefona */}
          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ width: '200px', background: '#111827', borderRadius: '24px', border: '2px solid rgba(74,222,128,0.3)', padding: '12px', boxShadow: '0 0 40px rgba(74,222,128,0.1)' }}>
              <div style={{ background: '#0d1628', borderRadius: '16px', padding: '12px', fontSize: '11px' }}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(74,222,128,0.2)', margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🦷</div>
                  <p style={{ color: '#f0f4ff', fontWeight: '700', margin: 0, fontSize: '11px' }}>Dr. Amra H.</p>
                  <p style={{ color: '#4ade80', margin: '2px 0 0', fontSize: '10px' }}>📍 Sarajevo</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', marginBottom: '8px' }}>
                  {['Pregled — 30 KM', 'Plomba — 60 KM', 'Vađenje — 50 KM'].map((u, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#c8d0e8' }}>
                      <span>{u.split('—')[0]}</span>
                      <span style={{ color: '#4ade80' }}>{u.split('—')[1]}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#16a34a', borderRadius: '8px', padding: '7px', textAlign: 'center', color: 'white', fontWeight: '600', fontSize: '11px' }}>
                  Zakaži termin →
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '12px', padding: '12px 16px', textAlign: 'left', width: '200px' }}>
                <p style={{ fontSize: '10px', color: '#4ade80', fontWeight: '600', margin: '0 0 4px' }}>✅ Novi termin!</p>
                <p style={{ fontSize: '11px', color: '#e2e8f7', margin: 0 }}>Ana H. — Pregled</p>
                <p style={{ fontSize: '10px', color: '#6b7fa3', margin: '2px 0 0' }}>Sutra u 10:00</p>
              </div>
              <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '12px', padding: '12px 16px', textAlign: 'left', width: '200px' }}>
                <p style={{ fontSize: '10px', color: '#818cf8', fontWeight: '600', margin: '0 0 4px' }}>✨ AI savjet</p>
                <p style={{ fontSize: '11px', color: '#e2e8f7', margin: 0 }}>Utorak ujutro je slobodan — dodajte akciju!</p>
              </div>
              <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '12px', padding: '12px 16px', textAlign: 'left', width: '200px' }}>
                <p style={{ fontSize: '10px', color: '#fbbf24', fontWeight: '600', margin: '0 0 4px' }}>💰 Prihod danas</p>
                <p style={{ fontSize: '13px', color: '#f0f4ff', fontWeight: '700', margin: 0 }}>340 KM</p>
                <p style={{ fontSize: '10px', color: '#6b7fa3', margin: '2px 0 0' }}>↑ 12% vs jučer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 2rem', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '32px', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f0f4ff', marginBottom: '12px' }}>
                termini<span style={{ color: '#4ade80' }}>.pro</span>
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7fa3', lineHeight: '1.7' }}>
                Online booking platforma za sve uslužne djelatnosti u Bosni i Hercegovini.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#8b9ec7', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platforma</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Počni besplatno', href: '/register' },
                  { label: 'Prijava', href: '/login' },
                  { label: 'Politika privatnosti', href: '/privatnost' },
                  { label: 'Uslovi korištenja', href: '/terms' },
                ].map((l, i) => (
                  <a key={i} href={l.href} style={{ fontSize: '13px', color: '#6b7fa3', textDecoration: 'none' }}>{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#8b9ec7', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kontakt</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="mailto:info@termini.pro" style={{ fontSize: '13px', color: '#6b7fa3', textDecoration: 'none' }}>📧 info@termini.pro</a>
                <a href="https://instagram.com/termini.pro" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#6b7fa3', textDecoration: 'none' }}>📱 @termini.pro</a>
                <p style={{ fontSize: '13px', color: '#6b7fa3', margin: 0 }}>📍 Sarajevo, Bosna i Hercegovina</p>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '13px', color: '#4a5a7a', margin: 0 }}>© 2026 termini.pro — Napravljeno s ❤️ u Bosni i Hercegovini</p>
            <p style={{ fontSize: '13px', color: '#4a5a7a', margin: 0 }}>🇧🇦 Made in BiH</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
