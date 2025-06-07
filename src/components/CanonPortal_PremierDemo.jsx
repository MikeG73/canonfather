import React from 'react';

const CanonPortalPremierDemo = () => {
  return (
    <div className="canon-portal-container">
      <h2 className="canon-title">📜 The DIGUM Whitebook</h2>
      <p className="truthkey-validation">
        Enter your truthkey to begin your reflection journey.
      </p>
      <input type="text" className="truthkey-input" placeholder="🔑 Enter TruthKey" />
      <button className="truthkey-button">Validate</button>
      <a
        href="https://github.com/MikeG73/canonfather/main/DWB_Final_Release.pdf"
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
