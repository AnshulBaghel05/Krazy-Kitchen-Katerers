import React, { useState } from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { siteConfig } from '../../config/site';
import { CheckCircle2, MapPin, Compass, ExternalLink } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isInteractiveMap, setIsInteractiveMap] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please write a short message.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section aria-label="Contact Us & Map" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Col 1: Two-column Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-[32px] p-8 sm:p-10 border border-[#DDDDDD]">
            <div className="space-y-2 mb-8">
              <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#E67A3E]">
                Direct Messages
              </span>
              <div>
                <ScriptHeading as="h2">Send Us a Note</ScriptHeading>
              </div>
              <p className="text-sm text-[#4A4A4A] pt-1">
                Have a question about an upcoming event, dietary specifics, or dining room buyouts? We reply promptly.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-[#9CBF77]/20 text-[#111111] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#9CBF77]" />
                </div>
                <h3 className="text-xl font-bold text-[#111111]">Message Sent!</h3>
                <p className="text-sm text-[#4A4A4A]">
                  Thank you, <span className="font-semibold text-[#111111]">{name}</span>. Our hospitality team has received your message and will respond to {email} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-bold uppercase tracking-wider text-[#111111] underline hover:text-[#EE9B3B]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errorMsg && (
                  <div role="alert" className="p-3 bg-[#F0C964]/30 text-[#111111] rounded-[14px] text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Jordan Scott"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="app-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="app-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                      Phone (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="(718) 555-0100"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="app-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell us what you have in mind..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="app-input resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#0A0A0A] hover:bg-[#222222] text-white font-bold py-3.5 px-6 rounded-full transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Col 2: Interactive Map & Location Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-[32px] overflow-hidden border border-[#DDDDDD] bg-[#F2F2F2] p-2">
              <div className="relative aspect-[4/3] w-full rounded-[26px] overflow-hidden bg-[#E5E3DF]">
                {!isInteractiveMap ? (
                  <div
                    onClick={() => setIsInteractiveMap(true)}
                    className="relative w-full h-full cursor-pointer group flex flex-col items-center justify-center p-6 text-center"
                    role="button"
                    tabIndex={0}
                    aria-label="Click to activate interactive Google Map"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setIsInteractiveMap(true);
                      }
                    }}
                  >
                    {/* Stylized vector map graphic */}
                    <div className="absolute inset-0 bg-[#E8E6DF] opacity-90">
                      <svg className="w-full h-full text-[#D4D1C8]" viewBox="0 0 400 300" fill="none">
                        <path d="M0 80 Q 200 120 400 60" stroke="white" strokeWidth="18" />
                        <path d="M120 0 L 150 300" stroke="white" strokeWidth="14" />
                        <path d="M280 0 L 260 300" stroke="white" strokeWidth="12" />
                        <path d="M0 220 Q 200 180 400 240" stroke="white" strokeWidth="14" />
                        <rect x="180" y="110" width="120" height="70" rx="10" fill="#D8D5CB" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-3">
                      <div className="w-14 h-14 rounded-full bg-[#EE9B3B] text-[#111111] flex items-center justify-center mx-auto shadow-none group-hover:scale-110 transition-transform">
                        <MapPin className="w-7 h-7" />
                      </div>
                      <h4 className="font-bold text-lg text-[#111111]">
                        {siteConfig.businessName}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#4A4A4A] max-w-xs font-medium">
                        {siteConfig.address}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] bg-white px-4 py-2 rounded-full border border-black/10 group-hover:bg-[#111111] group-hover:text-white transition-colors">
                        <span>Click to Interact with Map</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <iframe
                    title="Interactive Google Map Location"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.2185671043817!2d-73.9442!3d40.6698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQwJzExLjMiTiA3M8KwNTYnMzkuMSJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            {/* Direct Directions Action */}
            <div className="bg-[#F2F2F2] rounded-[28px] p-6 border border-[#DDDDDD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs uppercase tracking-wider font-bold text-[#4A4A4A]">
                  Navigation &amp; Transit
                </span>
                <p className="text-sm font-bold text-[#111111]">
                  Accessible via 3 &amp; 4 Subway Lines at Kingston Ave
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${siteConfig.placeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0A0A0A] hover:bg-[#222222] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors shrink-0"
              >
                <Compass className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
