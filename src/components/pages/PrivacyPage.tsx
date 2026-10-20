import React from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { siteConfig } from '../../config/site';

export const PrivacyPage: React.FC = () => {
  return (
    <section aria-label="Privacy Policy" className="py-16 md:py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-5 sm:px-6 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-2">
            Legal &amp; Trust
          </span>
          <ScriptHeading as="h1">Privacy Policy</ScriptHeading>
          <p className="text-xs text-[#777777] mt-3">
            Effective Date: November 14, 2026 · {siteConfig.businessName}
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-lg text-[#111111]">1. Commitment to Privacy</h3>
            <p>
              At {siteConfig.businessName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), we respect your personal boundaries. We collect only the minimum information necessary to fulfill table reservations, cater your celebrations, or contact you regarding inquiries. We never sell, rent, or trade your personal information.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-lg text-[#111111]">2. Information We Collect</h3>
            <p>
              When you submit a contact message, table reservation request, catering quote, or direct pickup order on our site, we collect your name, email address, phone number, and any event or dietary details you voluntarily provide.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-lg text-[#111111]">3. How Your Information is Handled</h3>
            <p>
              Your contact details are used solely by our restaurant management and catering team to confirm reservations, coordinate logistics, and dispatch quote estimates. We do not store payment credit cards on this server.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-lg text-[#111111]">4. Data Retention &amp; Rights</h3>
            <p>
              You may request a copy of the inquiries you have submitted or ask for your contact information to be permanently deleted from our records at any time by emailing us at{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-[#EE9B3B] underline font-semibold">
                {siteConfig.email}
              </a>.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-lg text-[#111111]">5. Contact Us</h3>
            <p>
              {siteConfig.businessName}<br />
              {siteConfig.address}<br />
              Phone: {siteConfig.phone}<br />
              Email: {siteConfig.email}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};
