// BlockCounter.jsx — Canon Engine Core Reactor (SAME RULES)
import React, { useEffect, useState } from 'react';
import './BlockCounter.css';

export default function BlockCounter() {
  const [block, setBlock] = useState(() => {
    const saved = localStorage.getItem('canon_block_number');
    return saved ? parseInt(saved, 10) : 1;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBlock(prev => {
        const next = prev + 1;
        localStorage.setItem('canon_block_number', next.toString());
        return next;
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="block-reactor">
      <div className="block-flare" />
      <p className="block-label">CANON ENGINE BLOCK COUNT</p>
      <div className="block-readout">
        <span className="block-hash"># {block}</span>
      </div>
      <img
        src="/sos.png"

        alt="SOS Burn"
        className="sos-burn"
      />
    </div>
  );
}
