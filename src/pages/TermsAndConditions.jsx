import { useNavigate } from 'react-router-dom';

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a', background: '#f9f9f9', minHeight: '100vh' }}>

      {/* Navbar */}
      <div style={{
        height: '64px', background: 'white', borderBottom: '1px solid #eee',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', position: 'sticky', top: 0, zIndex: 100
      }}>
        <h2 onClick={() => navigate('/')} style={{ fontSize: '20px', cursor: 'pointer' }}>
          termini<span style={{ color: '#1a7a4a' }}>.pro</span>
        </h2>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: '1px solid #ddd', borderRadius: '8px',
          padding: '8px 16px', fontSize: '14px', cursor: 'pointer', color: '#555'
        }}>
          ← Nazad
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Uslovi korištenja</h1>
        <p style={{ color: '#888', marginBottom: '3rem' }}>Posljednje ažuriranje: April 2026.</p>

        {[
          {
        title: '1. Prihvatanje uslova',
text: 'Korištenjem platforme termini.pro prihvatate ove uslove korištenja...'
          },
          {
            title: '2. Opis usluge',
            text: 'termini.pro je SaaS platforma za upravljanje terminima, klijentima i uposlenicima namijenjena salonima, ordinacijama i sličnim poslovnim subjektima. Nudimo online zakazivanje, SMS podsjetnike i analitiku poslovanja.'
          },
          {
            title: '3. Pretplata i plaćanje',
            text: 'Usluga se naplaćuje mjesečno u iznosu od 49 KM. Novi korisnici imaju pravo na 14 dana besplatnog probnog perioda. Nakon isteka probnog perioda, pretplata se automatski aktivira. Otkaz pretplate je moguć u bilo kojem trenutku.'
          },
          {
            title: '4. Privatnost podataka',
            text: 'Vaši podaci i podaci vaših klijenata se čuvaju sigurno i ne dijele se s trećim stranama bez vaše dozvole. Koristimo industrijske standarde zaštite podataka uključujući SSL enkripciju i sigurno pohranjivanje lozinki.'
          },
          {
            title: '5. Odgovornost korisnika',
            text: 'Korisnik je odgovoran za tačnost podataka koje unosi u sistem, čuvanje pristupnih podataka (email i lozinka), te korištenje platforme u skladu sa važećim zakonima Bosne i Hercegovine.'
          },
          {
            title: '6. Dostupnost usluge',
            text: 'Nastojimo osigurati dostupnost platforme 24/7, ali ne možemo garantovati neprekidan rad. U slučaju tehničkih problema, trudimo se riješiti ih u najkraćem mogućem roku.'
          },
          {
            title: '7. Izmjene uvjeta',
            text: 'Zadržavamo pravo izmjene ovih uvjeta. O značajnim izmjenama obavijestit ćemo korisnike putem emaila najmanje 14 dana unaprijed.'
          },
          {
            title: '8. Kontakt',
            text: 'Za sva pitanja vezana za uvjete korištenja možete nas kontaktirati na: info@termini.pro'
          },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a' }}>{s.title}</h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7' }}>{s.text}</p>
          </div>
        ))}

      </div>

      {/* Footer */}
      <div style={{ padding: '32px 2rem', background: 'white', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p style={{ color: '#888', fontSize: '14px' }}>
          © 2026 termini.pro — Napravljeno s ❤️ u Bosni i Hercegovini
        </p>
      </div>

    </div>
  )
}