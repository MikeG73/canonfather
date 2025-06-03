// VaultViewer.jsx — Canon Vault Chain Reader
import React from 'react';
import { getVaultChain } from './VaultChain';
import './VaultViewer.css';

export default function VaultViewer() {
  const vault = getVaultChain();

  return (
    <div className="vault-viewer">
      <h2 className="vault-title">🧾 DIGUM VaultChain</h2>
      <ul className="vault-list">
        {vault.map(entry => (
          <li key={entry.hash} className="vault-entry">
            <span className="vault-block">Block #{entry.block}</span>
            <span className="vault-glyph">{entry.glyph || '–'}</span>
            <span className="vault-hash">{entry.hash}</span>
            <span className="vault-time">{entry.timestamp}</span>
            <span className="vault-reflect">{entry.reflection || '—'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
