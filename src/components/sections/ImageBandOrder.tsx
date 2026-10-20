import React from 'react';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { Button } from '../ui/Button';
import { ScriptHeading } from '../ui/ScriptHeading';
import { OptimizedImage } from '../ui/OptimizedImage';

interface ImageBandOrderProps {
  onNavigate: (path: string) => void;
}

export const ImageBandOrder: React.FC<ImageBandOrderProps> = ({ onNavigate }) => {
  const handleOrder = () => {
    if (siteConfig.orderUrl) {
      window.open(siteConfig.orderUrl, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate('/order-request');
    }
  };

  return (
    <section aria-label="Order Online Banner" className="relative py-20 md:py-28 bg-[#0A0A0A] overflow-hidden">
      {/* Background with scrim */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={siteImages.heroDish}
          alt="Caribbean grilled dishes and sauces"
          className="w-full h-full object-cover filter brightness-50"
          priority={false}
        />
        {/* Scrim: rgba(0,0,0,0.4) */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 flex justify-center">
        {/* White Card with CTA */}
        <div className="w-full max-w-xl bg-white rounded-[32px] p-8 sm:p-12 text-center space-y-5 border border-[#DDDDDD] shadow-none">
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#E67A3E] block">
            Pickup &amp; Local Delivery
          </span>

          <div>
            <ScriptHeading as="h2">Craving Island Comfort?</ScriptHeading>
          </div>

          <p className="text-base text-[#4A4A4A] leading-relaxed">
            Order your favorite pimento jerk platters, slow-braised oxtails, and fresh bakes for pickup or local delivery in Brooklyn. Freshly cooked to order.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Button variant="primary" size="lg" onClick={handleOrder}>
              Order Online
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('/menu')}>
              Browse Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
