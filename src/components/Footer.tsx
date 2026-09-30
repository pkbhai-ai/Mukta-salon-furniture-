import React from 'react';
import { COMPANY_DETAILS, PRODUCTS_DATA } from '../data/products';
import { Phone, MessageSquare, Mail, MapPin, ArrowUp, Instagram } from 'lucide-react';

interface FooterProps {
  onQuoteClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onQuoteClick, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1511] text-[#DDD4C6] pt-20 pb-12 px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <span className="text-3xl font-serif font-light tracking-[0.18em] text-[#FDFBF7] block mb-3 uppercase">
              MUKTA
            </span>
            <p className="text-xs font-mono uppercase tracking-widest text-[#C8A97E] mb-4">
              Salon &amp; Spa Furniture Private Limited
            </p>
            <p className="text-xs sm:text-sm text-[#DDD4C6]/80 leading-relaxed mb-6 max-w-sm">
              Manufacturers of high-end salon seating, ergonomic shampoo stations, pedicure thrones, and bespoke salon joinery. Crafted with precision in Delhi, India.
            </p>

            <div className="space-y-1 text-xs text-[#DDD4C6]/70 font-mono">
              <div>GSTIN: <span className="text-white font-medium">{COMPANY_DETAILS.gstin}</span></div>
              <div>CIN: U36100DL2014PTC271928</div>
              <div>Factory: Bawana Industrial Area Sector 3, Delhi</div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#DDD4C6]/80">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors cursor-pointer">
                  Home Showroom
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Product Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('featured')} className="hover:text-white transition-colors cursor-pointer">
                  Comfort Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom')} className="hover:text-white transition-colors cursor-pointer">
                  Custom Salon Craft
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Mukta
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Installation Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Factory
                </button>
              </li>
            </ul>
          </div>

          {/* Signature Products Catalog */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Signature Models
            </h4>
            <div className="grid grid-cols-1 gap-2 text-xs text-[#DDD4C6]/80">
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                • Luna Shampoo
              </span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                • Orion Meni-Pedi
              </span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                • Baleno Barber
              </span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                • Honeycomb Chair
              </span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                • Chandrayan Throne
              </span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collection')}>
                • Aura Wash Lounge
              </span>
            </div>
          </div>

          {/* Social Presence: Follow MUKTA */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Follow MUKTA
            </h4>
            <div className="space-y-3 text-xs text-[#DDD4C6]/80">
              <p className="text-[11px] text-[#DDD4C6]/70 leading-relaxed">
                Stay updated with our latest architectural releases, factory craft, and salon interiors.
              </p>
              
              <div className="pt-1">
                <span className="text-[11px] text-[#C8A97E] uppercase tracking-wider font-semibold block mb-1.5">
                  Instagram
                </span>
                <a
                  href={COMPANY_DETAILS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-white hover:text-[#C8A97E] transition-colors group"
                  title="Visit Mukta on Instagram"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-[#C8A97E] group-hover:text-[#1E1511] flex items-center justify-center transition-colors">
                    <Instagram className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-mono text-xs">{COMPANY_DETAILS.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Trade Inquiries & Direct Actions */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Direct Trade Desk
            </h4>
            <div className="space-y-3 text-xs text-[#DDD4C6]/80 mb-6">
              <p>
                Direct dispatch across all Indian states and export crating for GCC &amp; European markets.
              </p>
              <div className="font-mono text-white">
                <a href={`tel:${COMPANY_DETAILS.phone1}`} className="hover:text-[#C8A97E]">
                  {COMPANY_DETAILS.phone1}
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={onQuoteClick}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#1E1511] bg-[#C8A97E] hover:bg-[#D8CDBC] rounded-lg transition-colors cursor-pointer text-center"
              >
                Request Trade Quote
              </button>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hi%20Mukta%20Salon%20Furniture,%20I%20want%20to%20inquire%20about%20salon%20furniture.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#DDD4C6]/60 gap-4">
          <div>
            © {new Date().getFullYear()} Mukta Salon Furniture Private Limited. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px]">Bawana Ind. Area, Delhi</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#C8A97E] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
