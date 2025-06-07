// WhitebookButton.jsx — CanonLock v1.1 DIGUM Reference Button
import React from 'react';
import './CanonPortal.css';

export default function WhitebookButton() {
  return (
    <div className="shrine-overlay">
      <a
        href="https://github.com/MikeG73/canonfather/blob/main/DWB_Final_Release.html"
        className="whitebook-link-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        📄 View the DIGUM Whitebook
      </a>
    </div>
  );
}
