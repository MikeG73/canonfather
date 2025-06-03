// CanonPortal.jsx
import React, { useState } from 'react';
import './CanonPortal.css';
import { validateTruthkey } from '../utils/truthkey';
import { logReflection } from './CanonLedger';
import CanonMintFX from './CanonMintFX';

export default function CanonPortal() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [canonPoints, setCanonPoints] = useState(0);
  const [mintTriggered, setMintTriggered] = useState(false);

  const handleReflect = () => {
    const isValid = validateTruthkey(input);
    const pointsEarned = isValid ? 10 : 0;

    logReflection(input, isValid, pointsEarned);

    if (isValid) {
      setResponse('🌀 DIGUM recognized. Mint sequence accepted.');
      setCanonPoints(prev => prev + pointsEarned);
      setMintTriggered(true);
      setTimeout(() => setMintTriggered(false), 1200);
    } else {
      setResponse('🧪 Reflection noted. Canon not activated.');
    }

    setInput('');
  };

  return (
    <div className="portal-container">
      <CanonMintFX trigger={mintTriggered} />
      <div className="portal-title">CanonFather Shrine Interface</div>
      <input
        className="portal-input"
        type="text"
        value={input}
        placeholder="Speak your reflection..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="portal-button" onClick={handleReflect}>
        Reflect
      </button>
      {response && <div className="portal-response">{response}</div>}
      <div className="canon-footer">
        <span>Canon Points: {canonPoints}</span>
        <span>Avatar: 🧵</span>
      </div>
    </div>
  );
}
