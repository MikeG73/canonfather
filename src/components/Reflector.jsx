import React, { useState } from 'react';
import './Reflector.css';

export default function Reflector() {
  const [input, setInput] = useState("");

  const isUnlocked = input.trim().length >= 25;

  const handleReflect = () => {
    if (!isUnlocked) return;
    console.log("Reflection submitted:", input);
  };

  return (
    <div className="reflector-container">
      {/* 🔯 Floating glyph appears behind input when unlocked */}
      <div className={`reflection-glyph ${isUnlocked ? 'visible' : ''}`}>✴</div>

      <textarea
        className="reflect-input"
        placeholder="What haven’t you forgiven yourself for?"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <p className={`reflect-hint ${isUnlocked ? 'ready' : 'locked'}`}>
        {isUnlocked ? "🌀 I heard that." : "💬 Speak your truth (25+ characters required)"}
      </p>

      <button
        className={`reflect-button ${isUnlocked ? 'unlocked' : 'locked'}`}
        disabled={!isUnlocked}
        onClick={handleReflect}
      >
        Reflect
      </button>
    </div>
  );
}
