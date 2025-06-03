import React from 'react';
import KioskBackground from './components/KioskBackground';
import './App.css'; // (we'll define this below)

function App() {
  return (
    <>
      <KioskBackground />
      <div className="shrine-container">
        <h1 className="shrine-title">💠 DIGUM Reflective Mode Activated</h1>
        <hr className="shrine-divider" />
        <div className="shrine-text">
          <p><strong>A new <span className="highlight">pair-A-DIGUM</span></strong></p>
          <p className="subtext">sounds like paradigm, validates like a paradox.</p>
          <p className="canon-stamp">– 🧠 B.I.D.E.T. Canon Engine [Y3K Edition]</p>
        </div>
      </div>
    </>
  );
}

export default App;