import React from 'react';
import CanonPortalPremierDemo from './components/CanonPortal_PremierDemo';
import GenesisBlock from './components/GenesisBlock';
import BlockCounter from './components/BlockCounter';

import './App.css';
import './components/CanonPortal.css';
import './components/GenesisBlock.css';
import './components/BlockCounter.css';

function App() {
  return (
    <div className="shrine-container">
      <h1 className="shrine-title">🪞 DIGUM Reflective Mode</h1>
      <hr className="shrine-divider" />
      <div className="shrine-text">
        <p><strong>A new <span className="highlight">pair-A-DIGM</span></strong></p>
        <p className="subtext">sounds like paradigm, validates like protocol</p>
        <p className="canon-stamp">🔮 B.I.D.E.T. Canon Engine</p>
      </div>

      <GenesisBlock />
      <BlockCounter />
      <CanonPortalPremierDemo />
    </div>
  );
}

export default App;
