import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App({ section }) {
  const [profit, setProfit] = useState(0.00);
  const [pulses, setPulses] = useState(0);
  const [status, setStatus] = useState('idle');
  const [daysLeft, setDaysLeft] = useState(0);
  const [copied, setCopied] = useState('');
  const [calcInput, setCalcInput] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulses(prev => prev + Math.floor(Math.random() * 3));
      setProfit(prev => prev + (Math.random() * 0.05));
    }, 2000);

    const calculateCountdown = () => {
      const target = new Date("May 17, 2026 00:00:00").getTime();
      const now = new Date().getTime();
      const diff = target - now;
      setDaysLeft(Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))));
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

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const SovereignEmblem = () => (
    <div className="emblem-container" style={{textAlign: 'center', marginBottom: '20px'}}>
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 17L5.5 21L8 13.5L2 9H9.5L12 2Z" stroke="#C5A059" strokeWidth="1" fill="rgba(197, 160, 89, 0.2)" />
      </svg>
    </div>
  );

  const renderContent = () => {
    // Shared Pricing Logic
    const launchDate = new Date("2026-04-18");
    const today = new Date();
    const diffInDays = Math.floor((today - launchDate) / (1000 * 60 * 60 * 24));
    
    let currentPrice, phaseName, nextPrice, progressWidth, daysUntilNext;
    
    if (diffInDays <= 14) {
      currentPrice = 0.10; phaseName = "PHASE 0: GENESIS"; nextPrice = 0.15;
      progressWidth = (diffInDays / 14) * 100; daysUntilNext = 14 - diffInDays;
    } else if (diffInDays <= 25) {
      currentPrice = 0.15; phaseName = "PHASE 1: GROWTH"; nextPrice = 0.25;
      progressWidth = ((diffInDays - 14) / 11) * 100; daysUntilNext = 25 - diffInDays;
    } else {
      currentPrice = 0.25; phaseName = "PHASE 2: FINALITY"; nextPrice = "CLOSED";
      progressWidth = 100; daysUntilNext = 30 - diffInDays;
    }

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
              <div className="manifesto-item"><h3>Systemic Priority</h3><p>Nodes in neutral zones ensure your infrastructure is your own, permanently.</p></div>
              <div className="manifesto-item"><h3>Genesis Supply</h3><p>Mathematical certainty through 100M $STAR. The only fuel for Logic Pulses.</p></div>
              <div className="manifesto-item"><h3>Market Integration</h3><p>Logic Plug works silently within existing APIs to capture global transaction flow.</p></div>
              <div className="manifesto-item"><h3>Global Settlement</h3><p>Instant cross-border settlement for any API handshake, removing middlemen.</p></div>
              <div className="manifesto-item"><h3>Infrastructure Core</h3><p>Physical hard-asset nodes. We own the iron and the air between the data.</p></div>
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
                <p>Universal API fee capture engine.</p>
                <span className="asset-tag">ACTIVE REVENUE</span>
              </div>
              <div className="portfolio-card">
                <h3>Sovereign Nodes</h3>
                <p>Physical data centers in offshore jurisdictions.</p>
                <span className="asset-tag">HARD ASSET</span>
              </div>
            </div>
          </div>
        );

      case 'investors':
        return (
          <div className="section-wrap">
            <h2 className="anchor-text">Secure Allocation</h2>
            <div className="protocol-notice" style={{background: '#fcf8e3', border: '1px solid #faebcc', padding: '15px', borderRadius: '4px', marginBottom: '30px', fontSize: '0.8rem', color: '#8a6d3b', fontWeight: '700', textAlign: 'center'}}>
              PROTOCOL NOTICE: WE EXCLUSIVELY ACCEPT BTC OR ETH (ERC-20) SETTLEMENTS.
            </div>

            {status === 'success' ? (
              <div className="success-msg" style={{textAlign: 'center', padding: '40px 0'}}>
                <h2 style={{color: 'var(--gold)', letterSpacing: '4px', fontSize: '2.5rem'}}>THANK YOU</h2>
                <div style={{height: '1px', background: 'var(--gold)', width: '60px', margin: '20px auto', opacity: 0.5}}></div>
                <p style={{textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1px', color: 'var(--blue)'}}>Your transmission is secured in the Sovereign Ledger</p>
                <button onClick={() => setStatus('idle')} className="spectacular-btn" style={{maxWidth: '200px', marginTop: '30px', padding: '12px'}}>NEW ENTRY</button>
              </div>
            ) : (
              <>
                {/* Live Allocation Calculator */}
                <div className="calculator-box" style={{background: 'var(--blue)', color: 'white', padding: '25px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 15px 30px rgba(0,43,73,0.3)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <span style={{fontSize: '0.7rem', opacity: 0.8, letterSpacing: '1px'}}>ALLOCATION (USD)</span>
                      <input 
                        type="number" 
                        value={calcInput} 
                        onChange={(e) => setCalcInput(e.target.value)}
                        style={{background: 'transparent', border: 'none', borderBottom: '2px solid var(--gold)', color: 'white', fontSize: '2rem', fontWeight: '800', width: '150px', outline: 'none', marginTop: '5px'}}
                      />
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <span style={{fontSize: '0.7rem', opacity: 0.8, letterSpacing: '1px'}}>ESTIMATED STAR FUEL</span>
                      <div style={{fontSize: '2.5rem', fontWeight: '900', color: 'var(--gold)'}}>
                        {(calcInput / currentPrice).toLocaleString()} <small style={{fontSize: '1rem', opacity: 0.6}}>$STAR</small>
                      </div>
                    </div>
                  </div>
                  <p style={{fontSize: '0.6rem', marginTop: '15px', opacity: 0.6, fontStyle: 'italic'}}>*Calculated at current {phaseName} rate of ${currentPrice.toFixed(2)}</p>
                </div>

                <div className="investor-layout" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px'}}>
                  <div className="form-column">
                    <form className="sovereign-form" onSubmit={handleFormSubmit}>
                      <input name="Name" type="text" placeholder="FULL NAME / ENTITY" required />
                      <input name="Email" type="email" placeholder="ENCRYPTED EMAIL" required />
                      <input name="Wallet" type="text" placeholder="YOUR WALLET ADDRESS" required />
                      <input name="Allocation" type="number" value={calcInput} readOnly style={{background: '#f0f0f0', color: '#888'}} />
                      <button type="submit" className="spectacular-btn">{status === 'loading' ? 'LOGGING...' : 'INITIALIZE'}</button>
                    </form>
                  </div>
                  <div className="info-column" style={{background: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
                    <h3 style={{color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '15px'}}>{phaseName}</h3>
                    <div style={{marginBottom: '20px', padding: '20px', background: '#fff', border: '1px solid #eee', borderRadius: '8px'}}>
                      <span style={{fontSize: '0.65rem', opacity: 0.7, display: 'block'}}>NEXT PRICE STEP</span>
                      <span style={{fontSize: '1.8rem', fontWeight: '900', color: 'var(--gold)'}}>${nextPrice}</span>
                      <div style={{marginTop: '15px', height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden'}}>
                        <div style={{width: `${progressWidth}%`, height: '100%', background: 'var(--gold)', transition: 'width 1s ease'}}></div>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '8px'}}>
                        <span style={{fontSize: '0.6rem', color: '#666'}}>{daysUntilNext} DAYS UNTIL ADJUSTMENT</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="risk-disclosure-box" style={{border: '1px solid #d93025', padding: '25px', background: '#fff5f5', borderRadius: '4px', marginBottom: '40px'}}>
                  <h4 style={{color: '#d93025', marginTop: 0, letterSpacing: '2px', fontSize: '0.8rem'}}>RISK DISCLOSURE & JURISDICTION</h4>
                  <p style={{fontSize: '0.75rem', color: '#444', lineHeight: '1.6'}}><strong>Excluded:</strong> USA, China, North Korea, Iran, Syria, Cuba. Absolute capital risk. No compensation mechanism exists.</p>
                </div>
              </>
            )}

            <div className="wallet-reveal">
              <div className="wallet-box" onClick={() => copyToClipboard('bc1q5cjn0ksznv5lx64vx0k44csent4uuhknkdqn9f', 'BTC')} style={{cursor: 'pointer'}}>
                <span>BITCOIN (BTC) - CLICK TO COPY</span>
                <code>bc1q5cjn0ksznv5lx64vx0k44csent4uuhknkdqn9f</code>
                {copied === 'BTC' && <span style={{color: 'var(--gold)', marginLeft: '10px'}}>COPIED!</span>}
              </div>
              <div className="wallet-box" onClick={() => copyToClipboard('0x71f3BFe473C4DC9712fE028D085742d47d4b2C1a', 'ETH')} style={{cursor: 'pointer'}}>
                <span>ETH / USDC (ERC-20) - CLICK TO COPY</span>
                <code>0x71f3BFe473C4DC9712fE028D085742d47d4b2C1a</code>
                {copied === 'ETH' && <span style={{color: 'var(--gold)', marginLeft: '10px'}}>COPIED!</span>}
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
              <div className="ticker-item"><span className="label">LOGIC PULSES</span><span className="value">{pulses.toLocaleString()}</span></div>
              <div className="ticker-item"><span className="label">YIELD (USD)</span><span className="value gold-text">${profit.toFixed(2)}</span></div>
              <div className="ticker-item"><span className="label">DAYS REMAINING</span><span className="value" style={{color: '#ff4d4d'}}>{daysLeft}</span></div>
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
        <div className="nav-links"><Link to="/">HOME</Link><Link to="/about">ABOUT</Link><Link to="/portfolio">PORTFOLIO</Link><Link to="/investors" className="investor-btn">INVESTORS</Link></div>
      </nav>
      <main className="main-stage">{renderContent()}</main>
    </div>
  );
}

export default App;