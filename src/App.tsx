import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AmbientAtmosphere } from './components/AmbientAtmosphere';
import { ChapterStoryTracker } from './components/ChapterStoryTracker';
import { Navbar } from './components/Navbar';
import { Hero3DCanvas } from './components/Hero3DCanvas';
import { ProductShowroom } from './components/ProductShowroom';
import { FeaturedComfort } from './components/FeaturedComfort';
import { CustomFurnitureAtelier } from './components/CustomFurnitureAtelier';
import { WhyMukta } from './components/WhyMukta';
import { AboutStory } from './components/AboutStory';
import { GalleryEditorial } from './components/GalleryEditorial';
import { InstagramShowcase } from './components/InstagramShowcase';
import { CustomerFeedback } from './components/CustomerFeedback';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteModal } from './components/QuoteModal';
import { PRODUCTS_DATA, ProductItem, COMPANY_DETAILS } from './data/products';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState({ product: '', finish: '' });
  const [contactRequirement, setContactRequirement] = useState('');

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuoteForProduct = (product: ProductItem, finishName: string) => {
    setSelectedProduct(null); // close product detail if open
    setQuotePrefill({
      product: `${product.name} (${product.category})`,
      finish: finishName,
    });
    setQuoteModalOpen(true);
  };

  const handleOpenCustomQuote = (customDetails: string) => {
    setQuotePrefill({
      product: customDetails,
      finish: 'Bespoke Formulation',
    });
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E1C1A] flex flex-col selection:bg-[#2A1D17] selection:text-[#FDFBF7]">
      {/* Bespoke Magnetic Desktop Pointer */}
      <CustomCursor />

      {/* Editorial Champagne Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Layered Animated Ambient Atmosphere (Floating Dust & Soft Light Orbs) */}
      <AmbientAtmosphere />

      {/* Bespoke Story Chapter Progress Indicator (Desktop Viewport) */}
      <ChapterStoryTracker />

      {/* Top Navigation Bar with Top Bar Contract */}
      <Navbar
        onQuoteClick={() => {
          setQuotePrefill({ product: 'Full Salon Suite Setup', finish: 'Standard' });
          setQuoteModalOpen(true);
        }}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Full-Screen Cinematic 3D Hero */}
        <section id="hero">
          <Hero3DCanvas
            onExploreClick={() => handleNavigate('collection')}
            onQuoteClick={() => {
              setQuotePrefill({ product: 'Architectural Salon Chair', finish: 'Cognac Saddle' });
              setQuoteModalOpen(true);
            }}
          />
        </section>

        {/* Product Showroom */}
        <ProductShowroom
          products={PRODUCTS_DATA}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onEnquireProduct={(product, finishName) => handleOpenQuoteForProduct(product, finishName || product.finishes[0]?.name || 'Standard')}
        />

        {/* Cinematic Featured Product Section: "Designed Around Comfort" */}
        <FeaturedComfort
          onEnquireNow={() => {
            setQuotePrefill({ product: 'Luna Ergonomic Hydro-Suite', finish: 'Espresso Hide' });
            setQuoteModalOpen(true);
          }}
        />

        {/* Custom Furniture Atelier: "Your Vision. Our Craft." */}
        <CustomFurnitureAtelier
          onOpenCustomQuote={handleOpenCustomQuote}
        />

        {/* Why MUKTA: 6 Pillars */}
        <WhyMukta />

        {/* Brand Story: "Built for Modern Beauty Spaces" */}
        <AboutStory />

        {/* Spatial Editorial Gallery */}
        <GalleryEditorial />

        {/* Living Social Presence: "Follow the MUKTA Journey" */}
        <InstagramShowcase />

        {/* Customer Feedback: "Loved Your MUKTA Experience?" */}
        <CustomerFeedback />

        {/* Contact & Trade Inquiry Section */}
        <ContactSection initialRequirement={contactRequirement} />
      </main>

      {/* Footer */}
      <Footer
        onQuoteClick={() => {
          setQuotePrefill({ product: 'Full Salon Suite Setup', finish: 'Standard' });
          setQuoteModalOpen(true);
        }}
        onNavigate={handleNavigate}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={handleOpenQuoteForProduct}
        />
      )}

      {/* Quick Trade Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        prefilledProduct={quotePrefill.product}
        prefilledFinish={quotePrefill.finish}
      />

      {/* Floating Quiet WhatsApp Button */}
      <a
        href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hi%20Mukta%20Salon%20Furniture,%20I%20am%20interested%20in%20inquiring%20about%20your%20products.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 flex items-center gap-2 group cursor-pointer"
        aria-label="Direct WhatsApp Chat with Mukta Salon Furniture"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold uppercase tracking-wider">
          Chat With Factory
        </span>
      </a>
    </div>
  );
}
