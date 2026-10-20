import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../config/site';
import { Button } from './Button';
import { Menu, X, Phone, Compass, Utensils, Instagram, Facebook } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Menu', path: '/menu' },
    { label: 'Catering', path: '/catering' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const handleOrderClick = () => {
    if (siteConfig.orderUrl) {
      window.open(siteConfig.orderUrl, '_blank', 'noopener,noreferrer');
    } else {
      handleLinkClick('/order-request');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full h-[72px] bg-white transition-all duration-200 flex items-center ${
          scrolled ? 'border-b border-[#DDDDDD]' : 'border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (one line) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('/')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111111]"
              aria-label="Krazy Kitchen Katerers Home"
            >
              {/* Logo icon monogram */}
              <span className="w-10 h-10 rounded-full bg-[#EE9B3B] flex items-center justify-center text-[#111111] font-bold text-xl tracking-tight transition-transform group-hover:scale-105 shrink-0">
                K
              </span>
              <span
                className="font-display font-bold text-2xl sm:text-[28px] text-[#111111] tracking-tight whitespace-nowrap"
                style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}
              >
                {siteConfig.businessName}
              </span>
            </button>
          </div>

          {/* Zone 2: Nav Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#111111]"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1 hover:text-[#EE9B3B] transition-colors whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-[#111111] font-bold' : 'text-[#4A4A4A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9CBF77] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Social icons + One Orange Pill Primary Action */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Circular outlined social icons */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            {/* Exactly one filled-orange primary CTA per viewport */}
            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="default"
                onClick={handleOrderClick}
              >
                Order Online
              </Button>
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#111111] hover:bg-[#F2F2F2] rounded-full transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Sheet */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 md:hidden animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[#DDDDDD]">
            <button
              onClick={() => handleLinkClick('/')}
              className="flex items-center gap-2 text-left"
            >
              <span className="w-9 h-9 rounded-full bg-[#EE9B3B] flex items-center justify-center text-[#111111] font-bold text-lg">
                K
              </span>
              <span
                className="font-display font-bold text-2xl text-[#111111]"
                style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}
              >
                {siteConfig.businessName}
              </span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#111111] hover:bg-[#F2F2F2] rounded-full"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 py-8">
            <button
              onClick={() => handleLinkClick('/')}
              className={`text-2xl font-bold text-left transition-colors ${
                currentPath === '/' ? 'text-[#EE9B3B]' : 'text-[#111111]'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-2xl font-bold text-left transition-colors ${
                  currentPath === link.path ? 'text-[#EE9B3B]' : 'text-[#111111]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleLinkClick('/studio')}
              className="text-lg font-medium text-left text-[#4A4A4A] hover:text-[#111111] pt-2 border-t border-[#DDDDDD]"
            >
              Owner CMS Studio
            </button>
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#DDDDDD]">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOrderClick();
              }}
            >
              Order Online
            </Button>
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center text-[#111111]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center text-[#111111]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Bar (Call / Directions / Order) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-[#DDDDDD] px-4 py-2 flex items-center justify-around md:hidden"
        style={{ maxHeight: '60px' }}
      >
        <a
          href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
          className="flex flex-col items-center justify-center text-[#111111] hover:text-[#EE9B3B] text-[11px] font-semibold py-1 px-3 min-w-[64px]"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span>Call</span>
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${siteConfig.placeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-[#111111] hover:text-[#EE9B3B] text-[11px] font-semibold py-1 px-3 min-w-[64px]"
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span>Directions</span>
        </a>
        <button
          onClick={handleOrderClick}
          className="flex items-center gap-1.5 bg-[#EE9B3B] text-[#111111] font-bold text-xs px-4 py-2 rounded-full min-h-[40px] cursor-pointer"
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Order</span>
        </button>
      </div>
    </>
  );
};
