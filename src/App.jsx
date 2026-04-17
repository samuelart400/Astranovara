import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App({ section }) {
  const [profit, setProfit] = useState(0.00);
  const [pulses, setPulses] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const interval = setInterval(() => {
      setPulses(prev => prev + Math.floor(Math.random() * 3));
      setProfit(prev => prev + (Math.random() * 0.05));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // YOUR NEW VERIFIED SCRIPT URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwM1wHNuhwqvHks0KiY-HKapDMoV7_eSSclLLwPR3PQJd7lpJCHj3Iu89BlQBzsqlee/exec";

    try {
      const formData = new FormData(e.target);
      await fetch(SCRIPT_URL, { 
        method: 'POST', 
        body: formData, 
        mode: 'no-cors' 
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const HomeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

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
          <div className="section-wrap floating-card">
            <span className="section-title">THE ARCHITECTURE OF POWER</span>
            <h2 className="anchor-text">Astra + Novara</h2>
            <p className="story-text" style={{borderLeft: '2px solid var(--gold)', paddingLeft: '15px', fontStyle: 'italic'}}>
              "To build the infrastructure of the future is to own it."
            </p>
            <p className="story-text">
              Astranovara is the cold, calculated answer to legacy technical dependence. 
              Born from the necessity of <strong>Sovereign Logic</strong>.
            </p>
            <div className="mission-grid">
              <div className="manifesto-item"><h3>Sovereign Autonomy</h3><p>Undecommissionable logic protocols.</p></div>
              <div className="manifesto-item"><h3>Absolute Scarcity</h3><p>100M $STAR Fixed Supply.</p></div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="section-wrap">
            <span className="section-title">HIGH-YIELD INFRASTRUCTURE</span>
            <h2 className="anchor-text">Active Assets</h2>
            <div className="portfolio-grid">
              <div className="portfolio-card moving-1">
                <h3>The Logic Plug</h3>
                <p>Universal API fee capture engine.</p>
                <span className="asset-tag">ACTIVE</span>
              </div>
              <div className="portfolio-card moving-2">
                <h3>Cloud Nodes</h3>
                <p>Neutral zone physical data centers.</p>
                <span className="asset-tag">PHYSICAL</span>
              </div>
            </div>
          </div>
        );

      case 'investors':
        return (
          <div className="section-wrap floating-card">
            <h2 className="anchor-text">Secure Allocation</h2>
            {status === 'success' ? (
              <div className="success-msg">
                <h2 style={{color: 'var(--gold)'}}>TRANSMISSION LOGGED</h2>
                <p>Your entry is secured in the Sovereign Ledger.</p>
              </div>
            ) : (
              <>
                <div className="gateway-choice" style={{marginBottom: '20px'}}>
                  <div className="choice-box">
                    <h4>Sovereign Individual</h4>
                    <p>Acquire $STAR utility fuel immediately.</p>
                  </div>
                </div>
                <form className="sovereign-form" onSubmit={handleFormSubmit}>
                  <input name="Name" type="text" placeholder="FULL NAME / ENTITY" required />
                  <input name="Email" type="email" placeholder="ENCRYPTED EMAIL" required />
                  <input name="Wallet" type="text" placeholder="WALLET ADDRESS" required />
                  <input name="Allocation" type="number" placeholder="CONTRIBUTION (USD)" required />
                  <input name="Hash" type="text" placeholder="TX HASH (OPTIONAL)" />
                  <div className="risk-notice">
                    <p>Risk is total. 100M Fixed Supply. Finalize protocol entry below.</p>
                  </div>
                  <button type="submit" className="spectacular-btn">
                    {status === 'loading' ? 'LOGGING...' : 'INITIALIZE'}
                  </button>
                </form>
              </>
            )}
            <div className="wallet-reveal">
              <div className="wallet-box"><span>BITCOIN (BTC)</span><code>bc1q5cjn0ksznv5lx64vx0k44csent4uuhknkdqn9f</code></div>
              <div className="wallet-box"><span>ETH / USDC</span><code>0x71f3BFe473C4DC9712fE028D085742d47d4b2C1a</code></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="hero-slider floating-card">
            <SovereignEmblem />
            <h1 className="main-logo-text">ASTRANOVARA</h1>
            <p className="hero-subtitle">UNIVERSAL LOGIC • 100M SUPPLY</p>
            <div className="live-ticker-panel">
              <div className="ticker-item"><span className="label">PULSES</span><span className="value">{pulses.toLocaleString()}</span></div>
              <div className="ticker-item"><span className="label">YIELD</span><span className="value gold-text">${profit.toFixed(2)}</span></div>
            </div>
            <Link to="/investors" className="spectacular-btn" style={{textDecoration:'none'}}>SECURE POSITION</Link>
            <p style={{marginTop:'25px', fontWeight:'800', color:'#ff4d4d', letterSpacing: '2px', fontSize: '0.7rem'}}>Scale Round 1 Closes: May 17, 2026</p>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="nav-logo">ASTRANOVARA</Link>
        <div className="nav-links">
          <Link to="/"><HomeIcon />HOME</Link>
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