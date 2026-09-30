import React, { useState } from 'react';
import { Eye, X, ZoomIn } from 'lucide-react';
import { CuteEditorialHeading } from './AnimatedText';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  aspect: string;
  image: string;
  description: string;
}

export const GalleryEditorial: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Architectural Minimalist Salon',
      category: 'Salons & Spas',
      aspect: 'aspect-4/3',
      image: '/src/assets/images/hero_salon_chair_1790757004757.jpg',
      description: 'Private VIP styling bay fitted with custom Cognac leather chairs and brushed champagne brass hardware in South Delhi.',
    },
    {
      id: 'g2',
      title: 'Luna Deep Basin Hydro-Suite',
      category: 'Salons & Spas',
      aspect: 'aspect-3/4',
      image: '/src/assets/images/shampoo_station_luna_1790757030123.jpg',
      description: 'Shampoo stations integrated into calm travertine spa partition walls with concealed plumbing fixtures.',
    },
    {
      id: 'g3',
      title: 'Baleno Barber Lounge Installation',
      category: 'Barber Lounges',
      aspect: 'aspect-4/3',
      image: '/src/assets/images/barber_chair_baleno_1790757058220.jpg',
      description: 'Gentlemen’s grooming club in Gurugram featuring cast-chrome Baleno chairs with dark diamond quilting.',
    },
    {
      id: 'g4',
      title: 'Hand-Stitched Saddle Seam Detail',
      category: 'Craft & Materials',
      aspect: 'aspect-16/9',
      image: '/src/assets/images/leather_craft_detail_1790757070053.jpg',
      description: 'Macro inspection of hand-buffed dark walnut timber joining full-grain saddle leather upholstery.',
    },
    {
      id: 'g5',
      title: 'Orion Pipeless Hydrotherapy Spa',
      category: 'Salons & Spas',
      aspect: 'aspect-4/3',
      image: '/src/assets/images/pedicure_chair_orion_1790757045832.jpg',
      description: 'Nail studio installation with stone composite foot basins and integrated swivel manicure trays.',
    },
    {
      id: 'g6',
      title: 'Boutique Arched Mirror Styling Studio',
      category: 'Salons & Spas',
      aspect: 'aspect-square',
      image: '/src/assets/images/insta_salon_interior_1790759665860.jpg',
      description: 'Architectural boutique styling space featuring backlit champagne arches and custom Mukta styling chairs.',
    },
  ];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 px-6 lg:px-12 bg-[#F8F5EE] border-t border-[#2A1D17]/8">
      <div className="max-w-7xl mx-auto">
        {/* Header with CuteEditorialHeading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <CuteEditorialHeading
            kicker="SPATIAL EDITORIAL"
            titlePrimary="Spaces Transformed by"
            titleAccent="MUKTA Craftsmanship."
          />

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Salons & Spas', 'Barber Lounges', 'Craft & Materials'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 text-xs font-medium tracking-wide rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer btn-cute ${
                  activeCategory === tab
                    ? 'bg-[#2A1D17] text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-[#6B6156] border border-[#2A1D17]/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden bg-white border border-[#2A1D17]/10 shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-[#EFE9DF]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-base font-serif font-normal text-white">
                        {item.title}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiet caption underneath */}
              <div className="p-4 bg-[#FDFBF7] flex items-center justify-between text-xs text-[#7A7065]">
                <span className="font-serif text-[#1E1C1A] text-sm">{item.title}</span>
                <span className="font-mono text-[11px] text-[#9E5B32]">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1E1511] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 w-full bg-black">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#2A1D17] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#C8A97E] block mb-1">
                  {selectedImage.category}
                </span>
                <h3 className="text-xl font-serif">{selectedImage.title}</h3>
                <p className="text-xs text-[#DDD4C6]/80 mt-1 max-w-xl">{selectedImage.description}</p>
              </div>
              <a
                href={`https://wa.me/919818216443?text=Inquiry%20regarding%20gallery%20installation:%20${encodeURIComponent(selectedImage.title)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-[#C8A97E] hover:bg-[#D8CDBC] text-[#2A1D17] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap text-center"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
