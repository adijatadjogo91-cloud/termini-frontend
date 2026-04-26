import { useNavigate, useParams } from 'react-router-dom';

const clanci = [
  {
    slug: 'zasto-stomatolozi-gube-pacijente',
    naslov: 'Zašto stomatolozi gube pacijente zbog zakazivanja (i kako to riješiti)',
    datum: '22. april 2026.',
    trajanje: '4 min čitanja',
    kategorija: 'Stomatolozi',
    uvod: 'Svaki put kada pacijent ne dobije odgovor na poruku unutar sat vremena — razmatra drugu ordinaciju. Evo zašto se to dešava i šta možete uraditi.',
    sadrzaj: [
      {
        tip: 'paragraf',
        tekst: 'Zamislite ovo: pacijent ima zubobolju u nedjelju u 22:00. Otvori Instagram, pronađe vašu ordinaciju, pošalje poruku. Vi spavate. On čeka. Do jutra — pronašao je drugu ordinaciju koja ima online booking i zakazao termin za ponedjeljak.'
      },
      {
        tip: 'naslov',
        tekst: 'Problem nije vaša dostupnost — problem je sistem'
      },
      {
        tip: 'paragraf',
        tekst: 'Stomatolozi u BiH prosječno provode 45-60 minuta dnevno na zakazivanju putem telefona i poruka. To je 15-20 sati mjesečno. Pomnoži sa vašom satnicom — koliko je to izgubljenih prihoda?'
      },
      {
        tip: 'lista',
        stavke: [
          'Telefon zvoni dok radite zahvat — ne možete odgovoriti',
          'Poruke stižu noću i vikendom — vi ne radite',
          'Pacijenti čekaju odgovor satima — odlaze drugdje',
          'Dvostruko zakazivanje zbog ručnog vođenja evidencije',
        ]
      },
      {
        tip: 'naslov',
        tekst: 'Rješenje: pacijenti zakazuju sami, 24/7'
      },
      {
        tip: 'paragraf',
        tekst: 'Online booking nije luksuz — to je osnovna infrastruktura modernih ordinacija. Kada pacijent može zakazati u 22:00 u nedjelju, bez čekanja i bez poziva — dolazi. I vraća se.'
      },
      {
        tip: 'paragraf',
        tekst: 'termini.pro je jedina booking platforma u BiH koja je GDPR usklađena za medicinske ordinacije. Podaci pacijenata su zaštićeni, svaki pacijent daje pisani pristanak pri zakazivanju. Vaša ordinacija je zaštićena.'
      },
      {
        tip: 'naslov',
        tekst: 'Konkretni rezultati'
      },
      {
        tip: 'lista',
        stavke: [
          'Pacijenti zakazuju sami — bez jednog poziva',
          'Automatski podsjetnici smanjuju nedolaske za 40-50%',
          'Vi se fokusirate na rad, ne na administraciju',
          'GDPR zaštita za podatke pacijenata — zakonska obaveza ispunjena',
        ]
      },
      {
        tip: 'paragraf',
        tekst: 'Postavljanje traje 5 minuta. Nema tehničkog znanja. Nema ugovora. 14 dana besplatno — bez kartice.'
      },
    ]
  },
  {
    slug: 'koliko-vremena-gubite-na-zakazivanje',
    naslov: 'Koliko vremena i novca gubite na telefonsko zakazivanje termina?',
    datum: '18. april 2026.',
    trajanje: '3 min čitanja',
    kategorija: 'Produktivnost',
    uvod: 'Izračunali smo koliko BiH uslužni biznisi gube svaki mjesec zbog ručnog zakazivanja. Rezultati su iznenađujući.',
    sadrzaj: [
      {
        tip: 'paragraf',
        tekst: 'Razgovarali smo sa vlasnicima salona, ordinacija i studija u Sarajevu, Mostaru i Banja Luci. Jedno pitanje: koliko vremena dnevno provodite na zakazivanju? Prosječan odgovor: 45 minuta do sat i po.'
      },
      {
        tip: 'naslov',
        tekst: 'Matematika koja boli'
      },
      {
        tip: 'paragraf',
        tekst: 'Uzmimo konzervativan primjer — 45 minuta dnevno na zakazivanju. To je 22 sata mjesečno. Frizerka koja zarađuje 30 KM/sat gubi 660 KM/mj samo na administraciji. Godišnje — 7.920 KM.'
      },
      {
        tip: 'lista',
        stavke: [
          'Odgovaranje na poruke: 20 min/dan',
          'Telefonski pozivi: 15 min/dan',
          'Ispravljanje grešaka (dvostruko zakazivanje): 10 min/dan',
          'Slanje podsjetnika ručno: 10 min/dan',
        ]
      },
      {
        tip: 'naslov',
        tekst: 'Ovo nije samo o vremenu'
      },
      {
        tip: 'paragraf',
        tekst: 'Svaki put kada vam telefon zvoni dok ste s klijentom — gubite fokus. Klijent to osjeća. Kvalitet usluge pada. A klijent koji ne osjeća da ste potpuno prisutni — ne vraća se.'
      },
      {
        tip: 'paragraf',
        tekst: 'Online booking rješava sve ovo automatski. Klijenti zakazuju sami, dobijaju potvrdu i podsjetnik — vi ne radite ništa. Fokusirate se na ono što stvarno zarađuje: rad s klijentima.'
      },
      {
        tip: 'naslov',
        tekst: 'Šta možete uraditi s tim vremenom?'
      },
      {
        tip: 'lista',
        stavke: [
          '22 sata/mj × vaša satnica = pravi prihod umjesto administracije',
          'Više energije za klijente koji su ispred vas',
          'Manje stresa i više fokusa na kvalitet rada',
          'Vikendi i večeri — bez poruka i poziva',
        ]
      },
      {
        tip: 'paragraf',
        tekst: 'termini.pro košta 59 KM/mj. Ako vam uštedi samo 10 sati rada — već ste na plusu. U prvoj sedmici.'
      },
    ]
  },
  {
    slug: 'online-booking-gdpr-medicinske-ordinacije-bih',
    naslov: 'Online booking za medicinske ordinacije u BiH — GDPR i sigurnost podataka pacijenata',
    datum: '14. april 2026.',
    trajanje: '5 min čitanja',
    kategorija: 'GDPR & Sigurnost',
    uvod: 'Medicinske ordinacije u BiH imaju zakonsku obavezu zaštite podataka pacijenata. Evo šta to znači za online zakazivanje i zašto nije svaka booking platforma prikladna.',
    sadrzaj: [
      {
        tip: 'paragraf',
        tekst: 'Kada pacijent zakazuje termin online, dijeli osjetljive podatke: ime, telefon, email, a često i razlog posjete. Za medicinske ordinacije — stomatologe, ginekologe, fizioterapeute, psihologe — ovi podaci spadaju u kategoriju posebno osjetljivih osobnih podataka prema GDPR regulativi.'
      },
      {
        tip: 'naslov',
        tekst: 'Šta GDPR znači za ordinacije u BiH?'
      },
      {
        tip: 'paragraf',
        tekst: 'BiH je u procesu usklađivanja sa europskim standardima zaštite podataka. Za medicinske ordinacije ovo znači: svaki pacijent mora dati informirani pisani pristanak za obradu podataka, podaci moraju biti sigurno pohranjeni i dostupni samo ovlaštenim osobama, a pacijent ima pravo zatražiti brisanje svojih podataka.'
      },
      {
        tip: 'lista',
        stavke: [
          'Pisani pristanak pacijenta — obavezan pri svakom zakazivanju',
          'Sigurno pohranjivanje podataka — SSL enkripcija',
          'Pristup podacima — samo vi, niko drugi',
          'Pravo na brisanje — pacijent može zatražiti uklanjanje podataka',
        ]
      },
      {
        tip: 'naslov',
        tekst: 'Zašto nije svaka platforma prikladna za ordinacije?'
      },
      {
        tip: 'paragraf',
        tekst: 'Mnoge booking platforme su napravljene za frizerske salone i kozmetičare — gdje zahtjevi za zaštitu podataka nisu isti. Kada medicinska ordinacija koristi takvu platformu, izlaže se riziku: podaci pacijenata mogu biti vidljivi trećim stranama, nema pisanog pristanka, nema jasne politike brisanja podataka.'
      },
      {
        tip: 'naslov',
        tekst: 'Kako termini.pro štiti podatke vaših pacijenata'
      },
      {
        tip: 'lista',
        stavke: [
          'GDPR checkbox pri svakom zakazivanju — pacijent daje pisani pristanak',
          'Podaci su vaši — niko drugi nema pristup',
          'SSL enkripcija — svi podaci su zaštićeni u transportu',
          'Privatna booking stranica — bez javnog marketplace-a',
          'Politika privatnosti — jasno definisana za pacijente',
        ]
      },
      {
        tip: 'paragraf',
        tekst: 'termini.pro je jedina booking platforma u BiH koja je od samog početka dizajnirana sa medicinskim ordinacijama na umu. Zaštita podataka pacijenata nije bila naknadna dopuna — to je bio dio dizajna od prvog dana.'
      },
      {
        tip: 'paragraf',
        tekst: 'Ako vodite medicinsku ordinaciju i razmišljate o online zakazivanju — svakako razgovarajte sa pravnim savjetnikom o vašim specifičnim obavezama. termini.pro vam daje tehničke alate za usklađenost, ali svaka ordinacija ima svoje specifičnosti.'
      },
    ]
  },
];

