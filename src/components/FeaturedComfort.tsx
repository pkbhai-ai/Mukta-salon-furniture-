import React, { useState } from 'react';
import { Eye, Layers, Compass, Sparkles, Shield, Cpu, ArrowRight } from 'lucide-react';
import { Featured3DModel } from './Featured3DModel';
import { ScrollTextReveal } from './AnimatedText';

interface FeaturedComfortProps {
  onEnquireNow: () => void;
}

export const FeaturedComfort: React.FC<FeaturedComfortProps> = ({ onEnquireNow }) => {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const hotspots = [
    {
      id: 0,
      title: 'Double-Stitched Saddle Seams',
      subtitle: 'Hand-sewn bonded nylon thread resistant to tension tears and salon bleach',
      tag: 'CRAFTSMANSHIP',
      details: 'Each seam is reinforced with German bonded nylon thread with 8 stitches per inch, resisting continuous chemical contact with hair peroxide and acetone.',
      stat: '100,000+ Cycle Abrasion Tested',
    },
    {
      id: 1,
      title: 'Precision Hydraulic Lift Cylinder',
      subtitle: 'Commercial steel cylinder with 200mm stroke and locking foot pedal',
      tag: 'ENGINEERING',
      details: 'Constructed from hardened chrome-molybdenum steel with multi-lip hydraulic seals, guaranteed to lift up to 280kg with silent zero-play operation.',
      stat: '280 kg Tested Load Rating',
    },
    {
      id: 2,
      title: 'Orthopedic Multi-Density Core',
      subtitle: 'High-resilience cold-cured foam molded with lumbar curvature',
      tag: 'ERGONOMICS',
      details: 'Dual-density foam construction: a firm 50kg/m³ foundational core prevents bottoming-out while a soft 35kg/m³ top layer relieves pressure on the sacrum.',
      stat: '10-Year Shape Memory Retention',
    },
    {
      id: 3,
      title: 'Solid Dark Walnut Arm Accents',
      subtitle: 'Kiln-dried hardwood buffed with organic matte polyurethane sealant',
      tag: 'MATERIALS',
      details: 'Hand-shaped from sustainable American Walnut timber, finished with anti-microbial hardwax oil that resists natural hair oils, tint splatters, and daily sanitization.',
      stat: 'Zero VOC Non-Toxic Finish',
    },
  ];

  return (
    <section id="featured" className="py-24 sm:py-28 px-6 lg:px-12 bg-[#2A1D17] text-[#FDFBF7] relative overflow-hidden">
      {/* Background Architectural Lighting Accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#9E5B32]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#C8A97E]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Soft Editorial Typography */}
        <div className="max-w-3xl mb-16">
          <ScrollTextReveal delay={50}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[11px] uppercase tracking-[0.22em] text-[#C8A97E] font-semibold mb-4 border border-[#C8A97E]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E] animate-pulse" />
              <span>SIGNATURE ARCHITECTURE · ERGONOMIC MASTERY</span>
            </div>
          </ScrollTextReveal>

          <ScrollTextReveal delay={150}>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#FDFBF7] mb-6 leading-[1.08]">
              Designed Around{' '}
              <span className="italic font-serif font-normal text-[#C8A97E] underline decoration-[#C8A97E]/40 decoration-wavy decoration-1 underline-offset-8">
                Absolute Comfort.
              </span>
            </h2>
          </ScrollTextReveal>

          <ScrollTextReveal delay={250}>
            <p className="text-base sm:text-lg text-[#DDD4C6]/90 font-light leading-relaxed">
              In high-end salon environments, beauty treatments often last between 90 minutes to 4 hours.
              Every curve, seam, and hydraulic stroke of Mukta furniture is engineered to eliminate lumbar fatigue for patrons and reduce postural strain for stylists.
            </p>
          </ScrollTextReveal>
        </div>

        {/* Cinematic Grid Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Interactive 3D Model & Macro Exploration */}
          <div className="lg:col-span-7 relative">
            <Featured3DModel
              activeHotspot={activeHotspot}
              onSelectHotspot={setActiveHotspot}
            />

            {/* Interactive Hotspot Selection Ribbon */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hotspots.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveHotspot(item.id)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                    activeHotspot === item.id
                      ? 'bg-[#FDFBF7] text-[#2A1D17] shadow-xl font-medium ring-2 ring-[#C8A97E]'
                      : 'bg-white/5 hover:bg-white/10 text-[#DDD4C6] border border-white/5'
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-wider opacity-70 mb-1 font-mono">
                    {item.tag}
                  </span>
                  <span className="text-xs line-clamp-1 leading-snug font-medium">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detailed Anatomy & Engineering Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-[#1E1511]/85 backdrop-blur-md rounded-3xl p-8 sm:p-9 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-[#C8A97E] mb-3 uppercase">
                <span>COMPONENT 0{activeHotspot + 1} / 04</span>
                <span className="bg-[#C8A97E]/15 px-2 py-0.5 rounded text-[10px] border border-[#C8A97E]/30">
                  {hotspots[activeHotspot].stat}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-light text-white mb-4">
                {hotspots[activeHotspot].title}
              </h3>

              <p className="text-xs sm:text-sm text-[#DDD4C6]/85 leading-relaxed mb-8">
                {hotspots[activeHotspot].details}
              </p>

              {/* 3 Value Markers */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#9E5B32]/30 border border-[#C8A97E]/30 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                      Commercial Duty Cycle
                    </h4>
                    <p className="text-xs text-[#DDD4C6]/80 mt-0.5">
                      Engineered to endure 40+ client services daily without mechanical degradation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#9E5B32]/30 border border-[#C8A97E]/30 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                      Salon Chemical Resistance
                    </h4>
                    <p className="text-xs text-[#DDD4C6]/80 mt-0.5">
                      Treated surface impervious to oxidation tints, styling lacquers, and disinfectant sanitizers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#9E5B32]/30 border border-[#C8A97E]/30 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                      Zero-Stall Hydraulics
                    </h4>
                    <p className="text-xs text-[#DDD4C6]/80 mt-0.5">
                      Smooth non-jarring descent ensures patron comfort during delicate cutting and coloring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={onEnquireNow}
                  className="w-full py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#2A1D17] bg-[#C8A97E] hover:bg-[#D8CDBC] rounded-2xl transition-all shadow-md cursor-pointer text-center flex items-center justify-center gap-2 group ring-1 ring-white/20"
                >
                  <span>Consult Our Technical Team</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
