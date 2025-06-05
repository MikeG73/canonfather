import React, { useState } from 'react';
import './Reflector.css';

export default function Reflector() {
  const [input, setInput] = useState("");

  const isUnlocked = validateReflectionMeaning(input);

  const handleReflect = () => {
    if (!isUnlocked) return;
    console.log("Reflection submitted:", input);
    setInput(""); // Optional: clear after reflection
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
        {isUnlocked
          ? "🌀 I heard that."
          : "💬 Speak your truth (25+ chars, 3+ words, must *feel* real)"}
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
