import React from 'react';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { BlockHero } from '../sections/BlockHero';
import { ContactForm } from '../forms/ContactForm';
import { HoursBlock } from '../sections/HoursBlock';
import { Phone, Mail, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. BlockHero (orange non-negotiable) */}
      <BlockHero
        color="orange"
        tagline="Brooklyn Dining &amp; Kitchen"
        title="Contact &amp; Visit"
        description="We look forward to welcoming you to our dining room or discussing your upcoming wedding or private catering celebration."
        imageSrc={siteImages.diningRoom}
        imageAlt={`Dining room at ${siteConfig.businessName}`}
        botanicalVariant="pepper"
      >
        {/* Label/value list (PHONE, LOCATION, EMAIL with tel:/mailto:) */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-black/10">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]/70 block flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              Phone
            </span>
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
              className="text-sm font-bold text-[#111111] hover:underline"
            >
              {siteConfig.phone}
            </a>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]/70 block flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Location
            </span>
            <p className="text-sm font-bold text-[#111111] leading-snug">
              {siteConfig.address}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]/70 block flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              Email
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-bold text-[#111111] hover:underline truncate block"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </BlockHero>

      {/* 2. ContactForm + Map */}
      <ContactForm />

      {/* 3. HoursBlock (green rotation) */}
      <HoursBlock color="green" />
    </div>
  );
};
