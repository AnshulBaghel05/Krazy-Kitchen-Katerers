import React from 'react';
import { siteConfig } from '../../config/site';

export const WhatsAppButton: React.FC = () => {
  if (!siteConfig.whatsappE164) return null;

  const cleanNumber = siteConfig.whatsappE164.replace(/[^0-9]/g, '');

  return (
    <aside aria-label="WhatsApp Contact">
      <a
        href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
          `Hello ${siteConfig.businessName}, I would like to inquire about your menu and catering.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-30 w-12 h-12 rounded-full bg-[#9CBF77] text-[#111111] flex items-center justify-center hover:bg-[#8AA867] transition-transform hover:scale-105 shadow-none border border-black/10 focus-visible:outline-2 focus-visible:outline-[#111111]"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#111111]"
          aria-hidden="true"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
      </a>
    </aside>
  );
};
