import React, { useEffect, useState } from 'react';

interface Chapter {
  id: string;
  number: string;
  name: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'hero', number: '01', name: 'Atelier 3D' },
  { id: 'collection', number: '02', name: 'Collections' },
  { id: 'featured', number: '03', name: 'Ergonomic Science' },
  { id: 'custom', number: '04', name: 'Bespoke Atelier' },
  { id: 'why-mukta', number: '05', name: 'Distinction' },
  { id: 'about', number: '06', name: 'Brand Story' },
  { id: 'gallery', number: '07', name: 'Gallery' },
  { id: 'instagram', number: '08', name: 'Instagram' },
  { id: 'contact', number: '09', name: 'Direct Desk' },
];

export const ChapterStoryTracker: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveChapter(CHAPTERS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 pointer-events-none select-none"
      aria-label="Story Chapter Navigation"
    >
      <div className="flex flex-col gap-2.5 p-2 rounded-full bg-white/40 backdrop-blur-md border border-[#2A1D17]/8 shadow-xs pointer-events-auto">
        {CHAPTERS.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className="group relative flex items-center cursor-pointer p-1"
              title={`${ch.number} ${ch.name}`}
              aria-label={`Jump to chapter ${ch.number}: ${ch.name}`}
            >
              {/* Dot indicator */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-5 h-2 bg-[#9E5B32] rounded-full shadow-xs'
                    : 'bg-[#2A1D17]/25 group-hover:bg-[#2A1D17]/60 group-hover:scale-125'
                }`}
              />

              {/* Hover Tooltip Label */}
              <span className="absolute left-7 px-2.5 py-1 rounded-lg bg-[#2A1D17] text-[#FDFBF7] text-[10px] font-mono uppercase tracking-wider whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 shadow-lg -translate-x-1 group-hover:translate-x-0">
                <span className="text-[#C8A97E] mr-1.5">{ch.number}</span>
                {ch.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
