import React from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { Button } from '../ui/Button';
import { siteImages } from '../../lib/images';
import { OptimizedImage } from '../ui/OptimizedImage';

interface CategoryTilesProps {
  onSelectCategory: (slug: string) => void;
  onViewMenu: () => void;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({
  onSelectCategory,
  onViewMenu,
}) => {
  const categories = [
    {
      title: 'STARTERS',
      slug: 'starters',
      description: 'Stamp & go cod fritters, garlic prawns, and coconut callaloo',
      image: siteImages.saltfishFritters,
      color: 'bg-[#F0C964]',
    },
    {
      title: 'MAINS & BRAISES',
      slug: 'mains',
      description: 'Pimento wood jerk chicken, 9-hour oxtail & whole snapper',
      image: siteImages.jerkChicken,
      color: 'bg-[#E67A3E]',
    },
    {
      title: 'HERITAGE DESSERTS',
      slug: 'desserts',
      description: 'Rum-soaked brioche pudding & coconut shortcrust tarts',
      image: siteImages.rumBreadPudding,
      color: 'bg-[#9CBF77]',
    },
    {
      title: 'ISLAND LIBATIONS',
      slug: 'drinks',
      description: 'Cold-pressed sorrel ginger brews & tropical passion spritzers',
      image: siteImages.sorrelGingerDrink,
      color: 'bg-[#F0C964]',
    },
  ];

  return (
    <section aria-label="Our Menu Categories" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-2">
            Signature Selections
          </span>
          <ScriptHeading as="h2">Our Menu</ScriptHeading>
          <p className="mt-4 text-base text-[#4A4A4A]">
            Rooted in tradition and elevated with Brooklyn energy. Prepared fresh daily with heirloom island seasonings.
          </p>
        </div>

        {/* 4 Square Category Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className="group relative cursor-pointer flex flex-col focus-visible:outline-2 focus-visible:outline-[#111111]"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory(cat.slug);
                }
              }}
            >
              {/* Square image container with 30px radius */}
              <div className="relative aspect-square w-full rounded-[30px] overflow-hidden bg-[#F2F2F2] border border-black/10">
                <OptimizedImage
                  src={cat.image}
                  alt={`${cat.title} selection at Krazy Kitchen Katerers`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
                {/* Flat bottom scrim/banner */}
                <div className="absolute inset-x-0 bottom-0 bg-[#0A0A0A]/70 backdrop-blur-xs p-4 text-white">
                  <h3 className="font-bold text-sm tracking-[0.04em] uppercase text-white group-hover:text-[#F0C964] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#DDDDDD] line-clamp-1 mt-0.5 font-normal">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "View Menu" pill */}
        <div className="mt-10 text-center">
          <Button variant="dark" size="default" onClick={onViewMenu}>
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};