function BlogLista() {
  const navigate = useNavigate();
  const mob = window.innerWidth < 768;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0a0f1e', color: '#f0f4ff', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '60px', background: 'rgba(10,15,30,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 onClick={() => navigate('/')} style={{ fontSize: '18px', fontWeight: '600', color: '#f0f4ff', margin: 0, cursor: 'pointer' }}>
          termini<span style={{ color: '#4ade80' }}>.pro</span>
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/login')} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#c8d0e8', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer' }}>Prijava</button>
          <button onClick={() => navigate('/register')} style={{ background: '#16a34a', border: 'none', color: 'white', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>Probaj besplatno</button>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: mob ? '48px 1.5rem' : '72px 2rem' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', marginBottom: '16px' }}>
            Blog
          </div>
          <h1 style={{ fontSize: mob ? '28px' : '36px', fontWeight: '700', color: '#f0f4ff', marginBottom: '12px' }}>
            Savjeti za uslužne biznise u BiH
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7fa3', lineHeight: '1.7' }}>
            Praktični savjeti za stomatologe, frizere, fizioterapeute i sve koji rade s klijentima.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {clanci.map((c, i) => (
            <div key={i}
              onClick={() => navigate(`/blog/${c.slug}`)}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.25)'; e.currentTarget.style.background = 'rgba(74,222,128,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '3px 10px', borderRadius: '20px' }}>{c.kategorija}</span>
                <span style={{ fontSize: '12px', color: '#4a5a7a' }}>{c.datum}</span>
                <span style={{ fontSize: '12px', color: '#4a5a7a' }}>· {c.trajanje}</span>
              </div>
              <h2 style={{ fontSize: mob ? '17px' : '20px', fontWeight: '700', color: '#f0f4ff', marginBottom: '10px', lineHeight: '1.4' }}>{c.naslov}</h2>
              <p style={{ fontSize: '14px', color: '#6b7fa3', lineHeight: '1.7', margin: '0 0 16px' }}>{c.uvod}</p>
              <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: '500' }}>Čitaj više →</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '56px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#f0f4ff', marginBottom: '10px' }}>Spremi za start?</h3>
          <p style={{ fontSize: '14px', color: '#6b7fa3', marginBottom: '20px' }}>14 dana besplatno. Bez kartice. Bez obaveza.</p>
          <button onClick={() => navigate('/register')} style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', padding: '13px 28px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            Počni besplatno →
          </button>
        </div>
      </div>
    </div>
  );
}

