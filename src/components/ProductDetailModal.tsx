import React, { useState, useEffect } from 'react';
import { ProductItem, COMPANY_DETAILS } from '../data/products';
import { X, Check, MessageSquare, FileDown, ShieldCheck, Clock, Ruler, Sparkles, Send, Share2, Copy } from 'lucide-react';
import { OptimizedProductImage } from './OptimizedProductImage';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestQuote: (product: ProductItem, selectedFinish: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
}) => {
  if (!product) return null;

  const [activeFinishIndex, setActiveFinishIndex] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Dynamically update document title while inspecting product
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `MUKTA | ${product.name} (${product.category})`;
    return () => {
      document.title = prevTitle;
    };
  }, [product]);

  const currentFinish = product.finishes[activeFinishIndex] || product.finishes[0];

  const handleCopyLink = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/#collection?product=${product.id}` : '';
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2200);
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/#collection?product=${product.id}` : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `MUKTA | ${product.name}`,
          text: `${product.name} - ${product.tagline}. Architectural salon furniture by Mukta Salon Furniture Pvt Ltd.`,
          url: url,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent(
      `Hello Mukta Salon Furniture, I am interested in inquiring about the "${product.name}" (${product.category}) in ${currentFinish.name} finish. Please provide price quotation and specifications.`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${message}`, '_blank');
  };

  const handleDownloadBrochure = () => {
    // Generate clean printable architectural specification text
    const specSheetText = `=====================================================
MUKTA SALON FURNITURE PRIVATE LIMITED
ARCHITECTURAL SPECIFICATION SHEET
=====================================================
PRODUCT: ${product.name.toUpperCase()}
CATEGORY: ${product.category}
TAGLINE: ${product.tagline}

MANUFACTURER:
${COMPANY_DETAILS.name}
${COMPANY_DETAILS.address}
Phone: ${COMPANY_DETAILS.phone1} / ${COMPANY_DETAILS.phone2}
GSTIN: ${COMPANY_DETAILS.gstin}
Website: ${COMPANY_DETAILS.website}

-----------------------------------------------------
1. DIMENSIONS & WEIGHT
-----------------------------------------------------
- Width: ${product.dimensions.width}
- Depth: ${product.dimensions.depth}
- Height: ${product.dimensions.height}
${product.dimensions.seatHeight ? `- Seat Height: ${product.dimensions.seatHeight}` : ''}

-----------------------------------------------------
2. KEY TECHNICAL SPECIFICATIONS
-----------------------------------------------------
${product.keySpecs.map((s) => `• ${s.label}: ${s.value}`).join('\n')}

-----------------------------------------------------
3. MATERIAL COMPOSITION
-----------------------------------------------------
${product.materials.map((m) => `• ${m}`).join('\n')}

-----------------------------------------------------
4. CORE ARCHITECTURAL FEATURES
-----------------------------------------------------
${product.features.map((f) => `• ${f}`).join('\n')}

-----------------------------------------------------
5. FINISHES & UPHOLSTERY OPTIONS
-----------------------------------------------------
${product.finishes.map((fn) => `• ${fn.name} (${fn.material}) - Hex: ${fn.colorHex}`).join('\n')}

-----------------------------------------------------
6. COMMERCIAL TERMS & APPLICATION
-----------------------------------------------------
- Application: ${product.application}
- Lead Time: ${product.leadTime}
- Warranty: ${product.warranty}
- Quotation Status: Trade Pricing on Request

=====================================================
Issued by Mukta Salon Furniture Technical Desk.
All rights reserved © 2026.
=====================================================`;

    const blob = new Blob([specSheetText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MUKTA_${product.name.replace(/\s+/g, '_')}_SpecSheet.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#2A1D17]/15 overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#2A1D17] border border-[#2A1D17]/10 flex items-center justify-center transition-transform hover:scale-105 shadow-md cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Left Side: Large Visual Presentation with Interactive Finish Swatch preview */}
          <div className="lg:col-span-6 bg-[#EFE9DF] relative p-8 flex flex-col justify-between overflow-hidden">
            {/* Background Studio Glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${currentFinish.colorHex} 0%, transparent 70%)`,
              }}
            />

            <div className="relative z-10 flex items-center justify-between text-xs text-[#61574C]">
              <span className="font-semibold uppercase tracking-wider">{product.category}</span>
              <span className="font-mono text-[#8C8276]">{product.id}</span>
            </div>

            <div className="relative z-10 my-auto py-6 flex flex-col items-center">
              <div className="w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white">
                <OptimizedProductImage
                  src={product.image}
                  alt={product.name}
                  objectFit="contain"
                  padding="p-4 sm:p-6"
                  priority={true}
                  containerClassName="bg-white"
                />
              </div>

              {/* Selected Finish Indicator Pill */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#2A1D17]/10 shadow-xs text-xs text-[#2A1D17]">
                <span
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: currentFinish.colorHex }}
                />
                <span className="font-medium">{currentFinish.name}</span>
                <span className="text-[#8C8276]">({currentFinish.material})</span>
              </div>
            </div>

            {/* Quick Badges (Clean text, no pill spam) */}
            <div className="relative z-10 pt-4 border-t border-[#2A1D17]/10 grid grid-cols-2 gap-4 text-xs text-[#524940]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9E5B32]" />
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9E5B32]" />
                <span>Lead time: {product.leadTime}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Contiguous Purchase / Specification Module */}
          <div className="lg:col-span-6 p-8 lg:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E5B32] font-semibold mb-2">
                <span>COMMERCIAL GRADE SALON SPEC</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1C1A] font-light mb-3">
                {product.name}
              </h2>

              <p className="text-sm text-[#5C534A] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Finishes Selector */}
              <div className="mb-6 p-4 rounded-xl bg-[#F6F2EB] border border-[#2A1D17]/8">
                <div className="flex items-center justify-between text-xs text-[#6B6156] mb-3 font-medium">
                  <span>Available Custom Finishes:</span>
                  <span className="text-[#2A1D17] font-semibold">{currentFinish.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.finishes.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFinishIndex(i)}
                      className={`w-9 h-9 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                        activeFinishIndex === i
                          ? 'ring-2 ring-offset-2 ring-[#2A1D17] scale-110'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: f.colorHex }}
                      title={`${f.name} - ${f.material}`}
                    >
                      {activeFinishIndex === i && (
                        <Check className="w-4 h-4 text-white drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A7065] font-semibold mb-3">
                  <Ruler className="w-3.5 h-3.5 text-[#9E5B32]" />
                  <span>Dimensional Footprint</span>
                </div>
                <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-xl border border-[#2A1D17]/8 text-center text-xs">
                  <div>
                    <span className="text-[#8C8276] block text-[10px] uppercase">Width</span>
                    <span className="font-semibold text-[#1E1C1A]">{product.dimensions.width}</span>
                  </div>
                  <div>
                    <span className="text-[#8C8276] block text-[10px] uppercase">Depth</span>
                    <span className="font-semibold text-[#1E1C1A]">{product.dimensions.depth}</span>
                  </div>
                  <div>
                    <span className="text-[#8C8276] block text-[10px] uppercase">Height</span>
                    <span className="font-semibold text-[#1E1C1A]">{product.dimensions.height}</span>
                  </div>
                </div>
              </div>

              {/* Technical Key Specifications */}
              <div className="mb-6">
                <div className="text-xs uppercase tracking-wider text-[#7A7065] font-semibold mb-3">
                  Engineering Specifications
                </div>
                <div className="divide-y divide-[#2A1D17]/8 border-y border-[#2A1D17]/8 text-xs">
                  {product.keySpecs.map((spec, i) => (
                    <div key={i} className="py-2 flex items-center justify-between">
                      <span className="text-[#6B6156]">{spec.label}</span>
                      <span className="font-medium text-[#1E1C1A] font-mono">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Application */}
              <div className="mb-6 text-xs text-[#6B6156]">
                <span className="font-semibold text-[#2A1D17]">Recommended Environment: </span>
                <span>{product.application}</span>
              </div>
            </div>

            {/* Sticky Actions & Download */}
            <div className="pt-6 border-t border-[#2A1D17]/10 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onRequestQuote(product, currentFinish.name)}
                  className="w-full sm:flex-1 py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1D17] hover:bg-[#1E1511] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request a Trade Quote</span>
                </button>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full sm:w-auto py-3.5 px-5 text-xs font-semibold text-[#1E1C1A] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Enquiry</span>
                </button>
              </div>

              <button
                onClick={handleDownloadBrochure}
                className="py-2.5 px-4 text-xs font-medium text-[#6B6156] hover:text-[#1E1C1A] hover:bg-[#EFE8DC]/50 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-dashed border-[#2A1D17]/15"
              >
                <FileDown className="w-3.5 h-3.5 text-[#9E5B32]" />
                <span>{downloadSuccess ? 'Specification Sheet Downloaded ✓' : 'Download Architectural Spec Sheet (.txt)'}</span>
              </button>

              {/* Share This Product Section */}
              <div className="pt-3 border-t border-[#2A1D17]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
                <span className="text-[#7A7065] flex items-center gap-1.5 font-medium">
                  <Share2 className="w-3.5 h-3.5 text-[#9E5B32]" />
                  <span>Share this product:</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFE8DC]/70 hover:bg-[#EAE0D1] text-[#2A1D17] text-[11px] font-medium transition-colors cursor-pointer"
                    title="Copy product link to clipboard"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#9E5B32]" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A1D17] hover:bg-[#1E1511] text-[#FDFBF7] text-[11px] font-medium transition-colors cursor-pointer shadow-2xs"
                    title="Share product with design team"
                  >
                    <Share2 className="w-3 h-3 text-[#C8A97E]" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
