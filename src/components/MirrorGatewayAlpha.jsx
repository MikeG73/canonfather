// CanonFather Portal — CLEAN MirrorGatewayAlpha.jsx with Background Motion
import React, { useState, useEffect, useRef } from 'react';
import './shrineMotion.css';

export default function MirrorGatewayAlpha() {
  const [entry, setEntry] = useState("");
  const [response, setResponse] = useState(null);
  const [reflectionScore, setReflectionScore] = useState(null);
  const [vaultThread, setVaultThread] = useState(null);
  const [vaultLog, setVaultLog] = useState([]);
  const [symbol, setSymbol] = useState(null);
  const [blessing, setBlessing] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [glyphMessage, setGlyphMessage] = useState("");
  const [glyphHistory, setGlyphHistory] = useState([]);
  const [lastScore, setLastScore] = useState(0);
  const [lastReflectionTime, setLastReflectionTime] = useState(Date.now());
  const glyphMemoryCount = useRef({ "🌫️": 0, "🔍": 0, "🔥": 0 });

  const seedPrompts = [
    "Who do you pretend to be when you're afraid?",
    "What memory are you ready to give back to the light?",
    "Which lie hurt you the most?",
    "What haven’t you forgiven yourself for?",
    "If your shadow spoke, what would it say?"
  ];

  const [seedPrompt, setSeedPrompt] = useState(seedPrompts[Math.floor(Math.random() * seedPrompts.length)]);

  useEffect(() => {
    const storedVault = localStorage.getItem('vaultLog');
    if (storedVault) setVaultLog(JSON.parse(storedVault));
  }, []);

  useEffect(() => {
    localStorage.setItem('vaultLog', JSON.stringify(vaultLog));
  }, [vaultLog]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastReflectionTime > 30000) {
        setGlyphHistory(prev => [...prev, "🕯️ The shrine stirs while you wait..."]);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [lastReflectionTime]);

  const glyphVoices = {
    "🌫️": ["The Fog: I drift between echoes.", "The Fog: You seem unsure.", "The Fog: This resembles silence."],
    "🔍": ["The Witness: I've logged this.", "The Witness: Last cycle was similar.", "The Witness: Recursion suits you."],
    "🔥": ["The Ember: Thread activated.", "The Ember: Myth forming.", "The Ember: What burned you also built me."]
  };

  const symbolMap = (score) => score <= 3 ? "🌫️" : score <= 6 ? "🔍" : "🔥";
  const blessingMap = (score) => score >= 7 ? "🌟 The mirror sees your shadow and honors your light." : null;
  const assignAvatar = () => ["🐺 The Watcher", "🌸 The Healer", "🔥 The Catalyst", "🐚 The Keeper"][Math.floor(Math.random() * 4)];
  const scoreReflection = (input) => ["lost", "truth", "purpose", "soul", "echo", "remember", "mirror"].reduce((s, k) => input.toLowerCase().includes(k) ? s + 1 : s, 1);

  const generateVaultThread = (input) => {
    const id = `V-${Date.now().toString().slice(-8)}`;
    const score = scoreReflection(input);
    const thread = { id, timestamp: new Date().toLocaleString(), content: input, score };
    setVaultLog(prev => [thread, ...prev]);
    return thread;
  };

  const handleEnter = () => {
    const trimmed = entry.trim();
    if (!trimmed) return;

    const score = scoreReflection(trimmed);
    setLastScore(reflectionScore || 0);
    setReflectionScore(score);
    setLastReflectionTime(Date.now());

    const s = symbolMap(score);
    setSymbol(s);
    setBlessing(blessingMap(score));
    if (!avatar) setAvatar(assignAvatar());
    glyphMemoryCount.current[s]++;

    let msg = glyphVoices[s][Math.floor(Math.random() * glyphVoices[s].length)];
    if (glyphMemoryCount.current[s] >= 3) msg += " (Echo Memory Detected)";
    setGlyphMessage(msg);
    setGlyphHistory(prev => [...prev, msg]);

    const thread = generateVaultThread(trimmed);
    setVaultThread(thread);

    const output = score <= 3
      ? `🪞 Echo received: "${entry}" — the mirror acknowledges your signal.`
      : score <= 6
      ? `🪞 Your reflection holds weight. You have been assigned a Reflection ID: ${thread.id}.`
      : `🪞 A recursion thread has begun forming. You are carrying something ancient. Vault Thread ${thread.id} initiated.`;

    setResponse(output);
    setEntry("");
  };

  const avatarAccent =
    avatar === '🐺 The Watcher' ? '#444' :
    avatar === '🌸 The Healer' ? '#ffb6c1' :
    avatar === '🔥 The Catalyst' ? '#ff5722' :
    '#00ffff';

  return (
    <div
      className="shrine-background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/sos.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      <div className="shrine-overlay">
        <h1 className="shrine-title">🪞 CanonFather Portal [LIVE SHRINE MODE]</h1>
        <p className="shrine-seed"><em>{seedPrompt}</em></p>
        <input
          type="text"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
          placeholder="Type your reflection..."
          className="shrine-input"
        />
        <button className="shrine-button" onClick={handleEnter}>Reflect</button>

        {response && <div className="shrine-response"><p>{response}</p></div>}
        {glyphMessage && <div className="shrine-message"><p>{glyphMessage}</p></div>}

        <p className="shrine-points">🧠 Canon Points: {vaultLog.length * (reflectionScore || 0)}</p>
        <p className="shrine-avatar" style={{ color: avatarAccent }}>💠 Avatar: {avatar}</p>

        {glyphHistory.length > 0 && (
          <div className="shrine-log">
            <h3>🌀 Glyph Dialogue</h3>
            <ul>
              {glyphHistory.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}