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
  const [currentPrompt, setCurrentPrompt] = useState("");
  const particleCanvasRef = useRef(null);
  const backgroundRef = useRef(null);

  const mirrorPrompts = [
    {
      theme: "Trauma Residue",
      prompts: [
        "What smile have you been faking so long it feels permanent?",
        "Which silence do you mistake for peace?",
        "What were you taught not to cry over, but still grieve?"
      ],
      weight: 0.8
    },
    {
      theme: "Symbolic Echo",
      prompts: [
        "What creature crawled out of your shame?",
        "What myth did you inherit and obey without question?",
        "What’s hiding in the drain of your consciousness?"
      ],
      weight: 1.0
    },
    {
      theme: "Shadow Behavior",
      prompts: [
        "What part of you wins when no one’s looking?",
        "Who do you become when you feel unloved?",
        "What are you still punishing yourself for, silently?"
      ],
      weight: 0.9
    },
    {
      theme: "Memory Loop",
      prompts: [
        "What memory still jerks your body before your mind remembers why?",
        "What lie did you memorize to survive childhood?",
        "If one memory vanished, which part of you would go with it?"
      ],
      weight: 0.7
    },
    {
      theme: "Control & Collapse",
      prompts: [
        "What do you control only so you don’t break down?",
        "What breaks first when you lose control?",
        "Who taught you to stay quiet to feel safe?"
      ],
      weight: 0.85
    },
    {
      theme: "Existential Infrastructure",
      prompts: [
        "What version of you is being hosted on borrowed time?",
        "What belief keeps your identity scaffolding from collapsing?",
        "Which part of you was built just to keep the peace?"
      ],
      weight: 1.1
    },
    {
      theme: "Gnostic Artifact Triggers",
      prompts: [
        "What were you told was sacred, but now seems like camouflage?",
        "What’s bound to the wheel of karma inside you?",
        "What did you pull from the drain that still whispers your name?"
      ],
      weight: 1.0
    }
  ];

  const getRandomMirrorPrompt = () => {
    const flatPool = mirrorPrompts.flatMap(group =>
      group.prompts.map(p => ({ prompt: p, weight: group.weight }))
    );
    const totalWeight = flatPool.reduce((sum, item) => sum + item.weight, 0);
    const rand = Math.random() * totalWeight;
    let acc = 0;
    for (let i = 0; i < flatPool.length; i++) {
      acc += flatPool[i].weight;
      if (rand <= acc) return flatPool[i].prompt;
    }
    return flatPool[0].prompt;
  };

  useEffect(() => {
    setCurrentPrompt(getRandomMirrorPrompt());
  }, []);

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
    setCurrentPrompt(getRandomMirrorPrompt());

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

  useEffect(() => {
    const graffitiLines = [
      "You can't fake canon.",
      "Narrative law is not a suggestion.",
      "Built for myth. Licensed for war.",
      "The first engine to remember your soul.",
      "Canon remembers what you forgot.",
      "Flush twice for symbolic override.",
      "Memory is a battlefield.",
      "The Engine is watching.",
      "He flushed... and the light came."
    ];

    const ghostColors = ["fuchsia", "red", "lime", "aqua", "white"];
    const graffitiCount = 7 + Math.floor(Math.random() * 4);

    function spawnGhostTag(i) {
      setTimeout(() => {
        const tag = document.createElement("div");
        tag.classList.add("ghost-tag");

        if (Math.random() < 0.05) {
          tag.innerText = "⚡ Echo Glyph: 'Truth burns where fiction hides.'";
          tag.style.color = 'gold';
          tag.style.textShadow = "0 0 6px white, 0 0 12px gold";
        } else {
          const text = graffitiLines[Math.floor(Math.random() * graffitiLines.length)];
          const color = ghostColors[Math.floor(Math.random() * ghostColors.length)];
          tag.innerText = text;
          tag.style.color = color;
          tag.style.setProperty("--ghost-color", color);
        }

        tag.style.top = `${Math.random() * 85}%`;
        tag.style.left = `${Math.random() * 85}%`;
        tag.style.setProperty("--rotate", `${Math.floor(Math.random() * 30 - 15)}deg`);
        tag.style.fontSize = `${Math.random() * 20 + 16}px`;
        tag.style.position = "absolute";

        const parent = backgroundRef.current || document.body;
        parent.appendChild(tag);

        setTimeout(() => tag.classList.add("fadeout"), 10000);
        setTimeout(() => tag.remove(), 12000);
      }, i * 800);
    }

    for (let i = 0; i < graffitiCount; i++) {
      spawnGhostTag(i);
    }
  }, []);

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
        <p className="shrine-seed"><em>{currentPrompt}</em></p>
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
