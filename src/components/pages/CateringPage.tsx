import React, { useState, useEffect } from 'react';
import { useCMS } from '../../lib/cmsStore';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { BlockHero } from '../sections/BlockHero';
import { CateringPackageCard } from '../catering/CateringPackageCard';
import { CateringProcess } from '../catering/CateringProcess';
import { FaqAccordion } from '../catering/FaqAccordion';
import { CateringQuoteForm } from '../forms/CateringQuoteForm';
import { ScriptHeading } from '../ui/ScriptHeading';
import { HoursBlock } from '../sections/HoursBlock';

interface CateringPageProps {
  initialType?: string;
}

export const CateringPage: React.FC<CateringPageProps> = ({ initialType }) => {
  const cms = useCMS();
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  useEffect(() => {
    if (initialType === 'quote') {
      const el = document.getElementById('quote-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [initialType]);

  const handleSelectPackage = (pkgTitle: string) => {
    setSelectedPackage(pkgTitle);
    const el = document.getElementById('quote-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* 1. BlockHero (orange non-negotiable) */}
      <BlockHero
        color="orange"
        tagline="Events &amp; Banquets"
        title="Catering &amp; Celebrations"
        description="Transform your wedding, corporate milestone, or family reunion with vibrant Caribbean Creole buffets, passed cocktail bites, and attentive service."
        imageSrc={siteImages.cateringSpread}
        imageAlt={`Catering feast table by ${siteConfig.businessName}`}
        botanicalVariant="pimento"
      />

      {/* 2. Package Cards [[PACKAGE_1..3]] */}
      <section aria-label="Catering Packages" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-2">
              Curated Menus
            </span>
            <ScriptHeading as="h2">Catering Packages</ScriptHeading>
            <p className="mt-4 text-base text-[#4A4A4A]">
              Choose from our most requested event menus or work directly with our culinary director to tailor a custom multi-course feast.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {cms.cateringPackages.map((pkg) => (
              <CateringPackageCard
                key={pkg.id}
                pkg={pkg}
                onSelect={handleSelectPackage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Process Steps (Enquire, Menu/Tasting, Confirm, Delivery) */}
      <CateringProcess />

      {/* 4. Catering Quote Form */}
      <CateringQuoteForm
        initialEventType={initialType || 'corporate'}
        initialPackage={selectedPackage}
      />

      {/* 5. FAQ Accordion (FAQPage schema included) */}
      <FaqAccordion />

      {/* 6. HoursBlock (green rotation) */}
      <HoursBlock color="green" />
    </div>
  );
};
