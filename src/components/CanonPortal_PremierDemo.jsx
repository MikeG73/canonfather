import React, { useState, useEffect } from 'react';
import './CanonPortal.css';

// ✅ PREVENT WARNINGS WHILE KEEPING FUTURE LOGIC ALIVE
// eslint-disable-next-line no-unused-vars
import { validateTruthkey } from '../utils/truthkey';
// eslint-disable-next-line no-unused-vars
import { logReflection } from './CanonLedger';

import CanonMintFX from './CanonMintFX';
import CanonTickerOOA from './CanonTickerOOA';

const rawMessages = [ /* ✅ Used */ ];
const ambientLorePool = [ /* ✅ Used */ ];

export default function CanonPortalPremierDemo() {
  const [glyphMessage, setGlyphMessage] = useState('🔮 Initializing Canon Portal...');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      const raw = rawMessages[i % rawMessages.length];
      const lore = ambientLorePool[(i + 2) % ambientLorePool.length];
      setGlyphMessage(`${raw} \n${lore}`);
      i++;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="canon-portal-container">
      <h1 className="canon-title">🌀 Canon Portal: Node 5 Shrine Logic</h1>
      <CanonTickerOOA message={glyphMessage} />
      <CanonMintFX mode="reflectionPulse" />
      <div className="truthkey-validation">
        <p>🔐 Enter your TruthKey to proceed:</p>
        {/* Placeholder for future logic */}
      </div>
    </div>
  );
}
