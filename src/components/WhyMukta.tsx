import React from 'react';
import { CuteEditorialHeading, ScrollTextReveal } from './AnimatedText';

export const WhyMukta: React.FC = () => {
  const pillars = [
    {
      title: 'Thoughtful Design',
      desc: 'Form follows human posture. Every dimension is mapped to client relaxation angles and stylist reach, eliminating back fatigue during long services.',
      svgPath: (
        <svg className="w-6 h-6 stroke-[#2A1D17] fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M4 20h16M4 20l4-16h8l4 16M9 12h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Comfort-Focused Furniture',
      desc: 'High-resilience cold-cured foam cushions designed with orthopedic lumbar contours to ensure clients remain completely serene for up to 4 hours.',
      svgPath: (
        <svg className="w-6 h-6 stroke-[#2A1D17] fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7M5 12l4-4M5 12l4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Quality Materials',
      desc: 'High-fired vitreous ceramic basins, hand-selected solid Burma teak and American walnut timbers, and heavy-gauge molybdenum steel frames.',
      svgPath: (
        <svg className="w-6 h-6 stroke-[#2A1D17] fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Professional Finishing',
      desc: 'Precision double-stitched French seams, hand-buffed organic wood sealants, and electroplated champagne brass resisting acetone and dyes.',
      svgPath: (
        <svg className="w-6 h-6 stroke-[#2A1D17] fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18v-9h9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Practical Functionality',
      desc: 'Concealed plumbing traps, 360-degree silent rotation locks, non-drip silicone neck cushions, and pipeless magnetic sanitizable jets.',
      svgPath: (
        <svg className="w-6 h-6 stroke-[#2A1D17] fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Salon-Focused Solutions',
      desc: 'End-to-end manufacturing flexibility directly from our Delhi facility, accommodating custom brand palettes, custom footprints, and bulk trade rates.',
      svgPath: (
        <svg className="w-6 h-6 stroke-[#2A1D17] fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1M14 10h1M9 14h1M14 14h1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="why-mukta" className="py-24 px-6 lg:px-12 bg-[#F8F5EE] border-t border-[#2A1D17]/8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <CuteEditorialHeading
            kicker="MANUFACTURING DISTINCTION"
            titlePrimary="Why Visionary Salons"
            titleAccent="Choose MUKTA."
            description="Built from the ground up to empower salon founders and interior designers with architectural durability, human ergonomics, and custom finishing."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#2A1D17]/10 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EFE8DC]/60 flex items-center justify-center mb-6">
                  {item.svgPath}
                </div>

                <h3 className="text-xl font-serif text-[#1E1C1A] mb-3 font-normal">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#61574C] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#2A1D17]/6 text-[11px] font-mono text-[#8C8276]">
                PILLAR 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
