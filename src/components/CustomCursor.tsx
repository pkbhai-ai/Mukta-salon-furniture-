import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check for custom hover triggers
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveParent = target.closest('[data-cursor]');
        if (interactiveParent) {
          const text = interactiveParent.getAttribute('data-cursor');
          setCursorText(text);
          setIsHovered(true);
        } else if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('select')) {
          setCursorText(null);
          setIsHovered(true);
        } else {
          setCursorText(null);
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth lerp for outer ring
    let animationFrameId: number;
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Precision inner center dot */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#2A1D17] transition-opacity duration-200"
        style={{
          opacity: isHovered && cursorText ? 0 : 0.85,
        }}
      />

      {/* Smooth trailing outer ring / badge */}
      <div
        ref={cursorRingRef}
        className={`absolute top-0 left-0 rounded-full flex items-center justify-center transition-all duration-300 ease-out will-change-transform ${
          cursorText
            ? 'w-20 h-20 -ml-10 -mt-10 bg-[#2A1D17]/85 backdrop-blur-md text-[#FDFBF7] border border-[#C8A97E]/40 shadow-xl'
            : isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 bg-[#C8A97E]/20 border border-[#9E5B32]/40 scale-110'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border border-[#2A1D17]/25 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#FDFBF7] font-medium text-center leading-tight px-1 select-none animate-in fade-in zoom-in-95 duration-200">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
