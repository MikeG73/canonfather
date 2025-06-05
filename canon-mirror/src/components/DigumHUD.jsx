// DigumHUD.jsx
import React, { useEffect, useState } from 'react';
import './DigumHUD.css';
import { getTotalMinted, getRemainingSupply, getTotalSupply } from './DigumMintTracker';

export default function DigumHUD() {
  const [minted, setMinted] = useState(getTotalMinted());
  const [remaining, setRemaining] = useState(getRemainingSupply());
  const [total, setTotal] = useState(getTotalSupply());

  useEffect(() => {
    const interval = setInterval(() => {
      setMinted(getTotalMinted());
      setRemaining(getRemainingSupply());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="digum-hud">
      <div className="hud-block">
        <label>Total Minted:</label>
        <span>{minted.toLocaleString()} DIGUM</span>
      </div>
      <div className="hud-block">
        <label>Remaining:</label>
        <span>{remaining.toLocaleString()}</span>
      </div>
      <div className="hud-block hud-bar">
        <div
          className="hud-fill"
          style={{ width: `${(minted / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
