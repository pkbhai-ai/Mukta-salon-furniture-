import React, { useState, useEffect, useRef } from 'react';
import { ProductItem, SALON_CATEGORIES } from '../data/products';
import { ArrowUpRight, Eye, Sparkles } from 'lucide-react';
import { CuteEditorialHeading, ScrollTextReveal } from './AnimatedText';
import { OptimizedProductImage } from './OptimizedProductImage';

interface ProductShowroomProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem, finishName?: string) => void;
}

interface ProductCardProps {
  product: ProductItem;
  onSelectProduct: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem, finishName?: string) => void;
}

const ParallaxProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onEnquireProduct,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, xPercent: 50, yPercent: 50 });
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]?.name || 'Standard');

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only compute when element is within or adjacent to the viewport
      if (rect.bottom > -80 && rect.top < windowHeight + 80) {
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const normalized = (cardCenter - viewportCenter) / (windowHeight / 2);
        // Subtle controlled parallax displacement between -22px and +22px
        const subtleShift = Math.max(-22, Math.min(22, normalized * 18));
        setOffsetY(subtleShift);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Subtle tilt: max ±5 degrees for elegant luxury feel
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = -((y / rect.height) - 0.5) * 8;

    setTilt({ rotateX, rotateY, xPercent, yPercent });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, xPercent: 50, yPercent: 50 });
  };

  return (
    <div
      ref={cardRef}
      data-cursor="VIEW"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translate3d(0, ${isHovered ? -8 : 0}px, 0)`,
        transition: isHovered
          ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
      }}
      className="group relative bg-[#FDFBF7] rounded-3xl border border-[#2A1D17]/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-300 ring-1 ring-black/5"
    >
      {/* Dynamic light reflection following cursor over the card surface */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 320px at ${tilt.xPercent}% ${tilt.yPercent}%, rgba(200, 169, 126, 0.18) 0%, transparent 80%)`,
        }}
      />

      {/* Image Container with Scroll-based Parallax Depth */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[4/3] w-full bg-[#EFE9DF] overflow-hidden cursor-pointer"
      >
        <OptimizedProductImage
          src={product.image}
          alt={`${product.name} - ${product.category}`}
          objectFit="contain"
          padding="p-3 sm:p-4"
          zoomOnHover={true}
          style={{
            transform: `translate3d(0, ${offsetY}px, 0)`,
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
          containerClassName="h-full"
        />

        {/* Soft Vignette / Lighting Shift Gradient */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
            isHovered
              ? 'bg-gradient-to-t from-[#2A1D17]/40 via-transparent to-transparent opacity-100'
              : 'bg-transparent opacity-0'
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-[#2A1D17] font-medium z-10">
          <span className="bg-[#FDFBF7]/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold shadow-xs border border-white/60">
            {product.category}
          </span>
          <span className="text-[11px] font-mono text-[#554E46] bg-[#FDFBF7]/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-white/60">
            {product.leadTime.split(' ')[0]} {product.leadTime.split(' ')[1]}
          </span>
        </div>

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <div className="px-5 py-2.5 bg-[#2A1D17]/90 text-[#FDFBF7] text-xs font-semibold tracking-wider uppercase rounded-xl backdrop-blur-md flex items-center gap-2 shadow-2xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-200 border border-[#C8A97E]/30">
            <Eye className="w-4 h-4 text-[#C8A97E]" />
            <span>Inspect Details</span>
          </div>
        </div>
      </div>

      {/* Card Content & Editorial Typography */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-[#FDFBF7]">
        <div>
          {/* Metadata with · separator */}
          <div className="flex items-center gap-2 text-xs text-[#7A7065] mb-2 font-mono">
            <span>{product.dimensions.width.split(' ')[0]} wide</span>
            <span aria-hidden="true">·</span>
            <span>{product.keySpecs[0]?.value}</span>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="text-2xl sm:text-3xl font-serif text-[#1E1C1A] group-hover:text-[#9E5B32] transition-colors cursor-pointer mb-2 font-normal"
          >
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#5C534A] leading-relaxed line-clamp-2 mb-5">
            {product.tagline}
          </p>

          {/* Interactive Finishes Preview Bar */}
          <div className="pt-3 border-t border-[#2A1D17]/8 mb-5">
            <div className="flex items-center justify-between text-xs text-[#7A7065] mb-2">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#9E5B32]" />
                <span>Finish:</span>
              </span>
              <span className="font-medium text-[#2A1D17] text-[11px] truncate max-w-[150px]">
                {selectedFinish}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {product.finishes.map((f, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFinish(f.name);
                  }}
                  className={`w-5 h-5 rounded-full transition-all duration-200 cursor-pointer ${
                    selectedFinish === f.name
                      ? 'ring-2 ring-offset-2 ring-[#2A1D17] scale-110'
                      : 'opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: f.colorHex }}
                  title={f.name}
                  aria-label={`Select ${f.name}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => onSelectProduct(product)}
            className="flex-1 py-3 px-3 text-xs font-medium tracking-wide text-[#2A1D17] bg-[#EFE8DC]/80 hover:bg-[#EAE0D1] rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer btn-cute border border-[#2A1D17]/8"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onEnquireProduct(product, selectedFinish)}
            className="py-3 px-5 text-xs font-medium tracking-wide text-white bg-[#2A1D17] hover:bg-[#1E1511] rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shadow-xs btn-cute ring-1 ring-[#C8A97E]/30"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductShowroom: React.FC<ProductShowroomProps> = ({
  products,
  onSelectProduct,
  onEnquireProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections');

  // Dynamically update document title based on selected product category
  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'All Collections') {
      document.title = `MUKTA | ${selectedCategory}`;
    } else {
      document.title = 'MUKTA | Premium Salon & Spa Furniture Manufacturer';
    }
  }, [selectedCategory]);

  const filteredProducts = selectedCategory === 'All Collections'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="collection" className="py-24 px-6 lg:px-12 bg-[#F8F5EE] border-t border-[#2A1D17]/8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with CuteEditorialHeading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <CuteEditorialHeading
            kicker="MUKTA SHOWROOM"
            titlePrimary="Curated Salon &"
            titleAccent="Wellness Collections."
          />
          <ScrollTextReveal delay={200} duration={800} className="max-w-md">
            <p className="text-sm sm:text-base text-[#665D54] font-light leading-relaxed">
              Architectural seating and wash units manufactured in Delhi for premier salons across India. Built with heavy-gauge chassis, hydraulic damping, and stain-resistant finishes.
            </p>
          </ScrollTextReveal>
        </div>

        {/* Category Filter Tabs with Friendly Rounded Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {SALON_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-xs font-medium tracking-wide rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer btn-cute ${
                  isActive
                    ? 'bg-[#2A1D17] text-[#FDFBF7] shadow-sm ring-1 ring-[#C8A97E]/40'
                    : 'bg-white/85 hover:bg-white text-[#5B5248] border border-[#2A1D17]/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Editorial Product Grid with Parallax-Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => (
            <ParallaxProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onEnquireProduct={onEnquireProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
