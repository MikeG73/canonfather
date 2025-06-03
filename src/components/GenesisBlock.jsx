// GenesisBlock.jsx
import React, { useEffect, useState } from 'react';
import './GenesisBlock.css';

function generateHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32-bit int
  }
  return `0x${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

export default function GenesisBlock() {
  const [timestamp, setTimestamp] = useState(null);
  const [blockNumber] = useState(1);
  const [hash, setHash] = useState('');

  useEffect(() => {
    const ts = new Date().toISOString();
    const phrase = "And the paradox saw itself reflected.";
    const seed = `${ts}-${phrase}`;
    setTimestamp(ts);
    setHash(generateHash(seed));
  }, []);

  return (
    <div className="genesis-block">
      <h2>🧱 Genesis Block</h2>
      <p><strong>Block Number:</strong> #{blockNumber}</p>
      <p><strong>Timestamp:</strong> {timestamp}</p>
      <p><strong>Hash:</strong> <code>{hash}</code></p>
      <p className="genesis-phrase">"And the paradox saw itself reflected."</p>
    </div>
  );
}
