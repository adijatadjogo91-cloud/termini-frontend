import { useNavigate } from 'react-router-dom'

export default function Uputstvo() {
  const navigate = useNavigate()

  const koraci = [
    {
      broj: '01',
      naslov: 'Registracija i postavljanje',
      ikona: '📝',
      stavke: [
        'Idite na termini.pro i kliknite "Probaj besplatno"',
        'Unesite naziv vašeg biznisa, email i lozinku',
        'Nakon registracije otvorit će se čarobnjak za postavljanje',
        'Dodajte adresu, telefon i opis vašeg biznisa',
        'Postavite radno vrijeme za svaki dan sedmice',
      ]
    },
    {
      broj: '02',
      naslov: 'Dodavanje usluga',
      ikona: '📋',
      stavke: [
        'Idite na "Usluge" u navigaciji',
        'Kliknite "+ Nova usluga"',
        'Unesite naziv usluge, cijenu i trajanje u minutama',
        'Opciono: dodajte pauzu unutar termina (npr. za bojanje kose)',
        'Kliknite "Sačuvaj" — usluga je odmah vidljiva na vašoj booking stranici',
      ]
    },
    {
      broj: '03',
      naslov: 'Dijeljenje booking linka',
      ikona: '🔗',
      stavke: [
        'Na Dashboardu pronađite vaš booking link i QR kod',
        'Kliknite "Kopiraj link" i stavite ga u Instagram bio',
        'QR kod možete odštampati i postaviti u ordinaciji/salonu',
        'Link možete podijeliti i putem WhatsApp, Viber ili email',
        'Klijenti kliknu na link i zakazuju bez registracije',
      ]
    },
    {
      broj: '04',
      naslov: 'Upravljanje terminima',
      ikona: '📅',
      stavke: [
        'Svi termini se vide na stranici "Termini"',
        'Možete pregledati termine u listi ili kalendaru',
        'Kliknite "✓ Završi" kada je termin obavljen — klijent dobiva loyalty bodove',
        'Kliknite "Otkaži" za otkazivanje termina',
        'Klijenti automatski dobivaju email potvrdu i podsjetnik 24h unaprijed',
      ]
    },
    {
      broj: '05',
      naslov: 'Upravljanje klijentima',
      ikona: '🧑‍🤝‍🧑',
      stavke: [
        'Svi klijenti se automatski dodaju pri prvom zakazivanju',
        'Na stranici "Klijenti" možete pretražiti i filtrirati klijente',
        'Vidite broj termina i loyalty bodove svakog klijenta',
        'Kliknite "⭐ Iskoristi bodove" za primjenu loyalty popusta',
        'Kliknite "🚫 Blokiraj" za blokiranje klijenta koji ne dolazi',
      ]
    },
    {
      broj: '06',
      naslov: 'Praćenje prihoda',
      ikona: '💰',
      stavke: [
        'Na stranici "Prihodi" vidite prihode po danu, sedmici i mjesecu',
        'Grafikon prikazuje trend prihoda tokom vremena',
        'Kliknite ikonu 📅 za export PDF izvještaja',
        'AI asistent na dashboardu daje konkretne savjete za rast',
        'Upišite pitanje AI asistentu: "Koji dan je najproduktivniji?"',
      ]
    },
    {
      broj: '07',
      naslov: 'Akcije i popusti',
      ikona: '🎯',
      stavke: [
        'Na stranici "Akcije" kreirajte popuste za usluge',
        'Možete postaviti popust u % ili fiksnom iznosu u KM',
        'Odaberite za koju uslugu važi popust i period trajanja',
        'Aktivan popust se prikazuje klijentima na booking stranici',
        'Deaktivirajte akciju jednim klikom kada istekne',
      ]
    },
    {
      broj: '08',
      naslov: 'Galerija i brend',
      ikona: '🎨',
      stavke: [
        'Na stranici "Postavke" uploadajte logo vašeg biznisa',
        'Dodajte fotografije radova u galeriju',
        'Galerija se prikazuje klijentima na vašoj booking stranici',
        'Podesite neradne dane (godišnji odmor, praznici)',
        'Sve promjene su odmah vidljive na booking stranici',
      ]
    },
  ]

  const savjeti = [
    { ikona: '💡', tekst: 'Stavite booking link u Instagram bio odmah — to je najbrži način do prvih rezervacija.' },
    { ikona: '📱', tekst: 'QR kod odštampajte i zalijepite na ulaz — klijenti koji čekaju mogu zakazati sljedeći termin.' },
    { ikona: '⭐', tekst: 'Loyalty program povećava povratak klijenata — obavijestite klijente da skupljaju bodove.' },
    { ikona: '🤖', tekst: 'Pitajte AI asistenta svaki dan — daje konkretne savjete bazirane na vašim stvarnim podacima.' },
    { ikona: '📊', tekst: 'Pratite prihode sedmično — znanje o trendovima pomaže u planiranju i popunjavanju kalendara.' },
  ]

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0a0f1e', color: '#f0f4ff', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '60px', background: 'rgba(10,15,30,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 onClick={() => navigate('/dashboard')} style={{ fontSize: '18px', fontWeight: '600', color: '#f0f4ff', margin: 0, cursor: 'pointer' }}>
          termini<span style={{ color: '#4ade80' }}>.pro</span>
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => window.print()} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#c8d0e8', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer' }}>
            🖨️ Štampaj / PDF
          </button>
          <button onClick={() => navigate('/dashboard')} style={{ background: '#16a34a', border: 'none', color: 'white', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>
            ← Dashboard
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', marginBottom: '16px' }}>
            Korisničko uputstvo
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#f0f4ff', marginBottom: '12px' }}>
            Dobrodošli u termini.pro
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7fa3', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto' }}>
            Ovaj vodič će vam pomoći da postavite i koristite termini.pro na najbolji način.
          </p>
        </div>

        {/* Koraci */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '3rem' }}>
          {koraci.map((k, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                  {k.ikona}
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(74,222,128,0.6)', letterSpacing: '0.1em' }}>{k.broj}</span>
                  <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#f0f4ff', margin: 0 }}>{k.naslov}</h2>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {k.stavke.map((s, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#4ade80', fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#8b9ec7', lineHeight: '1.6' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro savjeti */}
        <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '16px', padding: '28px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f0f4ff', marginBottom: '16px' }}>
            💡 Pro savjeti za maksimalne rezultate
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {savjeti.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '12px 14px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{s.ikona}</span>
                <span style={{ fontSize: '14px', color: '#c8d0e8', lineHeight: '1.6' }}>{s.tekst}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kontakt */}
        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#f0f4ff', marginBottom: '8px' }}>Trebate pomoć?</h3>
          <p style={{ fontSize: '14px', color: '#6b7fa3', marginBottom: '12px' }}>
            Naš tim je dostupan putem emaila radnim danima od 9:00 do 17:00.
          </p>
          <a href="mailto:info@termini.pro" style={{ fontSize: '14px', color: '#4ade80', textDecoration: 'none', fontWeight: '500' }}>
            📧 info@termini.pro
          </a>
        </div>

      </div>

      {/* Print stilovi */}
      <style>{`
        @media print {
          nav { display: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>
    </div>
  )
}
