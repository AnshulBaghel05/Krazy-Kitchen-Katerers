import React, { useState, useEffect } from 'react';
import { useCMS } from '../../lib/cmsStore';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { BlockHero } from '../sections/BlockHero';
import { MenuFilter } from '../menu/MenuFilter';
import { MenuGrid } from '../menu/MenuGrid';
import { ImageBandOrder } from '../sections/ImageBandOrder';
import { HoursBlock } from '../sections/HoursBlock';

interface MenuPageProps {
  initialCategory?: string;
  onNavigate: (path: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  initialCategory = 'all',
  onNavigate,
}) => {
  const cms = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  return (
    <div className="w-full">
      {/* 1. BlockHero (yellow non-negotiable) */}
      <BlockHero
        color="yellow"
        tagline="Soulful Island Tradition"
        title="Our Menu"
        description={cms.menuIntro}
        imageSrc={siteImages.chefPlating}
        imageAlt={`Culinary pass at ${siteConfig.businessName}`}
        botanicalVariant="pepper"
      />

      {/* 2. Sticky MenuFilter */}
      <MenuFilter
        categories={cms.categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. MenuGrid (categories in CMS order, uppercase centered heading, 3-col grid, hairline dividers, unavailable items hidden) */}
      <MenuGrid
        categories={cms.categories}
        menuItems={cms.menuItems}
        selectedCategory={selectedCategory}
      />

      {/* 4. ImageBand Order Online */}
      <ImageBandOrder onNavigate={onNavigate} />

      {/* 5. HoursBlock (green rotation) */}
      <HoursBlock color="green" />
    </div>
  );
};
