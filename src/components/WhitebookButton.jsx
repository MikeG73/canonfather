// WhitebookButton.jsx — Canonically Locked by Michael J. Galasso, Founder, B.I.D.E.T.™ Canon Engine
import React from 'react';
import './CanonPortal.css'; // Ensure button styles are available

export default function WhitebookButton() {
  return (
    <div className="shrine-overlay">
      <a
        href="https://github.com/MikeG73/canonfather"
        className="whitebook-link-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        📘 View the DIGUM Whitebook
      </a>
    </div>
  );
}
