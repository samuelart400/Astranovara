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
    
    // YOUR VERIFIED GOOGLE SCRIPT URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwu3px7wlGoh5rObo3D1pVRaWlnSG6__lte0X-VOy3EYvd1y3-G7GW-ZNUuZmAtrA/exec";

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

  const renderContent = () => {
    switch (section) {
      case 'about':
        return (
          <div className="section-wrap">
            <span className="section-title">THE ARCHITECTURE OF POWER</span>
            <h2 className="anchor-text">Astra (The Reach) + Novara (The Change)</h2>
            <p className="story-text" style={{borderLeftColor: 'var(--gold)', fontStyle: 'italic'}}>
              "To predict the future is to control it. To build the infrastructure of the future is to own it."
            </p>
            <p className="story-text">
              Astranovara is the cold, calculated answer to legacy technical dependence. 
              Born from the necessity of <strong>Sovereign Logic</strong>, we are the first neural 
              backbone that refuses to outshine the master, but instead replaces the master's tools entirely. 
              We are the "New Star"—a fixed point in a chaotic digital sea.
            </p>
            
            <div className="mission-grid">
              <div className="manifesto-item">
                <h3>Sovereign Autonomy</h3>
                <p>We provide the fixed point of logic that foreign powers cannot decommission.</p>
              </div>
              <div className="manifesto-item">
                <h3>Absolute Scarcity</h3>
                <p>100M $STAR. No inflation. No hidden dilution. Pure mathematical control.</p>
              </div>
              <div className="manifesto-item">
                <h3>Dictated Vision</h3>
                <p>One founder, one direction. Stability through centralized leadership and proprietary IP.</p>
              </div>
              <div className="manifesto-item">
                <h3>Neural Liquidity</h3>
                <p>Real-time cross-border settlement for logic-compute costs.</p>
              </div>
              <div className="manifesto-item">
                <h3>Physical Infrastructure</h3>
                <p>Hard-asset nodes deployed in neutral zones for absolute data shielding.</p>
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="section-wrap">
            <span className="section-title">HIGH-YIELD INFRASTRUCTURE</span>
            <h2 className="anchor-text">Assets Worth the Risk.</h2>
            <div className="portfolio-grid">
              <div className="portfolio-card">
                <h3>The Logic Plug v1.0</h3>
                <p>The universal translator for global APIs. It captures a fee from every logic handshake it facilitates.</p>
                <span className="asset-tag">ACTIVE REVENUE</span>
              </div>
              <div className="portfolio-card">
                <h3>Sovereign Cloud Nodes</h3>
                <p>Hard-asset data centers in neutral zones. Physical infrastructure that cannot be "turned off."</p>
                <span className="asset-tag">PHYSICAL ASSET</span>
              </div>
              <div className="portfolio-card">
                <h3>$STAR Fuel Reserves</h3>
                <p>A deflationary asset capped at 100M. Every logic pulse burns fuel, increasing scarcity.</p>
                <span className="asset-tag">DEFLATIONARY</span>
              </div>
            </div>
          </div>
        );

      case 'investors':
        return (
          <div className="section-wrap">
            <span className="section-title">PARTICIPATION GATEWAYS</span>
            <h2 className="anchor-text">Secure Your Allocation.</h2>
            
            {status === 'success' ? (
              <div className="success-msg">
                <h2 style={{color: 'var(--blue)'}}>TRANSMISSION LOGGED</h2>
                <p>Your entry has been recorded in the Sovereign Ledger. Finalize your position via the gateways below.</p>
              </div>
            ) : (
              <>
                <div className="gateway-choice">
                  <div className="choice-box">
                    <h4>Sovereign Individual</h4>
                    <p>Acquire $STAR utility immediately. 100M Fixed Genesis Supply.</p>
                  </div>
                </div>

                <form className="sovereign-form" onSubmit={handleFormSubmit}>
                  <input name="Name" type="text" placeholder="FULL NAME / ENTITY" required />
                  <input name="Email" type="email" placeholder="EMAIL ADDRESS" required />
                  <input name="Wallet" type="text" placeholder="ETHEREUM WALLET ADDRESS" required />
                  <input name="Allocation" type="number" placeholder="CONTRIBUTION (USD)" required />
                  <input name="Hash" type="text" placeholder="TRANSACTION HASH (IF COMPLETED)" />
                  
                  <div className="risk-notice">
                    <p>Risk is total and non-compensated. 100M Fixed Supply. Finalize protocol entry below.</p>
                  </div>
                  
                  <button type="submit" className="spectacular-btn">
                    {status === 'loading' ? 'LOGGING TO LEDGER...' : 'GENERATE SECURE GATEWAY'}
                  </button>
                </form>
              </>
            )}

            <div className="wallet-reveal">
              <div className="wallet-box">
                <span>BITCOIN (BTC)</span>
                <code>bc1q5cjn0ksznv5lx64vx0k44csent4uuhknkdqn9f</code>
              </div>
              <div className="wallet-box">
                <span>ETH / USDC (ERC-20)</span>
                <code>0x71f3BFe473C4DC9712fE028D085742d47d4b2C1a</code>
              </div>
            </div>
          </div>
        );

      default: // HOME
        return (
          <div className="hero-slider">
            <div className="slide-content">
              <h1 className="main-logo-text">ASTRANOVARA</h1>
              <p className="hero-subtitle">UNIVERSAL LOGIC • 100M $STAR SUPPLY</p>
              <div className="live-ticker-panel">
                <div className="ticker-item">
                  <span className="label">LOGIC PULSES</span>
                  <span className="value">{pulses.toLocaleString()}</span>
                </div>
                <div className="ticker-item">
                  <span className="label">EST. YIELD (USD)</span>
                  <span className="value gold-text">${profit.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/investors" className="spectacular-btn" style={{textDecoration:'none'}}>SECURE ALLOCATION</Link>
              <p style={{marginTop:'20px', fontWeight:'800', color:'#d93025', letterSpacing: '2px'}}>Scale Round 1 Closes Strictly: May 17, 2026</p>
            </div>
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