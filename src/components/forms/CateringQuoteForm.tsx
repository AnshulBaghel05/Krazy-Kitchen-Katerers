import React, { useState } from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { CheckCircle2 } from 'lucide-react';

interface CateringQuoteFormProps {
  initialEventType?: string;
  initialPackage?: string;
}

export const CateringQuoteForm: React.FC<CateringQuoteFormProps> = ({
  initialEventType = 'corporate',
  initialPackage = '',
}) => {
  const [eventType, setEventType] = useState(initialEventType);
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('35');
  const [budgetBand, setBudgetBand] = useState('$35 - $50 per guest');
  const [venuePostcode, setVenuePostcode] = useState('');
  const [dietaryNeeds, setDietaryNeeds] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter a contact phone number.');
      return;
    }
    if (!date) {
      setErrorMsg('Please select your preferred event date.');
      return;
    }

    setSubmitting(true);
    // Simulate real quote dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="quote-form" aria-label="Request Catering Quote" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-[32px] p-8 sm:p-12 border border-[#DDDDDD]">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#E67A3E]">
              Personalized Proposals
            </span>
            <div>
              <ScriptHeading as="h2">Request a Catering Quote</ScriptHeading>
            </div>
            <p className="text-sm sm:text-base text-[#4A4A4A] max-w-lg mx-auto pt-2">
              Tell us about your gathering. Our catering captain will send a detailed line-item proposal within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#9CBF77]/20 text-[#111111] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#9CBF77]" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111]">Quote Request Sent!</h3>
              <p className="text-sm sm:text-base text-[#4A4A4A] max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#111111]">{name}</span>. We received your request for an estimated <span className="font-semibold text-[#111111]">{guests} guests</span> on <span className="font-semibold text-[#111111]">{date}</span>. Chef Nicole and our catering team are preparing your custom quote.
              </p>
              <p className="text-xs text-[#777777]">
                A copy has been queued for {email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-[#111111] underline hover:text-[#EE9B3B] cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {errorMsg && (
                <div role="alert" className="p-3 bg-[#F0C964]/30 text-[#111111] rounded-[14px] text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Event Type & Target Package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-event-type" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Event Type
                  </label>
                  <select
                    id="quote-event-type"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="app-input"
                  >
                    <option value="corporate">Corporate Lunch / Conference</option>
                    <option value="wedding">Wedding / Gala Banquet</option>
                    <option value="birthday">Milestone Birthday / Family Reunion</option>
                    <option value="social">Social Gathering / Block Party</option>
                    <option value="other">Other Celebration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-package" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Preferred Package (Optional)
                  </label>
                  <select
                    id="quote-package"
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="app-input"
                  >
                    <option value="">Custom Menu (Decide with Chef)</option>
                    <option value="The Island Executive Buffet">The Island Executive Buffet ($36/pp)</option>
                    <option value="The Heritage Creole Banquet">The Heritage Creole Banquet ($58/pp)</option>
                    <option value="The Royal Caribbean Wedding Gala">The Royal Caribbean Wedding Gala ($88/pp)</option>
                  </select>
                </div>
              </div>

              {/* Date, Guests, Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="quote-date" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Event Date
                  </label>
                  <input
                    id="quote-date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="app-input"
                  />
                </div>

                <div>
                  <label htmlFor="quote-guests" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Estimated Guests
                  </label>
                  <input
                    id="quote-guests"
                    type="number"
                    min="10"
                    max="1000"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="app-input"
                  />
                </div>

                <div>
                  <label htmlFor="quote-budget" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Budget Band
                  </label>
                  <select
                    id="quote-budget"
                    value={budgetBand}
                    onChange={(e) => setBudgetBand(e.target.value)}
                    className="app-input"
                  >
                    <option value="$30 - $45 per guest">$30 – $45 per guest</option>
                    <option value="$45 - $65 per guest">$45 – $65 per guest</option>
                    <option value="$65 - $95 per guest">$65 – $95 per guest</option>
                    <option value="$95+ per guest (Full Luxury)">$95+ per guest (Luxury)</option>
                  </select>
                </div>
              </div>

              {/* Venue & Dietary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-venue" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Venue Location / Zipcode
                  </label>
                  <input
                    id="quote-venue"
                    type="text"
                    placeholder="e.g. Prospect Park Boathouse or 11215"
                    value={venuePostcode}
                    onChange={(e) => setVenuePostcode(e.target.value)}
                    className="app-input"
                  />
                </div>

                <div>
                  <label htmlFor="quote-dietary" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Dietary Requirements (Halal, GF, Vegan)
                  </label>
                  <input
                    id="quote-dietary"
                    type="text"
                    placeholder="e.g. 5 Halal, 3 Gluten-free"
                    value={dietaryNeeds}
                    onChange={(e) => setDietaryNeeds(e.target.value)}
                    className="app-input"
                  />
                </div>
              </div>

              {/* Client Info: Name, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Full Name
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="app-input"
                  />
                </div>

                <div>
                  <label htmlFor="quote-phone" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Phone Number
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    required
                    placeholder="(718) 555-0182"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="app-input"
                  />
                </div>

                <div>
                  <label htmlFor="quote-email" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Email Address
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="app-input"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label htmlFor="quote-msg" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Additional Notes or Service Requests
                </label>
                <textarea
                  id="quote-msg"
                  rows={3}
                  placeholder="Need chaffing setups, servers, or bartender bar service? Tell us here."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="app-input resize-none"
                />
              </div>

              {/* Submit: full-width black pill */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0A0A0A] hover:bg-[#222222] text-white font-bold py-3.5 px-6 rounded-full transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  {submitting ? 'Generating Proposal Request...' : 'Submit Catering Quote Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
