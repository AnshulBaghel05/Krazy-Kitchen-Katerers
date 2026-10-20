import React from 'react';
import { useCMS } from '../../lib/cmsStore';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { HomeHero } from '../sections/HomeHero';
import { DishStrip } from '../sections/DishStrip';
import { FeatureBand } from '../sections/FeatureBand';
import { SplitSection } from '../sections/SplitSection';
import { CategoryTiles } from '../sections/CategoryTiles';
import { ReservationBand } from '../sections/ReservationBand';
import { Mosaic } from '../sections/Mosaic';
import { TestimonialsCarousel } from '../sections/TestimonialsCarousel';
import { ImageBandOrder } from '../sections/ImageBandOrder';
import { SpecialsCard } from '../sections/SpecialsCard';
import { CateringTiles } from '../sections/CateringTiles';
import { HoursBlock } from '../sections/HoursBlock';

interface HomePageProps {
  onNavigate: (path: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const cms = useCMS();

  const handleOrder = () => {
    if (siteConfig.orderUrl) {
      window.open(siteConfig.orderUrl, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate('/order-request');
    }
  };

  return (
    <div className="w-full">
      {/* 1. Full-bleed Hero */}
      <HomeHero onNavigate={onNavigate} />

      {/* 2. DishStrip marquee */}
      <DishStrip />

      {/* 3. FeatureBand (3 items with colored discs & hairlines) */}
      <FeatureBand />

      {/* 4. "Welcome" SplitSection (image right, green block, dark pill "Our Story" -> /about, Botanical SVG) */}
      <SplitSection
        id="welcome"
        imagePosition="right"
        color="green"
        tagline="Warm Hospitality"
        title={cms.storyHeadline}
        paragraphs={cms.storyCopy.slice(0, 2)}
        ctaText="Our Story"
        ctaVariant="dark"
        onCtaClick={() => onNavigate('/about')}
        imageSrc={siteImages.diningRoom}
        imageAlt={`Dining room at ${siteConfig.businessName}`}
        botanicalVariant="pepper"
        botanicalPosition="top-right"
      />

      {/* 5. Feature SplitSection "[[FEATURE_HEADING]]" (image left, yellow block, CTA "Order Now") */}
      <SplitSection
        id="feature"
        imagePosition="left"
        color="yellow"
        tagline="Handcrafted Technique"
        title={cms.featureHeading}
        paragraphs={[
          cms.featureCopy,
          "Our jerk meats are slow-smoked over seasoned hardwood logs while our signature curry pastes and pimento glazes are pounded fresh every morning.",
        ]}
        ctaText="Order Now"
        ctaVariant="primary"
        onCtaClick={handleOrder}
        imageSrc={siteImages.heroDish}
        imageAlt={`Plated signature jerk dish at ${siteConfig.businessName}`}
        botanicalVariant="thyme"
        botanicalPosition="top-left"
      />

      {/* 6. "Our Menu": 4 CategoryTiles + "View Menu" pill */}
      <CategoryTiles
        onSelectCategory={(slug) => onNavigate('/menu', slug)}
        onViewMenu={() => onNavigate('/menu')}
      />

      {/* 7. ImageBand reservation request (omit if RESERVATIONS = false) */}
      <ReservationBand />

      {/* 8. "Our Dishes" Mosaic + "View Instagram" pill */}
      <Mosaic />

      {/* 9. Testimonials (CMS; hide unless >= 3 real reviews) */}
      <TestimonialsCarousel />

      {/* 10. ImageBand "Order Online" */}
      <ImageBandOrder onNavigate={onNavigate} />

      {/* 11. SpecialsCard "Daily Lunch Specials" (hide when empty) */}
      <SpecialsCard />

      {/* 12. "Catering Services": 4 tiles -> /catering#type; CTA "Request a Quote" */}
      <CateringTiles
        onSelectType={(type) => onNavigate('/catering', type)}
        onRequestQuote={() => onNavigate('/catering', 'quote')}
      />

      {/* 13. HoursBlock (rotates color yellow > orange > green) */}
      <HoursBlock color="orange" />
    </div>
  );
};
