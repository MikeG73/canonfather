// CanonPortal.jsx — Final with CanonTicker restored
import React, { useState, useEffect } from 'react';
import './CanonPortal.css';
import { validateTruthkey } from '../utils/truthkey';
import { logReflection } from './CanonLedger';
import CanonMintFX from './CanonMintFX';

const rawMessages = [
  "🔍 What lie hurt you the most?",
  "🔍 What haven’t you forgiven yourself for?",
  "🕶️ CanonFather was replaced in 2019.",
  "📡 Shrine echo received.",
  "💀 Canon breach acknowledged.",
];

const ambientLorePool = [
  "🪞 Your shadow was archived.",
  "⚠️ Reflection overload reached glyph limit.",
  "🔮 CanonNode 4 bled echoes.",
  "📜 Elmo’s glyph reappeared in transcript #5C7E.",
];

const CanonTicker = React.memo(function CanonTicker() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [ambientMessages, setAmbientMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const glitchNow = Math.random() < 0.07;
      const loreNow = Math.random() < 0.4;
      const timestamp = new Date().toLocaleTimeString();

      let newMsg;
      if (glitchNow) {
        newMsg = `💀 GLYPHCORE ERROR: Canon breach @ ${new Date().toISOString()}`;
      } else if (loreNow) {
        newMsg = ambientLorePool[Math.floor(Math.random() * ambientLorePool.length)];
      } else {
        newMsg = `📡 Shrine echo received at ${timestamp}`;
      }

      setAmbientMessages(prev => [...prev.slice(-50), newMsg]);
      if (glitchNow) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 3000);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const all = [...rawMessages, ...ambientMessages].sort(() => Math.random() - 0.5);

  return (
    <div className={`canon-ticker ${isGlitching ? 'ticker-glitch' : ''}`}>
      <div className="ticker-track">
        {all.map((msg, i) => (
          <span key={i} className="ticker-message">{msg}&nbsp;&nbsp;&nbsp;</span>
        ))}
      </div>
    </div>
  );
});

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

    if (buttonPhase === 3) {
      const pulse = new Audio('/canonPulse.mp3');
      pulse.volume = 1.0;
      pulse.play().catch(err => console.warn("Pulse blocked:", err));
    }

    const isValid = validateTruthkey(input);
    const pointsEarned = isValid ? 10 : 0;

    logReflection(input, isValid, pointsEarned);

    if (isValid) {
      setResponse('🌀 DIGUM recognized. Mint sequence accepted.');
      setCanonPoints(prev => prev + pointsEarned);
      setMintTriggered(true);
      setTimeout(() => setMintTriggered(false), 1200);
    } else {
      setResponse('🧪 Noted AND not Canonblock worthy: ACTIVATION DENIED.');
    }

    setInput('');
    setButtonPhase(2);
  };

  return (
    <>
      <CanonTicker />
      <div className="portal-container">
        <CanonMintFX trigger={mintTriggered} />
        <div className="portal-title">CanonFather Shrine Interface</div>
        <input
          className="portal-input"
          type="text"
          value={input}
          placeholder="🫣😭🤬🥹🤪😨🥳🤥leave it all behind..."
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
    </>
  );
}
