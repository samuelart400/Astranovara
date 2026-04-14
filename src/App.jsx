import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App({ section }) {
  // THE ENGINE: Handles the logic for our sovereign portal
  const renderContent = () => {
    switch (section) {
      case 'about':
        return (
          <div className="section-wrap">
            <h2 className="section-title">Institutional Protocol & Governance</h2>
            <div className="anchor-text">
              <strong>The Strategic Mandate:</strong> Astranovara is a sovereign technology holding entity engineered to solve the "Interoperability Crisis." We provide the <strong>Neural Backbone</strong> for the next trillion-dollar digital economy.
            </div>

            <div className="pillar-grid">
              <div className="pillar-card">
                <h3>Our History</h3>
                <p>Born from elite cybersecurity, Astranovara was built in stealth to eliminate the 60% of human capital lost to "Glue-Code" waste. We own the <strong>Universal Logic Plug</strong>—a sovereign layer for frictionless data movement.</p>
              </div>
              <div className="pillar-card">
                <h3>The 30-Day Capital Sprint</h3>
                <p>We are closing a <strong>$10M Private Seed Round</strong> by May 2026. This is a rolling close. $4M is already allocated; $6M remains for strategic partners who want to own the "Pipes of the Internet."</p>
              </div>
              <div className="pillar-card">
                <h3>Sovereign Governance</h3>
                <p>100% Founder-Owned. We bypass bureaucratic lag to ensure rapid capital deployment. By holding $STAR, you are a stakeholder in the <strong>Neural Liquidity Layer</strong>.</p>
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="section-wrap">
            <h2 className="section-title">Strategic Sovereign Portfolio</h2>
            <p className="anchor-text">Diversified across high-yield digital infrastructure to ensure a $2M monthly net profit floor.</p>
            <div className="portfolio-grid">
              <div className="portfolio-card">
                <h3>Universal Logic Plug</h3>
                <p>The core engine. Connecting global APIs instantly via VSCode. This vertical alone targets $1.2M/mo in Logic Tolls.</p>
              </div>
              <div className="portfolio-card">
                <h3>Neural Liquidity ($STAR)</h3>
                <p>The deflationary fuel. Every logic pulse burns $STAR, increasing scarcity and value for seed participants.</p>
              </div>
              <div className="portfolio-card">
                <h3>Deepfake Defense Mesh</h3>
                <p>Institutional biometric security layer for Tier-1 banking ledgers. Solving the $12B AI-fraud crisis.</p>
              </div>
              <div className="portfolio-card">
                <h3>Sovereign Cloud</h3>
                <p>Private infrastructure for enterprises requiring off-grid data processing. Zero third-party surveillance.</p>
              </div>
            </div>
          </div>
        );

      case 'investors':
        return (
          <div className="section-wrap">
            <h2 className="section-title">Investor Relations</h2>
            <p className="anchor-text">Secure your position in the $10M Seed Round. Astranovara is a private infrastructure play for high-growth digital alpha.</p>
            <div className="wallet-grid">
              <div className="wallet-card">
                <h3>Bitcoin (BTC)</h3>
                <code className="address">bc1q5cjn0ksznv5lx64vx0k44csent4uuhknkdqn9f</code>
              </div>
              <div className="wallet-card">
                <h3>Ethereum (ETH)</h3>
                <code className="address">0x71f3BFe473C4DC9712fE028D085742d47d4b2C1a</code>
              </div>
            </div>
          </div>
        );

      default: // HOME PAGE
        return (
          <div className="hero-slider">
            <div className="slide-content">
              <h1>The Last API Bridge You'll Ever Build</h1>
              <p>Universal Logic. Neural Liquidity. Sovereign Profit.</p>
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
          <Link to="/" className="nav-item home-glow">HOME</Link>
          <Link to="/about" className="nav-item">ABOUT US</Link>
          <Link to="/portfolio" className="nav-item">PORTFOLIO</Link>
          <Link to="/investors" className="nav-item">INVESTORS</Link>
        </div>
      </nav>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;