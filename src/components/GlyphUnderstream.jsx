// GlyphUnderstream.jsx — Canon Shrine Underflow Layer
import React, { useEffect, useState } from 'react';
import './GlyphUnderstream.css';

const GLYPHS = [
  '✴', '⟁', '✦', '𓂀', '⚛', '⟁', '⟊', '♒', '✺', '🜏', '🜂', '🜄', '☯', '❖', '☢'
];

export default function GlyphUnderstream() {
  const [stream, setStream] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      setStream(prev => [...prev.slice(-100), newGlyph]);
    }, 100); // rapid scroll rate

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glyph-understream">
      {stream.map((glyph, i) => (
        <span key={i} className="glyph">{glyph}</span>
      ))}
    </div>
  );
}
