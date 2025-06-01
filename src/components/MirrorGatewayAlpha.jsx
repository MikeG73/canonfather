// CanonFather Portal — MirrorGatewayAlpha with CanonPulse FX (Blur, Shrink, Particles)
import React, { useState, useEffect, useRef } from 'react';
import './shrineMotion.css';

export default function MirrorGatewayAlpha() {
  const [entry, setEntry] = useState("");
  const [response, setResponse] = useState(null);
  const [reflectionScore, setReflectionScore] = useState(null);
  const [vaultLog, setVaultLog] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [glyphMessage, setGlyphMessage] = useState("");
  const [glyphHistory, setGlyphHistory] = useState([]);
  const particleCanvasRef = useRef(null);

  const backgroundRef = useRef(null);

  const seedPrompts = [
    "Who do you pretend to be when you're afraid?",
    "What memory are you ready to give back to the light?",
    "Which lie hurt you the most?",
    "What haven’t you forgiven yourself for?",
    "If your shadow spoke, what would it say?"
  ];

  const seedPrompt = seedPrompts[Math.floor(Math.random() * seedPrompts.length)];

  useEffect(() => {
    const storedVault = localStorage.getItem('vaultLog');
    if (storedVault) setVaultLog(JSON.parse(storedVault));
  }, []);

  useEffect(() => {
    localStorage.setItem('vaultLog', JSON.stringify(vaultLog));
  }, [vaultLog]);

  const glyphVoices = {
    "🌫️": ["The Fog: I drift between echoes.", "The Fog: You seem unsure.", "The Fog: This resembles silence."],
    "🔍": ["The Witness: I've logged this.", "The Witness: Last cycle was similar.", "The Witness: Recursion suits you."],
    "🔥": ["The Ember: Thread activated.", "The Ember: Myth forming.", "The Ember: What burned you also built me."]
  };

  const symbolMap = (score) => score <= 3 ? "🌫️" : score <= 6 ? "🔍" : "🔥";
  const assignAvatar = () => ["🐺 The Watcher", "🌸 The Healer", "🔥 The Catalyst", "🐚 The Keeper"][Math.floor(Math.random() * 4)];
  const scoreReflection = (input) => ["lost", "truth", "purpose", "soul", "echo", "remember", "mirror"].reduce((s, k) => input.toLowerCase().includes(k) ? s + 1 : s, 1);

  const generateVaultThread = (input) => {
    const id = `V-${Date.now().toString().slice(-8)}`;
    const score = scoreReflection(input);
    const thread = { id, timestamp: new Date().toLocaleString(), content: input, score };
    setVaultLog(prev => [thread, ...prev]);
    return thread;
  };

  const triggerParticleBurst = () => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = Array.from({ length: 30 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: Math.random() * 2 + 1,
      speedX: Math.random() * 4 - 2,
      speedY: Math.random() * 4 - 2,
      alpha: 1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.02;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,100,${p.alpha})`;
        ctx.fill();
      });
      if (particles.some(p => p.alpha > 0)) requestAnimationFrame(animate);
    };
    animate();
  };

  const handleEnter = () => {
    const trimmed = entry.trim();
    if (!trimmed) return;

    const score = scoreReflection(trimmed);
    const s = symbolMap(score);
    if (!avatar) setAvatar(assignAvatar());

    const msg = glyphVoices[s][Math.floor(Math.random() * glyphVoices[s].length)];
    setGlyphMessage(msg);
    setGlyphHistory(prev => [...prev, msg]);

    generateVaultThread(trimmed);

    const output = score <= 3
      ? `🪞 Echo received: "${entry}" — the mirror acknowledges your signal.`
      : score <= 6
      ? `🪞 Your reflection holds weight. Reflection stored.`
      : `🪞 A recursion thread has begun forming. You are carrying something ancient.`;

    setReflectionScore(score);
    setResponse(output);
    setEntry("");

    const sound = new Audio(`${process.env.PUBLIC_URL}/canonPulse.mp3`);
    sound.volume = 0.3;
    sound.play().catch(() => {});

    const background = document.querySelector('.shrine-background');
    if (background) {
      background.classList.add('canonPulseActive');
      background.classList.add('canonPulseBlur');
      setTimeout(() => {
        background.classList.remove('canonPulseActive');
        background.classList.remove('canonPulseBlur');
      }, 500);
    }

    triggerParticleBurst();
  };

  const avatarAccent =
    avatar === '🐺 The Watcher' ? '#444' :
    avatar === '🌸 The Healer' ? '#ffb6c1' :
    avatar === '🔥 The Catalyst' ? '#ff5722' :
    '#00ffff';

  return (
    <div
      ref={backgroundRef}
      className="shrine-background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/sos.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      <canvas
        ref={particleCanvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 5 }}
      />

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

        <audio autoPlay loop>
          <source src={`${process.env.PUBLIC_URL}/canonAmbient.mp3`} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}


