// CanonMintFX.jsx
import React, { useEffect, useRef } from 'react';
import './CanonPortal.css'; // Reuse same CSS file for glow styles

export default function CanonMintFX({ trigger }) {
  const fxRef = useRef(null);

  useEffect(() => {
    if (trigger && fxRef.current) {
      fxRef.current.classList.add('mint-burst');
      const timeout = setTimeout(() => {
        fxRef.current.classList.remove('mint-burst');
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  return <div ref={fxRef} className="mint-fx-circle"></div>;
}
