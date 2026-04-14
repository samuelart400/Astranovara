import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivateRound() {
  return (
    <div style={{ padding: '50px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Link to="/" style={{ color: '#003366', fontWeight: 'bold' }}>← Back to Overview</Link>
      <h1 style={{ color: '#003366', marginTop: '20px' }}>Private Round</h1>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', marginTop: '20px' }}>
        <h3>Equity Details</h3>
        <p>This is where your investment tiers and tokenomics will go.</p>
      </div>
    </div>
  );
}