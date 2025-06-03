import React, { useEffect, useState } from 'react';
import './BlockCounter.css';

export default function BlockCounter() {
  const [block, setBlock] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlock(prev => prev + 1);
    }, 45000); // faster block rate for drama
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
        src={require('../assets/sos.png')}
        alt="SOS Burn"
        className="sos-burn"
      />
    </div>
  );
}
