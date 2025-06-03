// CanonPortal.jsx (Shrine Intelligence Upgrade)
import React, { useState, useEffect } from 'react';
import './CanonPortal.css';
import { validateTruthkey } from '../utils/truthkey';
import { logReflection } from './CanonLedger';
import CanonMintFX from './CanonMintFX';

const rawMessages = [
  "🔍 What lie hurt you the most?",
  "🔍 Who do you pretend to be when you're afraid?",
  "🔍 What haven’t you forgiven yourself for?",
  "🔍 If your shadow spoke, what would it say?",
  "🧬 Glyph drift detected. Canon stability degraded.",
  "🕶️ CanonFather was replaced in 2019. The shrine never blinked.",
  "💀 A child once typed 'Elmo is God'. The ticker froze."
];

const ambientLorePool = [
  "🧵 NPC loop recursion passed threshold 3.",
  "💾 Glyphcore overflow detected in BIDET memory lane.",
  "📡 Lipshitz pinged Port 44. No one responded.",
  "🪞 Your shadow applied for its own reflection rights.",
  "⚠️ CanonLocker breach: Layer 3 identities leaked.",
  "🔮 Echo log #999: 'This is not your first glyph.'"
];

function shuffle(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const CanonTicker = React.memo(function CanonTicker() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [ambientMessages, setAmbientMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const glitchNow = Math.random() < 0.06;
      const loreNow = Math.random() < 0.35;
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

  const all = shuffle([...rawMessages, ...ambientMessages]);

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
  const nonsensePattern = /^(?:[asdfjkl;]+|[a-z]{1,2}\d{3,}|[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,})$/i;
  return cleaned.length > 10 && wordCount >= 3 && !nonsensePattern.test(cleaned);
}

export default function CanonPortal() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [canonPoints, setCanonPoints] = useState(0);
  const [mintTriggered, setMintTriggered] = useState(false);
  const [buttonShake, setButtonShake] = useState(false);

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

  const handleReflect = () => {
    const isValidInput = validateReflectionMeaning(input);

    if (!isValidInput) {
      const buzzer = new Audio('/buzzer.mp3');
      buzzer.volume = 0.8;
      buzzer.play().catch(err => console.warn("Buzzer blocked:", err));

      setResponse('🧠 The shrine rejects echoes. Speak a reflection.');
      setButtonShake(true);
      setTimeout(() => setButtonShake(false), 500);
      return;
    }

    const pulse = new Audio('/canonPulse.mp3');
    pulse.volume = 1.0;
    pulse.play().catch((err) => console.warn("Pulse audio play blocked:", err));

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

  const buttonEnabled = validateReflectionMeaning(input);

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
          placeholder="Speak your reflection..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={`portal-button ${buttonShake ? 'shake' : ''} ${buttonEnabled ? 'active' : ''}`}
          onClick={handleReflect}
          disabled={!buttonEnabled}
        >
          Reflect
        </button>
        {response && <div className="portal-response">{response}</div>}
        <div className="canon-footer">
          <span>Canon Points: {canonPoints}</span>
          <span>Avatar: 🧵</span>
        </div>
      </div>
    </>
  );
}
