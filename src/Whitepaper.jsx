import React from 'react';
import { Link } from 'react-router-dom';

export default function Whitepaper() {
  return (
    <div style={{ padding: '40px', color: 'white', background: '#0f172a', minHeight: '100vh' }}>
      <h1>Project Whitepaper</h1>
      <p>The vision and technical roadmap for Astranovara.</p>
      <Link to="/" style={{ color: '#38bdf8' }}>← Back to Dashboard</Link>
    </div>
  );
}