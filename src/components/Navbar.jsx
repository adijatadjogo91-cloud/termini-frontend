function Navbar() {
  const trenutnaStrana = window.location.pathname

  function handleOdjava() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const linkStyle = (putanja) => ({
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: trenutnaStrana === putanja ? '600' : '400',
    color: trenutnaStrana === putanja ? '#1a7a4a' : '#555',
    padding: '6px 12px',
    borderRadius: '8px',
    background: trenutnaStrana === putanja ? '#eaf3de' : 'transparent'
  })

  return (
    <div style={{
      height: '60px',
      background: 'white',
      borderBottom: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h2 style={{ color: '#1a1a1a', fontSize: '20px' }}>
          termini<span style={{ color: '#1a7a4a' }}>.pro</span>
        </h2>

        <nav style={{ display: 'flex', gap: '4px' }}>
          <a href="/dashboard" style={linkStyle('/dashboard')}>Dashboard</a>
          <a href="/termini" style={linkStyle('/termini')}>Termini</a>
          <a href="/klijenti" style={linkStyle('/klijenti')}>Klijenti</a>
<a href="/usluge" style={linkStyle('/usluge')}>Usluge</a>
        </nav>
      </div>

      <button
        onClick={handleOdjava}
        style={{
          background: 'none',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          color: '#555',
          cursor: 'pointer'
        }}
      >
        Odjava
      </button>
    </div>
  )
}

export default Navbar