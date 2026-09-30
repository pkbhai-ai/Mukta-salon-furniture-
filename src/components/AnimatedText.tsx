import React, { useEffect, useRef, useState } from 'react';

interface ScrollTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'section';
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 750,
  as: Component = 'div',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={elementRef as any}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(7px)',
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </Component>
  );
};

interface WordRevealProps {
  text: string;
  className?: string;
  delayBase?: number;
  staggerMs?: number;
  italicIndices?: number[];
  serifIndices?: number[];
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  delayBase = 100,
  staggerMs = 60,
  italicIndices = [],
  serifIndices = [],
}) => {
  const words = text.split(' ');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap gap-x-[0.3em] gap-y-1 ${className}`}>
      {words.map((word, idx) => {
        const isItalic = italicIndices.includes(idx);
        const isSerif = serifIndices.includes(idx);

        return (
          <span key={idx} className="inline-block overflow-hidden py-0.5">
            <span
              className={`inline-block will-change-transform ${isSerif ? 'font-serif' : ''} ${
                isItalic ? 'italic font-serif text-[#2A1D17]' : ''
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? 'blur(0px)' : 'blur(8px)',
                transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
                letterSpacing: isVisible ? '-0.015em' : '0.04em',
                transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delayBase + idx * staggerMs}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
};

interface CuteEditorialHeadingProps {
  kicker: string;
  titlePrimary: string;
  titleAccent: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const CuteEditorialHeading: React.FC<CuteEditorialHeadingProps> = ({
  kicker,
  titlePrimary,
  titleAccent,
  description,
  className = '',
  align = 'left',
}) => {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {/* Soft rounded kicker with cute warm styling */}
      <ScrollTextReveal delay={50} duration={600}>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DC]/80 text-[11px] uppercase tracking-[0.2em] text-[#9E5B32] font-semibold mb-3 border border-[#9E5B32]/15 shadow-2xs ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E5B32]" />
          <span>{kicker}</span>
        </div>
      </ScrollTextReveal>

      {/* Main Title: refined blend of clean sans and soft editorial serif */}
      <ScrollTextReveal delay={150} duration={750}>
        <h2 className="text-3xl sm:text-5xl font-light text-[#1E1C1A] tracking-tight leading-[1.12] mb-4">
          {titlePrimary}{' '}
          <span className="font-serif italic font-normal text-[#2A1D17] underline decoration-[#C8A97E]/40 decoration-wavy decoration-1 underline-offset-6">
            {titleAccent}
          </span>
        </h2>
      </ScrollTextReveal>

      {/* Body description text */}
      {description && (
        <ScrollTextReveal delay={250} duration={800}>
          <p className="text-sm sm:text-base text-[#61574C] font-light leading-relaxed">
            {description}
          </p>
        </ScrollTextReveal>
      )}
    </div>
  );
};
