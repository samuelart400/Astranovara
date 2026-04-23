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
  let currentPrice, phaseName, nextPrice, progressWidth, daysUntilNext;
 
  if (diffInDays <= 14) {
    currentPrice = 0.14; phaseName = "PHASE 0: GENESIS"; nextPrice = 0.22;
    progressWidth = (diffInDays / 14) * 100; daysUntilNext = 14 - diffInDays;
  } else if (diffInDays <= 25) {
    currentPrice = 0.22; phaseName = "PHASE 1: GROWTH"; nextPrice = 0.35;
    progressWidth = ((diffInDays - 14) / 11) * 100; daysUntilNext = 25 - diffInDays;
  } else {
    currentPrice = 0.35; phaseName = "PHASE 2: FINALITY"; nextPrice = "LOCKED";
    progressWidth = 100; daysUntilNext = 30 - diffInDays;
  }
 
  const renderContent = () => {
    switch (section) {
      case 'about':
        return (
          <div className="section-wrap">
            <span className="section-title">CORPORATE SYNOPSIS</span>
            <h2 className="anchor-text">The Astranovara Mandate</h2>
            <p className="story-text"><strong>The Goal:</strong> 10M USD Liquidity Capture. Establishing a universal "Neutral Zone" logic network to replace fragile, dependent infrastructures.</p>
            <div className="mission-grid">
              <div className="manifesto-item"><h3>Systemic Priority</h3><p>Neutral zone nodes ensure your infrastructure is sovereign and permanent.</p></div>
              <div className="manifesto-item"><h3>Genesis Supply</h3><p>Fixed 100M $STAR. 70M allocated to early liquidity providers.</p></div>
              <div className="manifesto-item"><h3>Logic Integration</h3><p>Silent API pulse capture for global transaction flow.</p></div>
              <div className="manifesto-item"><h3>Hard Assets</h3><p>Physical data centers in offshore jurisdictions. Real-world resilience.</p></div>
            </div>
          </div>
        );
 
      case 'portfolio':
        return (
          <div className="section-wrap">
            <span className="section-title">ACTIVE INFRASTRUCTURE</span>
            <h2 className="anchor-text">Yield Assets</h2>
            
            {/* Added PDF Link Section */}
            <div style={{marginBottom: '30px', textAlign: 'center'}}>
              <a href="/Astranovara_Manifesto.pdf" target="_blank" rel="noopener noreferrer" 
                 className="spectacular-btn" 
                 style={{textDecoration: 'none', padding: '10px 20px', display: 'inline-block'}}>
                 DOWNLOAD OFFICIAL MANIFESTO (PDF)
              </a>
            </div>

            <div className="portfolio-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '30px'}}>
              <div className="portfolio-card" style={{background: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
                <h3 style={{color: 'var(--blue)', fontSize: '1.2rem', marginBottom: '10px'}}>The Logic Plug</h3>
                <p style={{fontSize: '0.85rem', color: '#666', lineHeight: '1.6'}}>Universal API fee capture engine. Intercepts micro-fees across global cross-border transmissions.</p>
                <div style={{marginTop: '15px', background: '#000', padding: '10px', borderRadius: '4px'}}>
                  <div style={{fontSize: '0.6rem', color: '#00ff41', marginBottom: '5px'}}>LIVE TRANSACTION FEED:</div>
                  <div style={{color: '#fff', fontSize: '0.7rem', fontFamily: 'monospace'}}>{txLog}</div>
                </div>
                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="asset-tag" style={{background: 'var(--blue)', color: 'white', padding: '5px 10px', fontSize: '0.6rem', borderRadius: '4px', fontWeight: 'bold'}}>ACTIVE REVENUE</span>
                  <span style={{color: 'var(--gold)', fontWeight: 'bold', fontSize: '0.8rem'}}>+14.2% YIELD</span>
                </div>
              </div>
              <div className="portfolio-card" style={{background: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
                <h3 style={{color: 'var(--blue)', fontSize: '1.2rem', marginBottom: '10px'}}>Sovereign Nodes</h3>
                <p style={{fontSize: '0.85rem', color: '#666', lineHeight: '1.6'}}>Physical hardware clusters in offshore jurisdictions. Provides the "Logic" backbone for the network.</p>
                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="asset-tag" style={{background: '#555', color: 'white', padding: '5px 10px', fontSize: '0.6rem', borderRadius: '4px', fontWeight: 'bold'}}>HARD ASSET</span>
                  <span style={{color: '#888', fontSize: '0.8rem'}}>98% CAPACITY</span>
                </div>
              </div>
              <div className="portfolio-card" style={{background: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
                <h3 style={{color: 'var(--blue)', fontSize: '1.2rem', marginBottom: '10px'}}>Stability Vault</h3>
                <p style={{fontSize: '0.85rem', color: '#666', lineHeight: '1.6'}}>A 30,000,000 $STAR buffer designed to maintain protocol equilibrium and absorb market volatility.</p>
                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className="asset-tag" style={{background: '#dcdcdc', color: '#555', padding: '5px 10px', fontSize: '0.6rem', borderRadius: '4px', fontWeight: 'bold'}}>SYSTEMIC BUFFER</span>
                  <span style={{color: '#888', fontSize: '0.8rem'}}>LOCKED</span>
                </div>
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
                <p style={{textTransform: 'uppercase', fontWeight: '800', color: 'var(--blue)'}}>Transmission secured in the Sovereign Ledger</p>
                <button onClick={() => setStatus('idle')} className="spectacular-btn" style={{maxWidth: '200px', marginTop: '30px', padding: '12px'}}>NEW ENTRY</button>
              </div>
            ) : (
              <>
                <div className="calculator-box" style={{background: 'var(--blue)', color: 'white', padding: '25px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 15px 30px rgba(0,43,73,0.3)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <span style={{fontSize: '0.7rem', opacity: 0.8, letterSpacing: '1px'}}>ALLOCATION (USD)</span>
                      <input type="number" value={calcInput} onChange={(e) => setCalcInput(e.target.value)} style={{background: 'transparent', border: 'none', borderBottom: '2px solid var(--gold)', color: 'white', fontSize: '2rem', fontWeight: '800', width: '150px', outline: 'none', marginTop: '5px'}} />
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <span style={{fontSize: '0.7rem', opacity: 0.8, letterSpacing: '1px'}}>ESTIMATED STAR FUEL</span>
                      <div style={{fontSize: '2.5rem', fontWeight: '900', color: 'var(--gold)'}}>
                        {Math.floor(calcInput / currentPrice).toLocaleString()}
                        <small style={{fontSize: '1rem', opacity: 0.6}}>$STAR</small>
                      </div>
                    </div>
                  </div>
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
 
                <div className="risk-disclosure" style={{background: '#fff0f0', padding: '20px', borderRadius: '8px', border: '1px solid #ffcccc', marginBottom: '40px'}}>
                  <h4 style={{color: '#cc0000', marginBottom: '10px', fontSize: '0.9rem'}}>RISK DISCLOSURE</h4>
                  <p style={{fontSize: '0.75rem', color: '#666', lineHeight: '1.6'}}>
                    Participation in early-stage protocol infrastructure involves a high degree of risk, including the potential loss of the entire principal contribution. 
                    Astranovara is an experimental financial technology venture. Past performance or simulated market metrics (such as "Logic Pulses" or "Yield") are 
                    for demonstrative purposes only and do not guarantee future results. There is no assurance of token appreciation, liquidity, or regulatory 
                    compliance in all jurisdictions. By proceeding, you acknowledge that you have conducted your own due diligence and assume full responsibility 
                    for your financial decisions.
                  </p>
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
            <h1 className="main-logo-text">ASTRANOVARA</h1>
            <p className="hero-subtitle">UNIVERSAL LOGIC • 100M SUPPLY</p>
            <div className="live-ticker-panel">
              <div className="ticker-item"><span className="label">LOGIC PULSES</span><span className="value">{pulses.toLocaleString()}</span></div>
              <div className="ticker-item"><span className="label">YIELD (USD)</span><span className="value gold-text">${profit.toFixed(2)}</span></div>
              <div className="ticker-item"><span className="label">DAYS REMAINING</span><span className="value" style={{color: '#ff4d4d'}}>{daysLeft}</span></div>
            </div>
            <Link to="/investors" className="spectacular-btn" style={{textDecoration:'none', maxWidth: '400px', margin: '0 auto'}}>
              SECURE GENESIS SLOT
            </Link>
          </div>
        );
    }
  };
 
  return (
    <div className="app-container">
      <div style={{background: '#1a1a1a', color: '#00ff41', padding: '8px 20px', fontSize: '0.65rem', display: 'flex', justifyContent: 'space-between', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #333'}}>
        <span>NODE CLUSTER: <span style={{color: '#fff'}}>ONLINE</span></span>
        <span>SYNC STATUS: <span style={{color: '#fff'}}>SYNCHRONIZED</span></span>
        <span>PULSE LATENCY: <span style={{color: '#fff'}}>0.42MS</span></span>
      </div>
      <nav className="navbar">
        <Link to="/" className="nav-logo">ASTRANOVARA</Link>
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/portfolio">PORTFOLIO</Link>
          <Link to="/investors" className="investor-btn">INVESTORS</Link>
        </div>
      </nav>
      <main className="main-stage">{renderContent()}</main>
    </div>
  );
}
 
export default App;