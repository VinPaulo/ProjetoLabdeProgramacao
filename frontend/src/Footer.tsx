import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      marginTop: '4rem',
      padding: '2rem 1rem',
      textAlign: 'center',
      width: '100%',
      maxWidth: '700px',
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      opacity: 0.8
    }}>
      <div style={{ marginBottom: '0.6rem', color: 'var(--accent-muted)' }}>
        <strong>p.Wallet</strong> • Gestão Financeira Simplificada
      </div>
      <p style={{ margin: 0, lineHeight: '1.6' }}>
        Acompanhe seus ganhos, registre seus gastos e tome o controle da sua vida financeira com p.Wallet.
      </p>
    </footer>
  );
};

export default Footer;