function BlogClanak() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const mob = window.innerWidth < 768;
  const clanak = clanci.find(c => c.slug === slug);

  if (!clanak) return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '40px', marginBottom: '16px' }}>😔</p>
        <p style={{ color: '#f0f4ff', fontSize: '18px', marginBottom: '16px' }}>Članak nije pronađen.</p>
        <button onClick={() => navigate('/blog')} style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 24px', cursor: 'pointer' }}>← Nazad na blog</button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0a0f1e', color: '#f0f4ff', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '60px', background: 'rgba(10,15,30,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 onClick={() => navigate('/')} style={{ fontSize: '18px', fontWeight: '600', color: '#f0f4ff', margin: 0, cursor: 'pointer' }}>
          termini<span style={{ color: '#4ade80' }}>.pro</span>
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/blog')} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#c8d0e8', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer' }}>← Blog</button>
          <button onClick={() => navigate('/register')} style={{ background: '#16a34a', border: 'none', color: 'white', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>Probaj besplatno</button>
        </div>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: mob ? '48px 1.5rem' : '72px 2rem' }}>
        {/* Header članka */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '3px 10px', borderRadius: '20px' }}>{clanak.kategorija}</span>
            <span style={{ fontSize: '12px', color: '#4a5a7a' }}>{clanak.datum}</span>
            <span style={{ fontSize: '12px', color: '#4a5a7a' }}>· {clanak.trajanje}</span>
          </div>
          <h1 style={{ fontSize: mob ? '24px' : '32px', fontWeight: '700', color: '#f0f4ff', lineHeight: '1.35', marginBottom: '16px' }}>{clanak.naslov}</h1>
          <p style={{ fontSize: '17px', color: '#8b9ec7', lineHeight: '1.75', borderLeft: '3px solid rgba(74,222,128,0.4)', paddingLeft: '16px' }}>{clanak.uvod}</p>
        </div>

        {/* Sadržaj */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {clanak.sadrzaj.map((blok, i) => {
            if (blok.tip === 'naslov') return (
              <h2 key={i} style={{ fontSize: '20px', fontWeight: '700', color: '#f0f4ff', marginTop: '12px', marginBottom: '4px' }}>{blok.tekst}</h2>
            );
            if (blok.tip === 'paragraf') return (
              <p key={i} style={{ fontSize: '16px', color: '#8b9ec7', lineHeight: '1.8', margin: 0 }}>{blok.tekst}</p>
            );
            if (blok.tip === 'lista') return (
              <ul key={i} style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {blok.stavke.map((s, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#c8d0e8' }}>
                    <span style={{ color: '#4ade80', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            );
            return null;
          })}
        </div>

        {/* CTA na kraju članka */}
        <div style={{ marginTop: '56px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#f0f4ff', marginBottom: '10px' }}>Spremi za start?</h3>
          <p style={{ fontSize: '14px', color: '#6b7fa3', marginBottom: '20px' }}>14 dana besplatno. Bez kartice. Bez obaveza.</p>
          <button onClick={() => navigate('/register')} style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', padding: '13px 28px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            Počni besplatno →
          </button>
        </div>

        {/* Ostali članci */}
        <div style={{ marginTop: '48px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#8b9ec7', marginBottom: '16px' }}>Ostali članci</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {clanci.filter(c => c.slug !== slug).map((c, i) => (
              <div key={i} onClick={() => navigate(`/blog/${c.slug}`)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(74,222,128,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f7', margin: '0 0 4px' }}>{c.naslov}</p>
                <p style={{ fontSize: '12px', color: '#4a5a7a', margin: 0 }}>{c.datum} · {c.trajanje}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { BlogLista, BlogClanak };