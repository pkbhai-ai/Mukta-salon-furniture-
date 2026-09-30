import React, { useEffect, useRef } from 'react';

export const AmbientAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Subtle floating champagne particles
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.25 + 0.08),
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.35 + 0.15,
      maxOpacity: Math.random() * 0.45 + 0.2,
      pulseSpeed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.phase += p.pulseSpeed;

        // Wrap around smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.phase));

        // Draw soft champagne particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 126, ${currentOpacity})`;
        ctx.shadowColor = 'rgba(200, 169, 126, 0.4)';
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Floating Canvas Dust Specks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Ambient Drifting Warm Caustics & Light Halos */}
      <div
        className="absolute top-[8%] left-[12%] w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-40 mix-blend-multiply animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(240, 226, 206, 0.9) 0%, rgba(200, 169, 126, 0.2) 60%, transparent 80%)',
          animationDuration: '14s',
        }}
      />
      <div
        className="absolute top-[45%] right-[5%] w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none opacity-30 mix-blend-multiply animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(230, 215, 195, 0.8) 0%, rgba(158, 91, 50, 0.15) 70%, transparent 85%)',
          animationDuration: '18s',
        }}
      />
      <div
        className="absolute top-[75%] left-[8%] w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-25 mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, rgba(245, 235, 220, 0.8) 0%, rgba(200, 169, 126, 0.15) 70%, transparent 85%)',
        }}
      />
    </div>
  );
};
