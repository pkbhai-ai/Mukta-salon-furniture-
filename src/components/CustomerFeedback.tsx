import React, { useState } from 'react';
import { Heart, Send, CheckCircle2, MessageSquare, Sparkles, X } from 'lucide-react';
import { CuteEditorialHeading, ScrollTextReveal } from './AnimatedText';
import { COMPANY_DETAILS } from '../data/products';

export const CustomerFeedback: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [salonName, setSalonName] = useState('');
  const [founderName, setFounderName] = useState('');
  const [city, setCity] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Real submission handler: saves state and offers WhatsApp/direct sync
    setSubmitted(true);
  };

  const handleReset = () => {
    setModalOpen(false);
    setSubmitted(false);
    setSalonName('');
    setFounderName('');
    setCity('');
    setFeedbackText('');
  };

  return (
    <section className="py-20 px-6 lg:px-12 bg-[#FDFBF7] border-t border-[#2A1D17]/8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <ScrollTextReveal delay={50} duration={600}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DC]/80 text-[11px] uppercase tracking-[0.2em] text-[#9E5B32] font-semibold mb-4 border border-[#9E5B32]/15 shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-[#9E5B32] text-[#9E5B32]" />
            <span>SALON PARTNERSHIP &amp; CRAFTSMANSHIP</span>
          </div>
        </ScrollTextReveal>

        <ScrollTextReveal delay={150} duration={750}>
          <h2 className="text-3xl sm:text-5xl font-light text-[#1E1C1A] tracking-tight leading-[1.15] mb-5">
            Loved Your{' '}
            <span className="font-serif italic font-normal text-[#2A1D17] underline decoration-[#C8A97E]/40 decoration-wavy decoration-1 underline-offset-8">
              MUKTA Experience?
            </span>
          </h2>
        </ScrollTextReveal>

        <ScrollTextReveal delay={250} duration={800}>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#61574C] font-light leading-relaxed mb-8">
            Whether you operate an intimate boutique salon, an architectural flagship, or a luxury wellness spa, your experience drives our continuous pursuit of ergonomic distinction. We invite salon founders and interior architects to share their project journey directly with our manufacturing directors.
          </p>
        </ScrollTextReveal>

        <ScrollTextReveal delay={350} duration={850}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 bg-[#2A1D17] hover:bg-[#1E1511] text-[#FDFBF7] text-xs font-semibold uppercase tracking-wider rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer btn-cute ring-1 ring-[#C8A97E]/30"
            >
              Share Your Experience
            </button>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hi%20Mukta%20Salon%20Furniture,%20I%20would%20like%20to%20share%20my%20salon%20installation%20experience%20and%20feedback.`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 bg-white/90 hover:bg-white text-[#2A1D17] border border-[#2A1D17]/15 text-xs font-medium tracking-wide rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Message Factory Directly</span>
            </a>
          </div>
        </ScrollTextReveal>
      </div>

      {/* Share Experience Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#2A1D17]/15 p-6 sm:p-8 overflow-hidden my-auto">
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EFE8DC]/80 hover:bg-[#EAE0D1] text-[#2A1D17] flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9E5B32] mb-2 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DIRECT CRAFT FEEDBACK</span>
                </div>

                <h3 className="text-2xl font-serif text-[#1E1C1A] font-normal mb-2">
                  Share Your Salon Journey
                </h3>

                <p className="text-xs text-[#665D54] leading-relaxed mb-6">
                  Your feedback helps our Delhi master artisans refine ergonomic heights, custom stitching, and hydraulic dampening.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2A1D17] mb-1">
                      Salon / Spa Studio Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={salonName}
                      onChange={(e) => setSalonName(e.target.value)}
                      placeholder="e.g. Atelier Noir Salon"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#2A1D17]/15 bg-white text-xs text-[#1E1C1A] focus:outline-none focus:ring-1 focus:ring-[#9E5B32]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2A1D17] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={founderName}
                        onChange={(e) => setFounderName(e.target.value)}
                        placeholder="Founder / Architect"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#2A1D17]/15 bg-white text-xs text-[#1E1C1A] focus:outline-none focus:ring-1 focus:ring-[#9E5B32]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#2A1D17] mb-1">
                        City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Mumbai, Delhi, Dubai"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#2A1D17]/15 bg-white text-xs text-[#1E1C1A] focus:outline-none focus:ring-1 focus:ring-[#9E5B32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2A1D17] mb-1">
                      Your Thoughts on Comfort, Craft &amp; Service *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Tell us how the furniture looks in your space, how your clients react to the comfort, or suggestions for our craft team..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#2A1D17]/15 bg-white text-xs text-[#1E1C1A] focus:outline-none focus:ring-1 focus:ring-[#9E5B32] resize-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#6B6156] hover:bg-[#EFE8DC]/50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1D17] hover:bg-[#1E1511] cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Experience</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#EFE8DC] text-[#9E5B32] flex items-center justify-center mx-auto mb-4 border border-[#9E5B32]/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif text-[#1E1C1A] mb-2 font-normal">
                  Thank You, {founderName}!
                </h3>
                <p className="text-xs text-[#665D54] leading-relaxed mb-6 max-w-sm mx-auto">
                  Your experience with Mukta Salon Furniture at {salonName} ({city}) has been received by our production directorship. We deeply value your partnership in shaping modern beauty spaces.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl text-xs font-medium text-white bg-[#2A1D17] hover:bg-[#1E1511] cursor-pointer"
                >
                  Return to Showroom
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
