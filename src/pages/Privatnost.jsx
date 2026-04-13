export default function Privatnost() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Inter, sans-serif', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        <a href="/" style={{ color: '#4ade80', fontSize: '14px', textDecoration: 'none' }}>← Nazad</a>
        
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#f0f4ff', margin: '1.5rem 0 0.5rem' }}>
          Politika privatnosti
        </h1>
        <p style={{ color: '#6b7fa3', fontSize: '14px', marginBottom: '2rem' }}>
          Posljednje ažuriranje: April 2026.
        </p>

        {[
          {
            title: '1. Ko prikuplja vaše podatke?',
            tekst: 'termini.pro je platforma koja omogućava online zakazivanje termina. Vaše podatke prikuplja i obrađuje pružalac usluge kod kojeg zakazujete termin (ordinacija, salon, terapeut), a termini.pro djeluje kao tehnički posrednik.'
          },
          {
            title: '2. Koje podatke prikupljamo?',
            tekst: 'Pri zakazivanju termina prikupljamo: ime i prezime, broj telefona (opciono), email adresu (opciono) i napomenu koju sami ostavite. Ne prikupljamo osjetljive medicinske podatke.'
          },
          {
            title: '3. Zašto prikupljamo vaše podatke?',
            tekst: 'Vaši podaci koriste se isključivo za: potvrdu termina, slanje podsjetnika i komunikaciju vezanu za vaš termin. Vaši podaci se ne dijele s trećim stranama niti se koriste u marketinške svrhe.'
          },
          {
            title: '4. Ko ima pristup vašim podacima?',
            tekst: 'Pristup vašim podacima ima isključivo pružalac usluge kod kojeg ste zakazali termin. Zaposleni termini.pro platforme nemaju pristup podacima pacijenata/klijenata.'
          },
          {
            title: '5. Koliko dugo čuvamo vaše podatke?',
            tekst: 'Vaši podaci čuvaju se dok imate aktivne termine ili dok ne zatražite brisanje. Nakon toga, podaci se brišu u roku od 30 dana.'
          },
          {
            title: '6. Vaša prava (GDPR)',
            tekst: 'Imate pravo na: pristup vašim podacima, ispravku netačnih podataka, brisanje podataka ("pravo na zaborav"), prigovor na obradu podataka. Za ostvarivanje ovih prava kontaktirajte nas na info@termini.pro.'
          },
          {
            title: '7. Kontakt',
            tekst: 'Za sva pitanja vezana za privatnost podataka: info@termini.pro'
          },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f0f4ff', marginBottom: '8px' }}>
              {s.title}
            </h2>
            <p style={{ fontSize: '14px', color: '#8b9ec7', lineHeight: '1.8' }}>
              {s.tekst}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}