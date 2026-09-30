import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = window.scrollY / totalHeight;
            setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      {/* Background track (whisper soft champagne hairline) */}
      <div className="absolute inset-0 bg-[#C8A97E]/10" />

      {/* Active champagne progress indicator */}
      <div
        className="h-full bg-gradient-to-r from-[#9E5B32] via-[#C8A97E] to-[#E5D4B8] origin-left shadow-[0_0_8px_rgba(200,169,126,0.6)]"
        style={{
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: '0 50%',
          willChange: 'transform',
          transition: 'transform 0.08s linear',
        }}
      />
    </div>
  );
};
