import React, { useState } from 'react';

const CanonPortalPremierDemo = () => {
  const [truthkey, setTruthkey] = useState('');

  const handleValidate = (e) => {
    e.preventDefault();
    alert(`TruthKey "${truthkey}" validation coming soon!`);
  };

  return (
    <div className="canon-portal-container">
      <h2 className="canon-title">📜 The DIGUM Whitebook</h2>
      <p className="truthkey-validation">
        Enter your truthkey to begin your reflection journey.
      </p>
      <form onSubmit={handleValidate}>
        <input
          type="text"
          className="truthkey-input"
          placeholder="🔑 Enter TruthKey"
          value={truthkey}
          onChange={(e) => setTruthkey(e.target.value)}
        />
        <button type="submit" className="truthkey-button">Validate</button>
      </form>

      <a
        href="https://raw.githubusercontent.com/MikeG73/canonfather"
        target="_blank"
        rel="noopener noreferrer"
        className="whitebook-link-button"
      >
        📘 Open the Whitebook
      </a>
    </div>
  );
};

export default CanonPortalPremierDemo;

