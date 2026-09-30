import React, { useState } from 'react';
import { Instagram, ArrowRight, ExternalLink } from 'lucide-react';
import { CuteEditorialHeading, ScrollTextReveal } from './AnimatedText';
import { COMPANY_DETAILS } from '../data/products';

interface InstagramPostItem {
  id: string;
  image: string;
  alt: string;
  caption: string;
  tag: string;
}

const INSTAGRAM_POSTS: InstagramPostItem[] = [
  {
    id: 'post-1',
    image: '/src/assets/images/hero_salon_chair_1790757004757.jpg',
    alt: 'MUKTA Royale Architectural Salon Chair in Cognac Saddle leather',
    caption: 'The Royale Chair in hand-turned walnut & champagne brass pedestal.',
    tag: '#SalonInterior',
  },
  {
    id: 'post-2',
    image: '/src/assets/images/shampoo_station_luna_1790757030123.jpg',
    alt: 'Luna Ergonomic Hydro-Suite Shampoo Station with matte ceramic basin',
    caption: 'Luna Hydro-Suite with cervical contour support and deep matte ceramic.',
    tag: '#SpaDesign',
  },
  {
    id: 'post-3',
    image: '/src/assets/images/insta_salon_interior_1790759665860.jpg',
    alt: 'Luxury boutique salon interior project featuring Mukta furniture',
    caption: 'Architectural installation with backlit brass arches and bespoke seating.',
    tag: '#SalonArchitecture',
  },
  {
    id: 'post-4',
    image: '/src/assets/images/pedicure_chair_orion_1790757045832.jpg',
    alt: 'Orion Meni-Pedi Throne with integrated foot spa basin',
    caption: 'Pipeless whirlpool hydro-jets and hand-finished Cashmere Sand upholstery.',
    tag: '#PedicureThrone',
  },
  {
    id: 'post-5',
    image: '/src/assets/images/leather_craft_detail_1790757070053.jpg',
    alt: 'Macro editorial closeup of double-stitched leather seams and walnut trim',
    caption: 'Precision French double-seams stitched with German bonded nylon thread.',
    tag: '#AtelierCraft',
  },
  {
    id: 'post-6',
    image: '/src/assets/images/barber_chair_baleno_1790757058220.jpg',
    alt: 'Baleno Heavy-Duty Barber Chair in quilted charcoal hide',
    caption: 'Heavy-duty industrial hydraulic pump rated for 280kg continuous load.',
    tag: '#BarberChair',
  },
];

export const InstagramShowcase: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="instagram" className="py-24 px-6 lg:px-12 bg-[#F8F5EE] border-t border-[#2A1D17]/8 relative overflow-hidden">
      {/* Soft Ambient Background Orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#C8A97E]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#9E5B32]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <CuteEditorialHeading
              kicker="LIVING SOCIAL GALLERY"
              titlePrimary="Follow the"
              titleAccent="MUKTA Journey"
              description="Discover our latest furniture, designs and salon inspirations directly from our manufacturing atelier and partner salons."
            />
          </div>

          <ScrollTextReveal delay={200} duration={700}>
            <a
              href={COMPANY_DETAILS.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#2A1D17] hover:bg-[#1E1511] text-[#FDFBF7] text-xs font-medium tracking-wide shadow-xs hover:shadow-md transition-all duration-200 group whitespace-nowrap btn-cute"
              title="Open Mukta Instagram Profile in new tab"
            >
              <Instagram className="w-4 h-4 text-[#C8A97E]" />
              <span>View Instagram</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </ScrollTextReveal>
        </div>

        {/* 3×2 Editorial Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INSTAGRAM_POSTS.map((item, idx) => (
            <ScrollTextReveal key={item.id} delay={idx * 80} duration={600}>
              <a
                href={COMPANY_DETAILS.instagram}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor="INSTAGRAM"
                className="group relative block aspect-square rounded-3xl overflow-hidden bg-[#EFE9DF] border border-[#2A1D17]/10 shadow-xs hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-1.5"
                title={`View ${item.caption} on Instagram`}
                aria-label={`View on Instagram: ${item.caption}`}
              >
                {/* Image with smooth hover zoom */}
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Ambient Soft Vignette on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1511]/85 via-[#1E1511]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 pointer-events-none" />

                {/* Top Corner Instagram Badge */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md border border-[#2A1D17]/10 flex items-center justify-center text-[#2A1D17] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2A1D17] group-hover:text-white">
                  <Instagram className="w-4 h-4" />
                </div>

                {/* Bottom Content Overlay on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A97E] block mb-1">
                    {item.tag}
                  </span>
                  <p className="text-xs text-white/95 leading-relaxed line-clamp-2 mb-2 font-light">
                    {item.caption}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#C8A97E] group-hover:underline underline-offset-4">
                    <span>@muktasalonfurniturepvtltd</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </a>
            </ScrollTextReveal>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-12 pt-8 border-t border-[#2A1D17]/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7065]">
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-[#9E5B32]" />
            <span>Tag your salon space with <strong className="text-[#2A1D17] font-semibold">#MuktaSalonFurniture</strong> to be featured</span>
          </div>

          <a
            href={COMPANY_DETAILS.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-[#9E5B32] hover:text-[#2A1D17] font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Follow @muktasalonfurniturepvtltd</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
