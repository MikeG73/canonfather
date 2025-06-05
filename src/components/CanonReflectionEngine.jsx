// CanonReflectionEngine.jsx
import React, { useEffect, useRef } from 'react';
import './CanonReflectionEngine.css';

export default function CanonReflectionEngine() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let pulse = 0;
    const animate = () => {
      pulse = (pulse + 0.05) % Math.PI;
      const scale = 1 + Math.sin(pulse) * 0.1;
      glow.style.transform = `scale(${scale})`;
      glow.style.opacity = `${0.6 + Math.sin(pulse) * 0.2}`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div ref={glowRef} className="canon-reflection-glow">
      <div className="badge-core">🧠 DIGUM MINT CORE</div>
    </div>
  );
}
