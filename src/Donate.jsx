import React from 'react';
import { Link } from 'react-router-dom';

export default function Donate() {
  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="logo">Astranovara</div>
        <Link to="/" className="nav-item">← BACK TO HOME</Link>
      </nav>
      
      <div className="donation-container" style={{ padding: '80px 10%', textAlign: 'center' }}>
        <h1 style={{ color: '#002245' }}>Support the Astranovara Vision</h1>
        <p style={{ maxWidth: '700px', margin: '20px auto', color: '#64748b' }}>
          We are currently raising <strong>$10 Million</strong> to accelerate our technology roadmap. 
          Your contribution fuels innovation, job creation, and digital transformation.
        </p>
        
        <div className="funding-card" style={{ background: '#f8fafc', padding: '40px', borderRadius: '8px', border: '1px solid #EEAC31', maxWidth: '500px', margin: '40px auto' }}>
          <h3>Strategic Funding Portal</h3>
          <p>Please select your contribution type:</p>
          <button className="gold-button">Institutional Investment</button>
          <button className="gold-button" style={{ marginTop: '10px', background: '#002245', color: 'white' }}>General Contribution</button>
        </div>
      </div>
    </div>
  );
}