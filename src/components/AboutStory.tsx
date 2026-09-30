import React from 'react';
import { COMPANY_DETAILS } from '../data/products';
import { CuteEditorialHeading, ScrollTextReveal } from './AnimatedText';

interface AboutStoryProps {
  onLearnMore?: () => void;
}

export const AboutStory: React.FC<AboutStoryProps> = () => {
  return (
    <section id="about" className="py-24 px-6 lg:px-12 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Editorial Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-[#2A1D17]/10 bg-[#EFE9DF]">
              <img
                src="/src/assets/images/hero_salon_chair_1790757004757.jpg"
                alt="Mukta Salon Furniture showroom design"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Floating Architectural Proof Card */}
            <div className="absolute -bottom-8 -right-4 sm:right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-[#2A1D17]/12 shadow-xl max-w-xs">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9E5B32] block mb-1">
                DELHI MANUFACTURING HUB
              </span>
              <p className="text-xs text-[#524940] leading-relaxed">
                25,000+ sq. ft. precision facility in Bawana Industrial Area, housing CNC laser cutters, cold-cure molding, and master upholstery benches.
              </p>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <CuteEditorialHeading
              kicker="BRAND HERITAGE · DIRECT CRAFT"
              titlePrimary="Built for"
              titleAccent="Modern Beauty Spaces."
            />

            <ScrollTextReveal delay={200} duration={800}>
              <div className="space-y-4 text-sm sm:text-base text-[#5C534A] font-light leading-relaxed my-8">
                <p>
                  Founded with a conviction that salon equipment should possess the sculptural elegance of fine residential architecture, Mukta Salon Furniture Private Limited has grown to become India’s premier bespoke salon furniture manufacturer.
                </p>
                <p>
                  Rather than importing generic flat-pack chairs, we engineer every piece from the chassis up. From our expansive facility in Delhi’s Bawana Industrial Area, our artisans, welders, and master leather tailors collaborate to produce furniture that withstands the high pace of demanding commercial beauty spaces.
                </p>
              </div>
            </ScrollTextReveal>

            {/* Quantitative Proof Metrics */}
            <ScrollTextReveal delay={300} duration={850}>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#2A1D17]/10">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif text-[#1E1C1A] block font-light">
                    25,000<span className="text-sm font-mono text-[#9E5B32]">+</span>
                  </span>
                  <span className="text-xs text-[#7A7065] mt-1 block">
                    Sq. Ft. Factory Area
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-serif text-[#1E1C1A] block font-light">
                    1,850<span className="text-sm font-mono text-[#9E5B32]">+</span>
                  </span>
                  <span className="text-xs text-[#7A7065] mt-1 block">
                    Salons Equipped
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-serif text-[#1E1C1A] block font-light">
                    100<span className="text-sm font-mono text-[#9E5B32]">%</span>
                  </span>
                  <span className="text-xs text-[#7A7065] mt-1 block">
                    In-House Indian Craft
                  </span>
                </div>
              </div>
            </ScrollTextReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
