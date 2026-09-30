import React, { useState } from 'react';
import { COMPANY_DETAILS, PRODUCTS_DATA } from '../data/products';
import { Phone, MessageSquare, Mail, MapPin, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CuteEditorialHeading, ScrollTextReveal } from './AnimatedText';

interface ContactSectionProps {
  initialRequirement?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialRequirement = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    requirement: initialRequirement || 'Full Salon Setup (Styling Chairs + Wash Units)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleForwardToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Mukta Salon Furniture, my name is ${formData.name || 'a salon owner'} from "${formData.businessName || 'Salon Project'}".\n\nRequirement: ${formData.requirement}\nPhone: ${formData.phone}\nMessage: ${formData.message || 'Please provide quotation catalog.'}`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Commercial Information & Direct Lines */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <CuteEditorialHeading
                kicker="COMMERCIAL DESK · BAWANA DELHI"
                titlePrimary="Start Your"
                titleAccent="Salon Commission."
                description="Connect directly with our manufacturing desk in Delhi. Whether you are outfitting a 3-station boutique or a multi-city luxury salon chain, our engineering team provides transparent trade pricing and architectural consultation."
              />

              {/* Direct Touchpoints List */}
              <div className="space-y-6 pt-6 border-t border-[#2A1D17]/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center shrink-0 text-[#2A1D17]">
                    <MapPin className="w-5 h-5 text-[#9E5B32]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold tracking-wider text-[#7A7065]">
                      Factory & Experience Studio
                    </h3>
                    <p className="text-sm text-[#1E1C1A] font-medium mt-0.5">
                      {COMPANY_DETAILS.address}
                    </p>
                    <span className="text-[11px] font-mono text-[#8C8276] block mt-0.5">
                      GSTIN: {COMPANY_DETAILS.gstin}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center shrink-0 text-[#2A1D17]">
                    <Phone className="w-5 h-5 text-[#9E5B32]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold tracking-wider text-[#7A7065]">
                      Direct Telephone Line
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:gap-3 text-sm text-[#1E1C1A] font-mono font-medium mt-0.5">
                      <a href={`tel:${COMPANY_DETAILS.phone1}`} className="hover:text-[#9E5B32] transition-colors">
                        {COMPANY_DETAILS.phone1}
                      </a>
                      <span className="hidden sm:inline text-[#8C8276]">/</span>
                      <a href={`tel:${COMPANY_DETAILS.phone2}`} className="hover:text-[#9E5B32] transition-colors">
                        {COMPANY_DETAILS.phone2}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center shrink-0 text-[#2A1D17]">
                    <MessageSquare className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold tracking-wider text-[#7A7065]">
                      Instant WhatsApp Technical Desk
                    </h3>
                    <a
                      href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hi%20Mukta%20Salon%20Furniture,%20I%20would%20like%20to%20request%20a%20commercial%20quote.`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#1E1C1A] hover:text-[#25D366] font-medium transition-colors inline-flex items-center gap-1.5 mt-0.5"
                    >
                      <span>Chat on WhatsApp (+91 9818216443)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center shrink-0 text-[#2A1D17]">
                    <Mail className="w-5 h-5 text-[#9E5B32]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold tracking-wider text-[#7A7065]">
                      Official Email Inquiry
                    </h3>
                    <a
                      href={`mailto:${COMPANY_DETAILS.email}`}
                      className="text-sm text-[#1E1C1A] hover:text-[#9E5B32] transition-colors mt-0.5 block"
                    >
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Guarantee Box */}
            <div className="p-4 rounded-xl bg-[#F6F2EB] border border-[#2A1D17]/8 text-xs text-[#6B6156] mt-8 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#9E5B32] shrink-0" />
              <span>
                Protected under Mukta 3-year commercial structural warranty &amp; nationwide parts support.
              </span>
            </div>
          </div>

          {/* Right: Premium Inquiry Form */}
          <div className="lg:col-span-7 bg-[#F8F5EE] p-8 sm:p-10 rounded-3xl border border-[#2A1D17]/10 shadow-lg">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-[#1E1C1A] mb-2 font-normal">
                    Request an Official Trade Quotation
                  </h3>
                  <p className="text-xs text-[#7A7065]">
                    Fill in your project specifications below. Our sales engineering team replies within 4 business hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A5046] font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] focus:outline-none focus:ring-2 focus:ring-[#2A1D17] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A5046] font-semibold mb-2">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] focus:outline-none focus:ring-2 focus:ring-[#2A1D17] transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A5046] font-semibold mb-2">
                    Business / Salon Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aura Luxury Salon & Spa"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] focus:outline-none focus:ring-2 focus:ring-[#2A1D17] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A5046] font-semibold mb-2">
                    Requirement Type
                  </label>
                  <select
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] focus:outline-none focus:ring-2 focus:ring-[#2A1D17] transition-all cursor-pointer"
                  >
                    <option value="Full Salon Setup (Styling Chairs + Wash Units)">
                      Full Salon Setup (Styling Chairs + Wash Units)
                    </option>
                    <option value="Shampoo Stations Batch (Luna / Lina / Cubic)">
                      Shampoo Stations Batch (Luna / Lina / Cubic)
                    </option>
                    <option value="Pedicure & Manicure Stations (Orion / Imporio)">
                      Pedicure &amp; Manicure Stations (Orion / Imporio)
                    </option>
                    <option value="Executive Barber Chairs (Baleno / Oslo)">
                      Executive Barber Chairs (Baleno / Oslo)
                    </option>
                    <option value="Multipurpose Chairs (Honeycomb / Kelly)">
                      Multipurpose Chairs (Honeycomb / Kelly)
                    </option>
                    <option value="Bespoke Custom Furniture Project">
                      Bespoke Custom Furniture Project
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A5046] font-semibold mb-2">
                    Message &amp; Project Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe quantity required, city/state for delivery, target opening date, or color preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#2A1D17]/15 text-sm text-[#1E1C1A] focus:outline-none focus:ring-2 focus:ring-[#2A1D17] transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1D17] hover:bg-[#1E1511] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span>Processing Request...</span>
                    ) : (
                      <>
                        <span>Submit Quotation Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[#8C8276] text-center mt-2.5">
                    No spam. We provide direct manufacturer wholesale quotes and CAD files.
                  </p>
                </div>
              </form>
            ) : (
              <div className="py-12 px-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-700" />
                </div>

                <span className="text-xs uppercase font-mono tracking-widest text-[#9E5B32] mb-2 font-semibold">
                  QUOTATION REQUEST RECORDED
                </span>

                <h3 className="text-3xl font-serif text-[#1E1C1A] mb-3">
                  Thank You, {formData.name || 'Valued Client'}
                </h3>

                <p className="text-sm text-[#5C534A] max-w-md leading-relaxed mb-8">
                  Your inquiry regarding <strong className="text-[#2A1D17]">{formData.requirement}</strong> has been transmitted to our Delhi technical estimating desk. An engineer will reach out to <strong className="font-mono text-[#2A1D17]">{formData.phone}</strong> promptly.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <button
                    onClick={handleForwardToWhatsApp}
                    className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Connect</span>
                  </button>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-3 px-5 bg-white text-[#2A1D17] border border-[#2A1D17]/15 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
