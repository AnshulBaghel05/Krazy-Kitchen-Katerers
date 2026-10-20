import React from 'react';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { Button } from '../ui/Button';
import { OptimizedImage } from '../ui/OptimizedImage';

interface HomeHeroProps {
  onNavigate: (path: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate }) => {
  const handleOrder = () => {
    if (siteConfig.orderUrl) {
      window.open(siteConfig.orderUrl, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate('/order-request');
    }
  };

  return (
    <section
      aria-label="Welcome Hero"
      className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[760px] flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Image with Scrim .4 */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={siteImages.heroDish}
          alt={`Signature Jamaican Jerk Chicken feast served at ${siteConfig.businessName}`}
          className="w-full h-full object-cover object-center brightness-90"
          priority={true}
        />
        {/* Scrim: rgba(0,0,0,0.4) non-negotiable */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-6 py-16 md:py-24 text-center flex flex-col items-center">
        {/* Uppercase Tagline tracking .08em */}
        <span className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.08em] text-[#F0C964] mb-3 sm:mb-4 drop-shadow-none">
          {siteConfig.tagline}
        </span>

        {/* Script Wordmark: fluid clamp 88-168px */}
        <h1
          className="font-display font-bold text-hero-wordmark text-white leading-tight text-center mb-6 max-w-4xl"
          style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}
        >
          {siteConfig.businessName}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#F2F2F2] max-w-2xl mb-8 leading-relaxed font-normal">
          Generous wood-fired flavors, ancestral Creole braises, and Brooklyn’s most festive catering feasts.
        </p>

        {/* Side-by-side pill buttons: exactly one filled-orange primary CTA per viewport */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleOrder}
          >
            Order Online
          </Button>

          <Button
            variant="dark"
            size="lg"
            onClick={() => onNavigate('/menu')}
          >
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};
