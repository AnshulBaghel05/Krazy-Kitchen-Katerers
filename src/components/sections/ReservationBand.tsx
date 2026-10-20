import React, { useState } from 'react';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { ScriptHeading } from '../ui/ScriptHeading';
import { OptimizedImage } from '../ui/OptimizedImage';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';

export interface ReservationRequest {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: number;
  notes?: string;
}

export const ReservationBand: React.FC = () => {
  const [formData, setFormData] = useState<ReservationRequest>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    time: '18:30',
    partySize: 2,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!siteConfig.reservationsEnabled) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }
    if (!formData.date) {
      setErrorMsg('Please choose a reservation date.');
      return;
    }

    setSubmitting(true);
    // Simulate real reservation request submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section aria-label="Table Reservations" className="relative py-20 md:py-28 bg-[#0A0A0A] overflow-hidden">
      {/* Background with dark scrim */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={siteImages.diningRoom}
          alt="Dining room table spread"
          className="w-full h-full object-cover filter brightness-40 blur-[1px]"
          priority={false}
        />
        {/* Scrim: rgba(0,0,0,0.4) non-negotiable */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 flex justify-center">
        {/* White Card with Form */}
        <div className="w-full max-w-2xl bg-white rounded-[32px] p-8 sm:p-12 border border-[#DDDDDD] shadow-none">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#E67A3E]">
              Table Bookings
            </span>
            <div>
              <ScriptHeading as="h2">Reserve Your Table</ScriptHeading>
            </div>
            <p className="text-sm text-[#4A4A4A] max-w-md mx-auto pt-2">
              Join us for family-style dining. Please note this is a <span className="font-semibold text-[#111111]">booking request, not confirmed</span> until our host calls or texts your confirmation.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#9CBF77]/20 text-[#111111] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-[#9CBF77]" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111]">Request Received!</h3>
              <p className="text-sm text-[#4A4A4A] max-w-md mx-auto">
                Thank you, <span className="font-semibold text-[#111111]">{formData.fullName}</span>. We have received your table request for <span className="font-semibold text-[#111111]">{formData.partySize} guests</span> on <span className="font-semibold text-[#111111]">{formData.date}</span> at <span className="font-semibold text-[#111111]">{formData.time}</span>. Our dining room host will confirm via text to {formData.phone} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-[#111111] underline hover:text-[#EE9B3B]"
              >
                Submit another reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {errorMsg && (
                <div role="alert" className="p-3 bg-[#F0C964]/30 text-[#111111] rounded-[14px] text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Date */}
                <div>
                  <label htmlFor="res-date" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      id="res-date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="app-input"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="res-time" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Time
                  </label>
                  <select
                    id="res-time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="app-input"
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:30">1:30 PM (Lunch)</option>
                    <option value="17:00">5:00 PM (Dinner)</option>
                    <option value="18:30">6:30 PM (Dinner)</option>
                    <option value="20:00">8:00 PM (Dinner)</option>
                    <option value="21:15">9:15 PM (Late)</option>
                  </select>
                </div>

                {/* Party Size */}
                <div>
                  <label htmlFor="res-guests" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Party Size
                  </label>
                  <select
                    id="res-guests"
                    value={formData.partySize}
                    onChange={(e) => setFormData({ ...formData, partySize: parseInt(e.target.value, 10) })}
                    className="app-input"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label htmlFor="res-name" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Your Name
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="app-input"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="res-phone" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Phone Number
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    placeholder="(718) 555-0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="app-input"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="res-email" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Email Address
                </label>
                <input
                  id="res-email"
                  type="email"
                  placeholder="maya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="app-input"
                />
              </div>

              {/* Special Notes */}
              <div>
                <label htmlFor="res-notes" className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Dietary notes or special celebration (optional)
                </label>
                <input
                  id="res-notes"
                  type="text"
                  placeholder="e.g. Birthday celebration, gluten-free guest"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="app-input"
                />
              </div>

              {/* Submit: full-width black pill */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0A0A0A] hover:bg-[#222222] text-white font-bold py-3.5 px-6 rounded-full transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  {submitting ? 'Submitting Request...' : 'Request Reservation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
