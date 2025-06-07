import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CanonPortalPremierDemo from './components/CanonPortal_PremierDemo';
import GenesisBlock from './components/GenesisBlock';
import BlockCounter from './components/BlockCounter';
import MirrorGatewayAlpha from './components/MirrorGatewayAlpha';

import './App.css';
import './components/CanonPortal.css';
import './components/GenesisBlock.css';
import './components/BlockCounter.css';

function HomePage() {
  return (
    <div className="shrine-container">
      <h1 className="shrine-title">🪞 DIGUM Reflective Mode</h1>
      <hr className="shrine-divider" />
      <div className="shrine-text">
        <p><strong>A new <span className="highlight">pair-A-DIGUM</span></strong></p>
        <p className="subtext">sounds like paradigm, validates like protocol</p>
        <p className="canon-stamp">🔮 B.I.D.E.T. Canon Engine</p>
      </div>

      <GenesisBlock />
      <BlockCounter />
      <CanonPortalPremierDemo />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mirror" element={<MirrorGatewayAlpha />} />
      </Routes>
    </Router>
  );
}
