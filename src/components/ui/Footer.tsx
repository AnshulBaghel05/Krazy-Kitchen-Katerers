import React from 'react';
import { siteConfig } from '../../config/site';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = 2026;

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-24 md:pb-16 border-t border-[#222222]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#222222]">
          {/* Col 1: Business Identity */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#EE9B3B] flex items-center justify-center text-[#111111] font-bold text-xl">
                K
              </span>
              <span
                className="font-display font-bold text-2xl text-white tracking-tight"
                style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}
              >
                {siteConfig.businessName}
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#9CBF77] font-semibold">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-[#CCCCCC] leading-relaxed">
              Modern Caribbean Fusion &amp; Creole soul catering and restaurant in Brooklyn. Celebrating heritage spices, wood-fire craft, and warm hospitality.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.08em] text-[#F0C964] font-bold mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#DDDDDD]">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/catering')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Catering &amp; Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/studio')}
                  className="text-xs text-[#9CBF77] hover:underline flex items-center gap-1 mt-3"
                >
                  <span>Owner CMS Studio</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.08em] text-[#F0C964] font-bold mb-4">
              Visit &amp; Contact
            </h3>
            <address className="not-italic text-sm text-[#DDDDDD] space-y-2.5">
              <p className="leading-relaxed">
                {siteConfig.address}
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                  className="hover:text-white transition-colors font-semibold"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>
              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${siteConfig.placeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#EE9B3B] font-semibold hover:underline"
                >
                  <span>Get Directions on Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </address>
          </div>

          {/* Col 4: Socials & Hours note */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.08em] text-[#F0C964] font-bold mb-4">
              Stay Connected
            </h3>
            <p className="text-sm text-[#CCCCCC] mb-4">
              Follow our kitchen pass and catering showcases for seasonal drop alerts.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-[#888888]">
              Opening {siteConfig.openingDate} · Brooklyn, New York
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <p>
            &copy; {currentYear} {siteConfig.businessName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <span>{siteConfig.cuisine}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
