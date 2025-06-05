import React from 'react';

// Canon Engine Modules
import CanonPortalPremierDemo from './components/CanonPortal_PremierDemo';
import CanonMintFX from './components/CanonMintFX';
import CanonTickerOOA from './components/CanonTickerOOA';
import CanonReflectionEngine from './components/CanonReflectionEngine';
import VaultViewer from './components/VaultViewer';
import GenesisBlock from './components/GenesisBlock';
import BlockCounter from './components/BlockCounter';

// Optional/Support Modules (can toggle as needed)
import DigumHUD from './components/DigumHUD';
import GlyphUnderstream from './components/GlyphUnderstream';
import MirrorGatewayAlpha from './components/MirrorGatewayAlpha';
import KioskBackground from './components/KioskBackground';
import Reflector from './components/Reflector';

// Stylesheets
import './App.css';
import './components/CanonPortal.css';
import './components/CanonReflectionEngine.css';
import './components/VaultViewer.css';
import './components/GenesisBlock.css';
import './components/BlockCounter.css';
import './components/DigumHUD.css';
import './components/GlyphUnderstream.css';
import './components/shrineMotion.css';

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

      {/* Canon Infrastructure */}
      <GenesisBlock />
      <BlockCounter />
      <CanonPortalPremierDemo />
      <CanonMintFX />
      <CanonTickerOOA />
      <CanonReflectionEngine />
      <VaultViewer />

      {/* Optional Visual/Diagnostic Layers */}
      <DigumHUD />
      <GlyphUnderstream />
      <MirrorGatewayAlpha />
      <KioskBackground />
      <Reflector />
    </div>
  );
}

export default App;
