import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { COMPANY_DETAILS, PRODUCTS_DATA } from '../data/products';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
  prefilledFinish?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  prefilledProduct = '',
  prefilledFinish = '',
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(prefilledProduct || 'Full Salon Suite Setup');
  const [quantity, setQuantity] = useState('4');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Mukta Salon Furniture, my name is ${name || 'Salon Partner'} (${businessName || 'Salon'}).\n\nI need a quote for: ${selectedProduct}\nFinish: ${prefilledFinish || 'Standard'}\nQuantity: ${quantity} units\nPhone: ${phone}`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl p-8 shadow-2xl border border-[#2A1D17]/15 animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EFE8DC] hover:bg-[#E4DBCB] text-[#2A1D17] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E5B32] font-semibold mb-1">
                <span>TRADE PRICING ENQUIRY</span>
              </div>
              <h3 className="text-2xl font-serif text-[#1E1C1A]">
                Request Official Quotation
              </h3>
              <p className="text-xs text-[#6B6156] mt-1">
                Direct manufacturing rates from Mukta Salon Furniture Pvt. Ltd.
              </p>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5A5046] font-semibold mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] focus:outline-none focus:ring-2 focus:ring-[#2A1D17]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5A5046] font-semibold mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] font-mono focus:outline-none focus:ring-2 focus:ring-[#2A1D17]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5A5046] font-semibold mb-1">
                  Estimated Units
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] font-mono focus:outline-none focus:ring-2 focus:ring-[#2A1D17]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5A5046] font-semibold mb-1">
                Salon / Business Name
              </label>
              <input
                type="text"
                placeholder="e.g. Studio 9 Beauty Lounge"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] focus:outline-none focus:ring-2 focus:ring-[#2A1D17]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5A5046] font-semibold mb-1">
                Selected Model
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] focus:outline-none focus:ring-2 focus:ring-[#2A1D17]"
              >
                <option value="Full Salon Suite Setup">Full Salon Suite Setup</option>
                {PRODUCTS_DATA.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1D17] hover:bg-[#1E1511] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Quotation Request</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
            </div>
            <h4 className="text-xl font-serif text-[#1E1C1A] mb-2">Quotation Registered</h4>
            <p className="text-xs text-[#5C534A] mb-6">
              Our Bawana Delhi technical desk has received your request for <strong>{quantity}x {selectedProduct}</strong>.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-[#6B6156] hover:text-[#1E1C1A]"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
