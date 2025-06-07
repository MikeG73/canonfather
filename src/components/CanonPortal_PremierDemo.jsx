import React, { useState } from 'react';
import './CanonPortal.css';

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

      <a
        href="https://github.com/MikeG73/canonfather"
        className="whitebook-link-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        📘 View the DIGUM Whitebook PDF
      </a>

      <form onSubmit={handleValidate}>
        <input
          type="text"
          placeholder="Enter your TruthKey"
          value={truthkey}
          onChange={(e) => setTruthkey(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CanonPortalPremierDemo;
