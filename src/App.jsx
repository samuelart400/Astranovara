import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App({ section }) {
  const [profit, setProfit] = useState(0.00);
  const [pulses, setPulses] = useState(0);
  const [status, setStatus] = useState('idle');
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    // Live Ticker Logic
    const interval = setInterval(() => {
      setPulses(prev => prev + Math.floor(Math.random() * 3));
      setProfit(prev => prev + (Math.random() * 0.05));
    }, 2000);

    // Countdown Logic to May 17, 2026
    const calculateCountdown = () => {
      const target = new Date("May 17, 2026 00:00:00").getTime();
      const now = new Date().getTime();
      const diff = target - now;
      setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)));
    };
    
    calculateCountdown();
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwM1wHNuhwqvHks0KiY-HKapDMoV7_eSSclLLwPR3PQJd7lpJCHj3Iu89BlQBzsqlee/exec";
    try {
      const formData = new FormData(e.target);
      await fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
      setStatus('success');
    } catch (err) { setStatus('error'); }
  };

  const SovereignEmblem = () => (
    <div className="emblem-container">
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 17L5.5 21L8 13.5L2 9H9.5L12 2Z" stroke="#C5A059" strokeWidth="1" fill="rgba(197, 160, 89, 0.2)" />
      </svg>
    </div>
  );

  const renderContent = () => {
    switch (section) {
      case 'about':
        return (
          <div className="section-wrap">
            <span className="section-title">CORPORATE SYNOPSIS</span>
            <h2 className="anchor-text">The Astranovara Mandate</h2>
            <p className="story-text">
              <strong>The Goal:</strong> To secure 10M USD in liquidity to establish the first universal "Neutral Zone" logic network. We are replacing fragile, dependent systems with a singular, sovereign backbone.
            </p>

            <div className="mission-grid">
              <div className="manifesto-item">
                <h3>Systemic Priority</h3>
                <p>We solve the risk of decommission. By moving logic to neutral zones, we ensure your infrastructure is your own, permanently.</p>
              </div>
              <div className="manifesto-item">
                <h3>Genesis Supply</h3>
                <p>Mathematical certainty through 100M $STAR. This is the only fuel that powers the Logic Plug pulses.</p>
              </div>
              <div className="manifesto-item">
                <h3>Market Integration</h3>
                <p>We do not disrupt; we integrate. Our Logic Plug works silently within existing APIs to capture global transaction flow.</p>
              </div>
              <div className="manifesto-item">
                <h3>Global Settlement</h3>
                <p>Removing the middleman from compute-costs. Instant cross-border settlement for any API handshake.</p>
              </div>
              <div className="manifesto-item">
                <h3>Infrastructure Core</h3>
                <p>Physical hard-asset nodes. We own the iron and the air between the data. Real-world resilience.</p>
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="section-wrap">
            <span className="section-title">ACTIVE INFRASTRUCTURE</span>
            <h2 className="anchor-text">Yield Assets</h2>
            <div className="portfolio-grid">
              <div className="portfolio-card">
                <h3>The Logic Plug</h3>
                <p>Captures value from every API logic pulse worldwide.</p>
                <span className="asset-tag">ACTIVE REVENUE</span>
              </div>
              <div className="portfolio-card">
                <h3>Sovereign Nodes</h3>
                <p>Neutral zone data centers providing absolute uptime.</p>
                <span className="asset-tag">PHYSICAL ASSET</span>
              </div>
            </div>
          </div>
        );

      case 'investors':
        return (
          <div className="section-wrap">
            <h2 className="anchor-text">Secure Allocation</h2>
            
            <div style={{
              background: '#fcf8e3', 
              border: '1px solid #faebcc', 
              padding: '15px', 
              borderRadius: '4px', 
              marginBottom: '30px',
              fontSize: '0.8rem',
              color: '#8a6d3b',
              fontWeight: '700',
              textAlign: 'center',
              letterSpacing: '1px'
            }}>
              PROTOCOL NOTICE: WE EXCLUSIVELY ACCEPT BTC OR ETH (ERC-20) SETTLEMENTS.
            </div>

            {status === 'success' ? (
              <div className="success-msg" style={{textAlign: 'center', padding: '40px 0'}}>
                <h2 style={{color: 'var(--gold)', letterSpacing: '4px', fontSize: '2.5rem'}}>THANK YOU</h2>
                <div style={{height: '1px', background: 'var(--gold)', width: '60px', margin: '20px auto', opacity: 0.5}}></div>
                <p style={{textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1px', color: 'var(--blue)'}}>
                  Your transmission is secured in the Sovereign Ledger
                </p>
              </div>
            ) : (
              <>
                <div className="investor-layout" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px'}}>
                  <div className="form-column">
                    <form className="sovereign-form" onSubmit={handleFormSubmit}>
                      <input name="Name" type="text" placeholder="FULL NAME / ENTITY" required />
                      <input name="Email" type="email" placeholder="ENCRYPTED EMAIL" required />
                      <input name="Wallet" type="text" placeholder="WALLET ADDRESS" required />
                      <input name="Allocation" type="number" placeholder="CONTRIBUTION (USD)" required />
                      <button type="submit" className="spectacular-btn">
                        {status === 'loading' ? 'LOGGING...' : 'INITIALIZE'}
                      </button>
                    </form>
                  </div>

                  <div className="info-column" style={{background: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
                    <h3 style={{color: 'var(--blue)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '20px'}}>PHASE 0: GENESIS ENTRY</h3>
                    <p style={{fontSize: '0.85rem', color: '#666', lineHeight: '1.6'}}>
                      For participants entering the mandate at the base tier, your allocation fuels the initial <strong>Node Calibration</strong> phase.
                    </p>
                    <ul style={{fontSize: '0.8rem', color: '#777', paddingLeft: '20px', marginTop: '15px'}}>
                      <li style={{marginBottom: '10px'}}>Guaranteed $STAR Genesis Pricing.</li>
                      <li style={{marginBottom: '10px'}}>Priority access to the "Logic Plug" beta dashboard.</li>
                      <li>Future yield-capture routing eligibility.</li>
                    </ul>
                  </div>
                </div>

                <div className="risk-disclosure-box" style={{
                  border: '1px solid #d93025',
                  padding: '25px',
                  background: '#fff5f5',
                  borderRadius: '4px',
                  marginBottom: '40px'
                }}>
                  <h4 style={{color: '#d93025', marginTop: 0, letterSpacing: '2px', fontSize: '0.8rem'}}>PROTOCOL RISK DISCLOSURE & JURISDICTIONAL RESTRICTIONS</h4>
                  
                  <p style={{fontSize: '0.75rem', color: '#444', lineHeight: '1.6', margin: '10px 0'}}>
                    <strong>Excluded Jurisdictions:</strong> This protocol does not accept participation from citizens or residents of the <strong>United States, China, North Korea, Iran, Syria, Cuba,</strong> or any regions under active international sanctions. By initializing, you confirm your eligibility.
                  </p>

                  <p style={{fontSize: '0.75rem', color: '#444', lineHeight: '1.6', margin: '10px 0'}}>
                    <strong>Absolute Risk:</strong> $STAR is a cryptographic logic fuel. Participation involves 100% capital risk. In the event of network failure or regulatory change, there is <strong>no compensation mechanism</strong>. All transmissions are final.
                  </p>
                  
                  <p style={{fontSize: '0.7rem', color: '#d93025', fontWeight: '800', fontStyle: 'italic'}}>
                    BY INITIALIZING TRANSMISSION, YOU ACCEPT THAT RISK IS ABSOLUTE.
                  </p>
                </div>
              </>
            )}

            <div className="wallet-reveal">
              <div className="wallet-box">
                <span>BITCOIN (BTC) - NATIVE SEGWIT</span>
                <code>bc1q5cjn0ksznv5lx64vx0k44csent4uuhknkdqn9f</code>
              </div>
              <div className="wallet-box">
                <span>ETHEREUM / USDC (ERC-20)</span>
                <code>0x71f3BFe473C4DC9712fE028D085742d47d4b2C1a</code>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="hero-slider">
            <SovereignEmblem />
            <h1 className="main-logo-text">ASTRANOVARA</h1>
            <p className="hero-subtitle">UNIVERSAL LOGIC • 100M SUPPLY</p>
            
            <div className="live-ticker-panel">
              <div className="ticker-item">
                <span className="label">LOGIC PULSES</span>
                <span className="value">{pulses.toLocaleString()}</span>
                <p style={{fontSize: '0.65rem', marginTop: '10px', opacity: 0.8}}>Pulse = Fee-captured Logic Handshake</p>
              </div>
              <div className="ticker-item">
                <span className="label">YIELD (USD)</span>
                <span className="value gold-text">${profit.toFixed(2)}</span>
              </div>
              <div className="ticker-item">
                <span className="label">DAYS REMAINING</span>
                <span className="value" style={{color: '#ff4d4d'}}>{daysLeft}</span>
                <p style={{fontSize: '0.65rem', marginTop: '10px', opacity: 0.8}}>Scale Round 1 Closure</p>
              </div>
            </div>
            <Link to="/investors" className="spectacular-btn" style={{textDecoration:'none', maxWidth: '400px', margin: '0 auto'}}>SECURE POSITION</Link>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="nav-logo">ASTRANOVARA</Link>
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/portfolio">PORTFOLIO</Link>
          <Link to="/investors" className="investor-btn">INVESTORS</Link>
        </div>
      </nav>
      <main className="main-stage">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;