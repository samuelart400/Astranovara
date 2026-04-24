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
  const [txLog, setTxLog] = useState('INITIALIZING...');
 
  useEffect(() => {
    const interval = setInterval(() => {
      setPulses(prev => prev + Math.floor(Math.random() * 3));
      setProfit(prev => prev + (Math.random() * 0.05));
      setTxLog(`> ${Math.random().toString(36).substring(7).toUpperCase()}: $${(Math.random()*100).toFixed(2)} CAPTURED`);
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
 
  const launchDate = new Date("2026-04-18");
  const today = new Date();
  const diffInDays = Math.floor((today - launchDate) / (1000 * 60 * 60 * 24));
  let currentPrice;
 
  if (diffInDays <= 14) {
    currentPrice = 0.14;
  } else if (diffInDays <= 25) {
    currentPrice = 0.22;
  } else {
    currentPrice = 0.35;
  }
 
  const renderContent = () => {
    switch (section) {
      case 'about':
        return (
          <div className="section-wrap">
            <span className="section-title">CORPORATE SYNOPSIS</span>
            <h2 className="anchor-text">The Astranovara Mandate</h2>
            <p className="story-text"><strong>Founder-Market Fit & Edge:</strong> Astranovara replaces legacy fragmented logistics with a proprietary logic layer. Our competitive advantage is our unique high-throughput data sovereign pipeline, which provides a sub-millisecond engineering edge over traditional systems.</p>
            <div className="mission-grid">
              <div className="manifesto-item"><h3>Procurement Logic</h3><p>Optimized tracking for all incoming and outgoing supply chain assets.</p></div>
              <div className="manifesto-item"><h3>Logistics Backbone</h3><p>Integrating robust ledger management to ensure zero-friction clearance.</p></div>
              <div className="manifesto-item"><h3>Operational Flow</h3><p>Real-time synchronization of inventory data across all internal nodes.</p></div>
              <div className="manifesto-item"><h3>Hard Assets</h3><p>Triple-redundant data centers in sovereign jurisdictions. Permanent, immutable, verified.</p></div>
            </div>
          </div>
        );
 
      case 'portfolio':
        return (
          <div className="section-wrap">
            <span className="section-title">ACTIVE INFRASTRUCTURE</span>
            <h2 className="anchor-text">The Astranovara Mesh</h2>
            
            <div style={{marginBottom: '30px', textAlign: 'center'}}>
              <a href="/Astranovara_Manifesto.pdf" target="_blank" rel="noopener noreferrer" className="spectacular-btn" style={{textDecoration: 'none', padding: '10px 20px', display: 'inline-block'}}>
                DOWNLOAD STRATEGIC BLUEPRINT
              </a>
            </div>
 
            <div className="portfolio-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '30px'}}>
              <div className="portfolio-card" style={{background: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
                <h3 style={{color: 'var(--blue)', fontSize: '1.2rem', marginBottom: '10px'}}>Ledger Control</h3>
                <p style={{fontSize: '0.85rem', color: '#666', lineHeight: '1.6'}}>Proven Module: Automated trial balance and depreciation engine currently live.</p>
                <div style={{marginTop: '15px', background: '#000', padding: '10px', borderRadius: '4px'}}>
                  <div style={{fontSize: '0.6rem', color: '#00ff41', marginBottom: '5px'}}>TRANSACTION LOG:</div>
                  <div style={{color: '#fff', fontSize: '0.7rem', fontFamily: 'monospace'}}>{txLog}</div>
                </div>
              </div>
              <div className="portfolio-card" style={{background: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
                <h3 style={{color: 'var(--blue)', fontSize: '1.2rem', marginBottom: '10px'}}>Route Mapping</h3>
                <p style={{fontSize: '0.85rem', color: '#666', lineHeight: '1.6'}}>Proven Module: End-to-end shipment visualization for global procurement nodes.</p>
                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="asset-tag" style={{background: '#555', color: 'white', padding: '5px 10px', fontSize: '0.6rem', borderRadius: '4px', fontWeight: 'bold'}}>HARD ASSET</span>
                  <span style={{color: '#888', fontSize: '0.8rem'}}>98% CAPACITY</span>
                </div>
              </div>
              <div className="portfolio-card" style={{background: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
                <h3 style={{color: 'var(--blue)', fontSize: '1.2rem', marginBottom: '10px'}}>Systemic Buffer</h3>
                <p style={{fontSize: '0.85rem', color: '#666', lineHeight: '1.6'}}>Secured 30,000,000 $STAR reserve, irrevocably locked to ensure protocol equilibrium.</p>
                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="asset-tag" style={{background: '#dcdcdc', color: '#555', padding: '5px 10px', fontSize: '0.6rem', borderRadius: '4px', fontWeight: 'bold'}}>SECURED</span>
                  <span style={{color: '#888', fontSize: '0.8rem'}}>LOCKED</span>
                </div>
              </div>
            </div>
          </div>
        );
 
      case 'investors':
        return (
          <div className="section-wrap">
            <h2 className="anchor-text">Protocol Enrollment</h2>
            <div className="protocol-notice" style={{background: '#e3f2fd', border: '1px solid #bbdefb', padding: '15px', borderRadius: '4px', marginBottom: '30px', fontSize: '0.8rem', color: '#0d47a1', fontWeight: '700', textAlign: 'center'}}>
              PROTOCOL NOTICE: ASTRANOVARA WELCOMES PARTICIPATION FROM BOTH INSTITUTIONAL PARTNERS AND INDIVIDUAL CONTRIBUTORS.
            </div>
 
            {status === 'success' ? (
              <div className="success-msg" style={{textAlign: 'center', padding: '40px 0'}}>
                <h2 style={{color: 'var(--gold)', letterSpacing: '4px', fontSize: '2.5rem'}}>THANK YOU</h2>
                <p style={{textTransform: 'uppercase', fontWeight: '800', color: 'var(--blue)'}}>Contribution recorded in the Sovereign Ledger</p>
                <button onClick={() => setStatus('idle')} className="spectacular-btn" style={{maxWidth: '200px', marginTop: '30px', padding: '12px'}}>NEW ENTRY</button>
              </div>
            ) : (
              <>
                <div className="calculator-box" style={{background: 'var(--blue)', color: 'white', padding: '25px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 15px 30px rgba(0,43,73,0.3)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <span style={{fontSize: '0.7rem', opacity: 0.8, letterSpacing: '1px'}}>CONTRIBUTION (USD)</span>
                      <input type="number" value={calcInput} onChange={(e) => setCalcInput(e.target.value)} style={{background: 'transparent', border: 'none', borderBottom: '2px solid var(--gold)', color: 'white', fontSize: '2rem', fontWeight: '800', width: '150px', outline: 'none', marginTop: '5px'}} />
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <span style={{fontSize: '0.7rem', opacity: 0.8, letterSpacing: '1px'}}>UTILITY ALLOCATION</span>
                      <div style={{fontSize: '2.5rem', fontWeight: '900', color: 'var(--gold)'}}>
                        {Math.floor(calcInput / currentPrice).toLocaleString()}
                        <small style={{fontSize: '1rem', opacity: 0.6}}>$STAR</small>
                      </div>
                    </div>
                  </div>
                </div>
 
                <div className="investor-layout" style={{display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginBottom: '40px'}}>
                  <div className="form-column">
                    <form className="sovereign-form" onSubmit={handleFormSubmit}>
                      <input name="Name" type="text" placeholder="ENTITY OR INDIVIDUAL NAME" required />
                      <input name="Email" type="email" placeholder="EMAIL ADDRESS" required />
                      <input name="Wallet" type="text" placeholder="RECEIVING ADDRESS" required />
                      <input name="Allocation" type="number" value={calcInput} readOnly style={{background: '#f0f0f0', color: '#888'}} />
                      <button type="submit" className="spectacular-btn">{status === 'loading' ? 'PROCESSING...' : 'FINALIZE ALLOCATION'}</button>
                    </form>
                  </div>
                </div>
              </>
            )}
            
            <div style={{marginTop: '40px', padding: '20px', background: '#f9f9f9', fontSize: '0.75rem', color: '#555', border: '1px solid #eee'}}>
              <strong>GENERAL INFORMATION:</strong> Astranovara aims to provide a transparent and accessible framework for all participants. By engaging with this protocol, users acknowledge the dynamic nature of early-stage project development. We recommend that all contributors conduct their own review of our roadmap and objectives before participating.
            </div>
            
            <div className="wallet-reveal">
              <div className="wallet-box" onClick={() => copyToClipboard('bc1q5cjn0ksznv5lx64vx0k44csent4uuhknkdqn9f', 'BTC')} style={{cursor: 'pointer'}}>
                <span>BITCOIN (BTC) - CLICK TO COPY</span>
                <code>bc1q5cjn0ksznv5lx64vx0k44csent4uuhknkdqn9f</code>
              </div>
              <div className="wallet-box" onClick={() => copyToClipboard('0x71f3BFe473C4DC9712fE028D085742d47d4b2C1a', 'ETH')} style={{cursor: 'pointer', marginTop: '10px'}}>
                <span>ETH / USDC (ERC-20) - CLICK TO COPY</span>
                <code>0x71f3BFe473C4DC9712fE028D085742d47d4b2C1a</code>
              </div>
            </div>
          </div>
        );
 
      default:
        return (
          <div className="hero-slider">
            <h1 className="main-logo-text">ASTRANOVARA</h1>
            <p className="hero-subtitle">THE NEURAL INFRASTRUCTURE FOR GLOBAL TRADE</p>
            <div className="live-ticker-panel">
              <div className="ticker-item"><span className="label">GLOBAL FLOW METRICS</span><span className="value">{pulses.toLocaleString()}</span></div>
              <div className="ticker-item"><span className="label">CAPITAL EFFICIENCY (USD)</span><span className="value gold-text">${profit.toFixed(2)}</span></div>
              <div className="ticker-item"><span className="label">DAYS REMAINING</span><span className="value" style={{color: '#ff4d4d'}}>{daysLeft}</span></div>
            </div>
            <Link to="/investors" className="spectacular-btn" style={{textDecoration:'none', maxWidth: '400px', margin: '0 auto'}}>
              INITIALIZE BRIEFING
            </Link>
          </div>
        );
    }
  };
 
  return (
    <div className="app-container">
      <div style={{background: '#1a1a1a', color: '#00ff41', padding: '8px 20px', fontSize: '0.65rem', display: 'flex', justifyContent: 'space-between', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #333'}}>
        <span>CORE INFRASTRUCTURE: <span style={{color: '#fff'}}>DEPLOYED</span></span>
        <span>GLOBAL MESH STATUS: <span style={{color: '#fff'}}>ACTIVATED</span></span>
        <span>NETWORK LATENCY: <span style={{color: '#fff'}}>0.42MS</span></span>
      </div>
      <nav className="navbar">
        <Link to="/" className="nav-logo">ASTRANOVARA</Link>
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/portfolio">PORTFOLIO</Link>
          <Link to="/investors" className="investor-btn">INVESTOR</Link>
        </div>
      </nav>
      <main className="main-stage">{renderContent()}</main>
    </div>
  );
}
 
export default App;