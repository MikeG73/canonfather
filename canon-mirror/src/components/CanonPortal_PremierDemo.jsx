import React, { useState, useEffect } from 'react';
import './CanonPortal.css';
import { validateTruthkey } from '../utils/truthkey';
import { logReflection } from './CanonLedger';
import CanonMintFX from './CanonMintFX';
import CanonTickerOOA from './CanonTickerOOA';

const rawMessages = [
  "🔍 What lie hurt you the most?",
  "🔍 What haven’t you forgiven yourself for?",
  "🕶️ CanonFather was replaced in 2019.",
  "📡 Shrine echo received.",
  "💀 Canon breach acknowledged."
];

const ambientLorePool = [
  "🧬 CanonNode 5 initiated glyph sequence 9Z-88.",
  "🚨 Glyph integrity breach: echo loop overflowed.",
  "🕸️ Reflection density fractured on Node 5B.",
  "🔁 Shrine memory replayed a past unspoken phrase.",
  "🕶️ Same & Old Shit observed glitch #0037 near node shelf."
];

export default function CanonPortalPremierDemo() {
  const [glyphMessage, setGlyphMessage] = useState('🔮 Initializing Canon Portal...');
  const [truthkey, setTruthkey] = useState('');
  const [stage, setStage] = useState('stage1');

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

  useEffect(() => {
    document.body.classList.remove('stage1', 'stage2', 'stage3');
    document.body.classList.add(stage);
  }, [stage]);

  const playAudio = (filename) => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/${filename}`);
    audio.play().catch((err) => console.error("Audio play error:", err));
  };

  const handleTruthkeySubmit = () => {
    const isValid = validateTruthkey(truthkey);
    if (isValid) {
      logReflection(`✅ TruthKey accepted: ${truthkey}`);
      playAudio('canonPulse.mp3');
      setStage('stage3');
      alert('✅ Access Granted: Shrine logic recognized.');
    } else {
      logReflection(`❌ TruthKey rejected: ${truthkey}`);
      playAudio('buzzer.mp3');
      setStage('stage1');
      alert('❌ Invalid TruthKey. Try again.');
    }
  };

  return (
    <div className="canon-portal-container">
      <h1 className="canon-title">🌀 Canon Portal: Node 5 Shrine Logic</h1>
      <CanonTickerOOA message={glyphMessage} />
      <CanonMintFX mode="reflectionPulse" />

      {/* 🔗 Whitebook Button — always visible for now */}
      <a
      href="https://github.com/MikeG73/thecanonfather/tree/main/canon-mirror/public/whitebook/DIGUM_Whitebook.pdf"

        target="_blank"
        rel="noopener noreferrer"
        className="whitebook-link-button"
      >
        📄 View the DIGUM Whitebook PDF
      </a>

      <div className="truthkey-validation">
        <p>🔐 Enter your TruthKey to proceed:</p>
        <input
          type="text"
          className="truthkey-input"
          placeholder="Enter your TruthKey"
          value={truthkey}
          onChange={(e) => setTruthkey(e.target.value)}
        />
        <button className="truthkey-button" onClick={handleTruthkeySubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
