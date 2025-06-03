// CanonTickerOOA.jsx — OOA Diffusion Ticker Stream
import React, { useEffect, useReducer } from 'react';
import './CanonTicker.css';

const ambientLorePool = [
  "🔦 Echo replay initiated.",
  "📡 Shrine echo received.",
  "💾 Memory drift detected.",
  "🧬 Node 5B scanned.",
  "🜏 Block resonance stored.",
  "🧠 OOA signature match.",
  "🌀 Glyph noise inverted.",
  "🧱 Canon Engine steady.",
  "☯ Reflection phase balanced.",
  "✴ VaultChain spinning..."
];

function getCurrentBlock() {
  const block = localStorage.getItem('canon_block_number');
  return block ? parseInt(block, 10) : 1;
}

function pickDiffusionFragment(now, block) {
  if (block % 33 === 0) return `🔮 CanonCycle ${block} breached symmetry`;
  if (block % 11 === 0) return `🧱 Canon Tick #${block}`;
  if (block % 5 === 0) return `🜂 Vault pulse at ${block}`;
  return ambientLorePool[Math.floor(Math.random() * ambientLorePool.length)];
}

const reducer = (state, fragment) => [...state.slice(-333), fragment];

export default function CanonTickerOOA() {
  const [rendered, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    let frame = 0;

    const loop = () => {
      const now = new Date();
      const block = getCurrentBlock();
      if (frame % 120 === 0) {
        const fragment = pickDiffusionFragment(now, block);
        dispatch(fragment);
      }
      frame++;
      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  return (
    <div className="canon-ticker">
      <div className="ticker-track">
        {rendered.map((msg, i) => (
          <span key={i} className="ticker-message">{msg}&nbsp;&nbsp;&nbsp;</span>
        ))}
      </div>
    </div>
  );
}
