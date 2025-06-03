// CanonPortal.jsx — Shrine Response + busted.mp3 logic
import React, { useState, useEffect } from 'react';
import './CanonPortal.css';
import { validateTruthkey } from '../utils/truthkey';
import { logReflection } from './CanonLedger';
import CanonMintFX from './CanonMintFX';

function validateReflectionMeaning(text) {
  const cleaned = text.trim();
  const wordCount = cleaned.split(/\s+/).length;
  const nonsensePattern = /^(?:[asdfjkl;]+|[a-z]{1,2}\d{3,}|[!@#$%^&*()_+\-=\\[\]{};':"|,.<>/?]{5,})$/i;
  return cleaned.length > 10 && wordCount >= 3 && !nonsensePattern.test(cleaned);
}

export default function CanonPortal() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [canonPoints, setCanonPoints] = useState(0);
  const [mintTriggered, setMintTriggered] = useState(false);
  const [buttonShake, setButtonShake] = useState(false);
  const [buttonPhase, setButtonPhase] = useState(1);

  useEffect(() => {
    const playAmbient = () => {
      const ambient = new Audio('/canonAmbient.mp3');
      ambient.volume = 0.8;
      ambient.play().catch((err) => console.warn("Ambient audio play blocked:", err));
      window.removeEventListener('click', playAmbient);
      window.removeEventListener('keydown', playAmbient);
    };
    window.addEventListener('click', playAmbient);
    window.addEventListener('keydown', playAmbient);
    return () => {
      window.removeEventListener('click', playAmbient);
      window.removeEventListener('keydown', playAmbient);
    };
  }, []);

  useEffect(() => {
    if (input.length > 0 && buttonPhase === 1) {
      setButtonPhase(2);
    }
    if (validateReflectionMeaning(input)) {
      setButtonPhase(3);
    } else if (buttonPhase !== 1) {
      setButtonPhase(2);
    }
  }, [input, buttonPhase]);

  const handleReflect = () => {
    if (buttonPhase === 1) return;
    if (buttonPhase === 2) {
      const buzzer = new Audio('/buzzer.mp3');
      buzzer.volume = 0.8;
      buzzer.play().catch(err => console.warn("Buzzer blocked:", err));

      const busted = new Audio('/busted.mp3');
      busted.volume = 1.0;
      busted.play().catch(err => console.warn("Busted.mp3 blocked:", err));

      setResponse('💢⛓️ BUSTED_LOGIC ⛓️💢\n🧠 B.I.D.E.T. CanonEngine[Y3K] 🔒🪠');
      setButtonShake(true);
      setTimeout(() => setButtonShake(false), 500);
      return;
    }

    const pulse = new Audio('/canonPulse.mp3');
    pulse.volume = 1.0;
    pulse.play().catch(err => console.warn("Pulse blocked:", err));

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
    setButtonPhase(2);
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
      <button
        className={`portal-button phase-${buttonPhase} ${buttonShake ? 'shake' : ''}`}
        onClick={handleReflect}
      >
        Reflect
      </button>
      {response && (
        <div className={`portal-response ${response.includes('BUSTED_LOGIC') ? 'busted' : ''}`}>
          {response}
        </div>
      )}
      <div className="canon-footer">
        <span>Canon Points: {canonPoints}</span>
        <span>Avatar: 🧵</span>
      </div>
    </div>
  );
}
