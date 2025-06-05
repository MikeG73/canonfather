import React, { useEffect, useRef } from 'react';
import './shrineMotion.css'; // Adjust path if needed

export default function MirrorGatewayAlpha() {
  const backgroundRef = useRef(null);
  const particleCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = Array.from({ length: 30 }, () => {
      const muzzleX = backgroundRef.current?.offsetWidth * 0.72;
      const muzzleY = backgroundRef.current?.offsetHeight * 0.53;
      return {
        x: muzzleX,
        y: muzzleY,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 - 2,
        alpha: 1
      };
    });

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.01;

        if (p.alpha > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div ref={backgroundRef} className="shrine-background">
      <canvas ref={particleCanvasRef} width="800" height="400" />

      {/* ✨ Embedded Whitebook Button */}
      <div className="shrine-overlay">
        <a
          href="https://github.com/MikeG73/MikeG73/canonfather"
          target="_blank"
          rel="noopener noreferrer"
          className="whitebook-link-button"
        >
          📄 View the DIGUM Whitebook PDF
        </a>
      </div>
    </div>
  );
}
