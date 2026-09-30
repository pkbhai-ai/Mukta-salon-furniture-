import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, ArrowRight, Instagram } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';

interface NavbarProps {
  onQuoteClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Collection', target: 'collection' },
    { label: 'Featured Product', target: 'featured' },
    { label: 'Custom Craft', target: 'custom' },
    { label: 'About', target: 'about' },
    { label: 'Gallery', target: 'gallery' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#2A1D17]/10 shadow-xs'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Zone 1: Single element wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-2xl md:text-3xl font-serif font-light tracking-[0.22em] text-[#1E1C1A] hover:text-[#9E5B32] transition-colors cursor-pointer uppercase flex items-center gap-1.5"
          >
            <span>MUKTA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E] inline-block animate-pulse" />
          </button>

          {/* Zone 2: Clean text navigation links with smooth expanding underline */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-wider font-medium text-[#524940]">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                className="editorial-link py-1 cursor-pointer hover:text-[#1E1C1A]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={`tel:${COMPANY_DETAILS.phone1}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#554E46] hover:text-[#1E1C1A] transition-colors px-2 py-1.5 font-mono"
              title="Call Mukta Showroom"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#9E5B32]" />
              <span className="tabular-nums">{COMPANY_DETAILS.phone1}</span>
            </a>

            {/* Premium Instagram Header Icon with Subtle Hover & Tooltip */}
            <a
              href={COMPANY_DETAILS.instagram}
              target="_blank"
              rel="noreferrer"
              className="relative group p-2 text-[#554E46] hover:text-[#1E1C1A] hover:bg-[#2A1D17]/5 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer"
              title="Follow us on Instagram"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6 text-[#2A1D17]" />
              
              {/* Subtle Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#2A1D17] text-[#FDFBF7] text-[10px] font-medium tracking-wide whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md z-50">
                Follow us on Instagram
              </span>
            </a>

            <button
              onClick={onQuoteClick}
              className="px-5 py-2 text-xs font-medium tracking-wide text-white bg-[#2A1D17] hover:bg-[#1E1511] rounded-full transition-all duration-200 shadow-xs hover:shadow-md btn-cute cursor-pointer whitespace-nowrap"
            >
              Get a Quote
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2A1D17] hover:bg-[#2A1D17]/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FDFBF7] lg:hidden flex flex-col pt-24 px-8 pb-10 justify-between">
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#9E5B32] font-semibold">Navigation</span>
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleLinkClick(item.target)}
                  className="text-2xl font-serif font-light text-left text-[#1E1C1A] hover:text-[#9E5B32] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#8C8276]" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-[#2A1D17]/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onQuoteClick();
              }}
              className="w-full py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-white bg-[#2A1D17] rounded-lg shadow-md"
            >
              Request a Trade Quote
            </button>
            <a
              href={COMPANY_DETAILS.instagram}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-white border border-[#2A1D17]/10 flex items-center justify-between text-xs text-[#2A1D17] font-medium"
            >
              <span className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#9E5B32]" />
                <span>Follow @muktasalonfurniturepvtltd</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C8276]" />
            </a>

            <div className="text-xs text-[#6B6156] flex flex-col gap-1 text-center">
              <span>{COMPANY_DETAILS.address}</span>
              <span className="font-mono">{COMPANY_DETAILS.phone1}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
