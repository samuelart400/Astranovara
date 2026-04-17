import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App({ section }) {
  // --- CORE ENGINE STATE ---
  const [profit, setProfit] = useState(0.00);
  const [pulses, setPulses] = useState(0);
  const [formData, setFormData] = useState({ 
    name: '', email: '', telegram: '', allocation: '', walletAddress: '' 
  });
  const [status, setStatus] = useState('idle');

  // Logic Pulse Simulator (The "Heartbeat")
  useEffect(() => {
    const interval = setInterval(() => {
      setPulses(prev => prev + Math.floor(Math.random() * 3));
      setProfit(prev => prev + (Math.random() * 0.05));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // YOUR GOOGLE SCRIPT GATEWAY
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxa5aRn6U02dluhR7cIaKG8D0XyPLhIHrDdaY5RuKn1jm0tFtTJdULABemlPAXAu1yd/exec";
    
    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setStatus('success');
    } catch (error) {
      console.error("Transmission Error:", error);
      setStatus('idle');
    }
  };

  const renderContent = () => {
    switch (section) {
      case 'about':
        return (
          <div className="section-wrap">
            <span className="section-title">Institutional Protocol</span>
            <h2 className="anchor-text">Infrastructure for the <strong>Sovereign Tech Economy.</strong></h2>
            <div className="manifesto-list">
              <div className="manifesto-item">
                <span className="item-num">01</span>
                <div className="item-content">
                  <h3>Universal Logic</h3>
                  <p>Eliminating glue-code waste by connecting global APIs through a single neural backbone. We provide the "Logic Plug" for the future of enterprise data.</p>
                </div>
              </div>
              <div className="manifesto-item">
                <span className="item-num">02</span>
                <div className="item-content">
                  <h3>$STAR Utility</h3>
                  <p>A deflationary utility token consumed by every logic pulse across the network. Built for high-frequency institutional settlement.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="section-wrap">
            <span className="section-title">The Assets</span>
            <h2 className="anchor-text">Engineering <strong>Sovereign Yield</strong> through global data flow.</h2>
            <div className="manifesto-list">
              <div className="manifesto-item">
                <h3>Logic Plug v1.0</h3>
                <p>The universal adapter for enterprise data integration. Currently in Alpha pilot phase.</p>
              </div>
              <div className="manifesto-item">
                <h3>Sovereign Cloud</h3>
                <p>Private, zero-surveillance hosting nodes for high-security entities in emerging markets.</p>
              </div>
            </div>
          </div>
        );

      case 'investors':
        return (
          <div className="section-wrap">
            <span className="section-title">Institutional Participation</span>
            <h2 className="anchor-text">The Astranovara Seed Round is <strong>Live.</strong> Acquire $STAR utility via Sovereign Gateways.</h2>
            
            {/* 2026 MANDATORY REGULATORY DISCLOSURE */}
            <div className="status-box" style={{borderLeft: '4px solid var(--centum-gold)', background: '#fcfaf5', marginBottom: '40px', padding: '20px'}}>
              <h4 style={{color: 'var(--centum-blue)', fontSize: '0.9rem', marginBottom: '10px', fontWeight: '800'}}>MANDATORY RISK DISCLOSURE (V.2026.4)</h4>
              <ol style={{fontSize: '0.8rem', opacity: 0.8, lineHeight: '1.4', paddingLeft: '15px', color: '#333'}}>
                <li><strong>Utility Only:</strong> $STAR is a functional tool for logic consumption and carries no equity rights or profit guarantees.</li>
                <li><strong>Jurisdiction:</strong> Restricted to professional participants. USA and sanctioned region residents are strictly prohibited.</li>
                <li><strong>Capital Risk:</strong> Protocol is in active development. Performance metrics are simulations of current Alpha network capacity.</li>
              </ol>
            </div>

            {status === 'success' ? (
              <div className="status-box" style={{textAlign: 'center', padding: '40px'}}>
                <h3 style={{color: 'var(--centum-gold)', marginBottom: '15px'}}>TRANSMISSION VERIFIED</h3>
                <p>Your allocation request has been logged to the ledger. You may now proceed with the contribution via the secure gateways below.</p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="sovereign-form">
                  <div className="form-group" style={{display: 'flex', gap: '15px'}}>
                    <input type="text" placeholder="PARTICIPANT NAME" required style={{flex: 1}} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <input type="email" placeholder="SECURE EMAIL" required style={{flex: 1}} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group" style={{display: 'flex', gap: '15px'}}>
                    <input type="text" placeholder="TELEGRAM / SIGNAL" required style={{flex: 1}} onChange={(e) => setFormData({...formData, telegram: e.target.value})} />
                    <input type="number" placeholder="CONTRIBUTION (USD VALUE)" required style={{flex: 1}} onChange={(e) => setFormData({...formData, allocation: e.target.value})} />
                  </div>
                  <input type="text" placeholder="RECEIVING WALLET (ERC-20 / POLYGON)" required onChange={(e) => setFormData({...formData, walletAddress: e.target.value})} />
                  <button type="submit" className="spectacular-btn" style={{width: '100%'}} disabled={status === 'loading'}>
                    {status === 'loading' ? "LOGGING TRANSACTION..." : "GENERATE SECURE GATEWAYS"}
                  </button>
                </form>

                <div className="manifesto-list" style={{marginTop: '60px'}}>
                  <div className="manifesto-item">
                    <span className="item-num">GATEWAY 01</span>
                    <div className="item-content">
                      <h3>Bitcoin (BTC)</h3>
                      <p>Institutional proxy for high-value settlement.</p>
                      <code className="wallet-address">bc1q5cjn0ksznv5lx64vx0k44csent4uuhknkdqn9f</code>
                    </div>
                  </div>
                  <div className="manifesto-item">
                    <span className="item-num">GATEWAY 02</span>
                    <div className="item-content">
                      <h3>Ethereum (ETH/USDC)</h3>
                      <p>Supports ETH and Stablecoins (USDC/USDT).</p>
                      <code className="wallet-address">0x71f3BFe473C4DC9712fE028D085742d47d4b2C1a</code>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      default:
        return (
          <div className="hero-slider">
            <div className="slide-content">
              <h1>The Last API Bridge You'll Ever Build</h1>
              <p className="hero-subtitle">UNIVERSAL LOGIC • NEURAL LIQUIDITY • SOVEREIGN PROFIT</p>
              
              <div className="live-ticker-panel">
                <div className="ticker-item">
                  <span className="label">LOGIC PULSES</span>
                  <span className="value">{pulses.toLocaleString()}</span>
                </div>
                <div className="ticker-item">
                  <span className="label">EST. REVENUE (USD)</span>
                  <span className="value gold-text">${profit.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/about" className="spectacular-btn">ENTER THE FORTRESS</Link>
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
          <Link to="/" className="nav-item">HOME</Link>
          <Link to="/about" className="nav-item">ABOUT</Link>
          <Link to="/portfolio" className="nav-item">PORTFOLIO</Link>
          <Link to="/investors" className="nav-item investor-btn">INVESTORS</Link>
        </div>
      </nav>
      <main style={{paddingTop: '120px', minHeight: '100vh', paddingLeft: '5%', paddingRight: '5%'}}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;