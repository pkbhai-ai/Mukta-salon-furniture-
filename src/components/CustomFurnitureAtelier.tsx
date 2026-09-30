import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Ruler, Palette, Sparkles, Send, Building2, Scissors, Armchair } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { COMPANY_DETAILS } from '../data/products';
import { CuteEditorialHeading, ScrollTextReveal } from './AnimatedText';
import { AtelierSoundscape } from './AtelierSoundscape';

interface CustomFurnitureProps {
  onOpenCustomQuote: (customDetails: string) => void;
}

export const CustomFurnitureAtelier: React.FC<CustomFurnitureProps> = ({ onOpenCustomQuote }) => {
  const [salonType, setSalonType] = useState<'boutique' | 'studio' | 'flagship'>('studio');
  const [selectedLeather, setSelectedLeather] = useState('Cognac Saddle');
  const [selectedMetal, setSelectedMetal] = useState('Champagne Brass');
  const [stationCount, setStationCount] = useState<number>(6);
  const [activeStepHover, setActiveStepHover] = useState<number | null>(null);

  const steps = [
    {
      step: '01',
      title: 'Share Requirements',
      desc: 'Send us your architectural CAD layout, floor plan dimensions, moodboards, or functional requirements for your upcoming salon or spa.',
    },
    {
      step: '02',
      title: 'Design & Discussion',
      desc: 'Our Delhi-based industrial design atelier prepares 3D CAD renders, ergonomic space clearances, and physical leather & veneer swatch samples.',
    },
    {
      step: '03',
      title: 'Manufacturing',
      desc: 'Precision laser-cutting, cold-molded foam injection, hand-turned solid timber shaping, and meticulous upholstery in our 25,000 sq ft facility.',
    },
    {
      step: '04',
      title: 'Delivery & Setup',
      desc: 'White-glove nationwide crating, transit insurance, and dedicated installation guidance directly to your commercial doorstep.',
    },
  ];

  const handleLaunchCustomInquiry = () => {
    const summary = `Custom Project: ${stationCount} Workstations (${salonType.toUpperCase()}) | Leather: ${selectedLeather} | Metal: ${selectedMetal}`;
    onOpenCustomQuote(summary);
  };

  return (
    <section id="custom" className="py-24 px-6 lg:px-12 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title with CuteEditorialHeading & Optional Ambient Soundscape */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <CuteEditorialHeading
            kicker="BESPOKE COMMERCIAL ATELIER"
            titlePrimary="Your Vision."
            titleAccent="Our Craft."
            description="Every salon interior is unique. At Mukta Salon Furniture, we engineer custom dimensional modifications, bespoke fabrications, custom wood stains, and branded embroidery for interior architects and salon founders."
          />
          <div className="md:mb-2 shrink-0">
            <AtelierSoundscape sectionId="custom" />
          </div>
        </div>

        {/* 4-Step Visual Process with Animated Connecting Line */}
        <div className="relative mb-20">
          {/* Subtle Horizontal Connecting Line on desktop */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-[#9E5B32]/15 via-[#C8A97E]/30 to-[#9E5B32]/15 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                onMouseEnter={() => setActiveStepHover(idx)}
                onMouseLeave={() => setActiveStepHover(null)}
                className={`bg-white p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  activeStepHover === idx
                    ? 'border-[#9E5B32]/50 shadow-xl -translate-y-1'
                    : 'border-[#2A1D17]/10 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#F6F1E7] border border-[#2A1D17]/10 flex items-center justify-center text-sm font-mono font-semibold text-[#2A1D17] shadow-xs">
                      {item.step}
                    </div>
                    <span className="text-[10px] font-mono text-[#8C8276] uppercase tracking-wider">
                      PHASE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif text-[#1E1C1A] font-normal mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#665D54] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#2A1D17]/8 flex items-center gap-1.5 text-xs text-[#9E5B32] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Factory Milestone</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Salon Project Planner / Custom Specifier */}
        <div className="bg-[#F8F5EE] rounded-3xl border border-[#2A1D17]/12 p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E5B32] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Project Configurator</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#1E1C1A] mb-4">
                Plan Your Salon Layout & Material Palette
              </h3>

              <p className="text-xs sm:text-sm text-[#665D54] mb-8 leading-relaxed">
                Estimate furniture combinations for your floor plan. Our Bawana manufacturing facility can color-match your brand's specific PANTONE or interior design moodboard.
              </p>

              {/* Station Count Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-[#6B6156] mb-2 font-medium">
                  <span>Number of Client Workstations / Chairs:</span>
                  <span className="font-mono text-sm font-semibold text-[#2A1D17]">{stationCount} Stations</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  step="1"
                  value={stationCount}
                  onChange={(e) => setStationCount(Number(e.target.value))}
                  className="w-full accent-[#2A1D17] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C8276] mt-1 font-mono">
                  <span>2 Boutique</span>
                  <span>8 Medium Salon</span>
                  <span>16 Large Spa</span>
                  <span>24 Flagship Chain</span>
                </div>
              </div>

              {/* Live Floorplan Preview Mini-Matrix */}
              <div className="mb-6 p-3 bg-white/70 rounded-xl border border-[#2A1D17]/8">
                <span className="text-[11px] font-mono text-[#7A7065] block mb-2 uppercase">
                  Spatial Clearance Blueprint ({stationCount} units):
                </span>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: stationCount }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#2A1D17]/15 flex items-center justify-center text-[#2A1D17] shadow-2xs"
                      title={`Station #${i + 1}`}
                    >
                      <Armchair className="w-4 h-4 text-[#9E5B32]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Upholstery Finishes Selector */}
              <div className="mb-6">
                <span className="block text-xs text-[#6B6156] font-medium mb-2">Bespoke Upholstery Selection:</span>
                <div className="flex flex-wrap gap-2">
                  {['Cognac Saddle', 'Obsidian Slate', 'Cashmere Sand', 'Emerald Forest', 'Bespoke RAL/Pantone'].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedLeather(tone)}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                        selectedLeather === tone
                          ? 'bg-[#2A1D17] text-white font-medium'
                          : 'bg-white hover:bg-[#EFE8DC] text-[#4F463E] border border-[#2A1D17]/10'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Hardware Selector */}
              <div className="mb-6">
                <span className="block text-xs text-[#6B6156] font-medium mb-2">Pedestal Base & Armrest Hardware:</span>
                <div className="flex flex-wrap gap-2">
                  {['Champagne Brass', 'Brushed Nickel Chrome', 'Matte Architectural Black', 'Rose Gold Satin'].map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                        selectedMetal === metal
                          ? 'bg-[#2A1D17] text-white font-medium'
                          : 'bg-white hover:bg-[#EFE8DC] text-[#4F463E] border border-[#2A1D17]/10'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary Card & Instant Action */}
            <div className="lg:col-span-5 bg-white p-7 rounded-2xl border border-[#2A1D17]/10 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-[#2A1D17]/8 text-xs text-[#7A7065]">
                <span className="uppercase tracking-wider font-semibold">Custom Project Spec</span>
                <span className="font-mono text-[#9E5B32]">MUKTA-CUSTOM</span>
              </div>

              <div className="py-5 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6B6156]">Planned Workstations:</span>
                  <span className="font-semibold text-[#1E1C1A]">{stationCount} Styling / Shampoo Units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6156]">Selected Upholstery:</span>
                  <span className="font-semibold text-[#1E1C1A]">{selectedLeather}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6156]">Architectural Metal:</span>
                  <span className="font-semibold text-[#1E1C1A]">{selectedMetal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6156]">Custom Logo Emboss:</span>
                  <span className="font-semibold text-[#9E5B32]">Complimentary for 6+ Units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6156]">Production Facility:</span>
                  <span className="font-semibold text-[#1E1C1A]">Bawana Sector 3, Delhi</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A1D17]/8 flex flex-col gap-3">
                <MagneticButton
                  onClick={handleLaunchCustomInquiry}
                  className="w-full py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1D17] hover:bg-[#1E1511] rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Custom Quotation</span>
                </MagneticButton>
                <div className="text-[11px] text-[#8C8276] text-center">
                  Direct dispatch from factory floor with 3-year structural guarantee.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
