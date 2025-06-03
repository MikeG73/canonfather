// CanonPortal.jsx — CanonNode 5 Overload Mode + 3-Phase Shrine Logic
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
  "💀 Canon breach acknowledged."
];

const ambientLorePool = [
  "🧬 CanonNode 5 initiated glyph sequence 9Z-88.",
  "🚨 Glyph integrity breach: echo loop overflowed.",
  "🕸️ Reflection density fractured on Node 5B.",
  "🔁 Shrine memory replayed a past unspoken phrase.",
  "🕶️ Same & Old Shit observed glitch #0037 near node shelf.",
  "🔦 Fragment 'Elmo_Awakened' decoded from sewer thread.",
  "📡 BIDET fallback route triggered at CanonNode 5.",
  "📍 Node 5 glyph pressure exceeded 77 glyphs/sec.",
  "⛏️ DigumMine overflow — reflection dig unsafe.",
  "🎙️ EchoLog #5-NOVA: 'This place remembers you.'",
  "💽 CanonFather's eye twitched at 03:37am. Logged."
];

const CanonTicker = React.memo(function CanonTicker() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [ambientMessages, setAmbientMessages] = useState([]);
  const [overload, setOverload] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const glitchNow = Math.random() < 0.07;
      const loreNow = Math.random() < 0.4;
      const timestamp = new Date().toLocaleTimeString();

      let newMsg = '';
      if (glitchNow) {
        newMsg = `💀 GLYPHCORE ERROR: Canon breach @ ${new Date().toISOString()}`;
      } else if (loreNow) {
        const lore = ambientLorePool[Math.floor(Math.random() * ambientLorePool.length)];
        newMsg = lore;
        if (lore.includes("CanonNode 5")) {
          setOverload(true);
          setTimeout(() => setOverload(false), 8000);
        }
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
    <div className={`canon-ticker ${isGlitching ? 'ticker-glitch' : ''} ${overload ? 'ticker-overload' : ''}`}>
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
  const sadWords = [
    'sorry', 'forgive', 'alone', 'afraid', 'left', 'wrong', 'shame', 'cry',
    'broken', 'regret', 'guilt', 'lost', 'worthless', 'angry', 'hurt', 'sad'
  ];
  const hasEmotion = sadWords.some(word => cleaned.toLowerCase().includes(word));
  const nonsensePattern = /^(?:[asdfjkl;]+|[a-z]{1,2}\d{3,}|[!@#$%^&*()_+\-=\\[\]{};':"|,.<>/?]{5,})$/i;

  return cleaned.length >= 25 && wordCount >= 3 && hasEmotion && !nonsensePattern.test(cleaned);
}

function CanonPortal() {
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

    const isTrulyUnlocked = input.trim().length >= 25 && validateReflectionMeaning(input);
    if (isTrulyUnlocked) {
      setButtonPhase(3);
    } else if (buttonPhase !== 1) {
      setButtonPhase(2);
    }
  }, [input, buttonPhase]);

  const handleReflect = () => {
    if (buttonPhase === 1) return;

    if (buttonPhase === 2) {
      new Audio('/buzzer.mp3').play();
      setResponse('💢⛓️ BUSTED_LOGIC ⛓️💢\n🧠 B.I.D.E.T. CanonEngine[Y3K] 🔒🪠');
      setButtonShake(true);
      setTimeout(() => setButtonShake(false), 500);
      return;
    }

    if (buttonPhase === 3) {
      new Audio('/canonPulse.mp3').play();
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
          placeholder="🫣😭🤬🥹🤪😨🥳🤥    ...leave it all behind...         "
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '4px' }}>
            Characters: {input.length} | Trimmed: {input.trim().length}
          </p>
        )}
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

export default CanonPortal;
