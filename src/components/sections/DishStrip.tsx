import React from 'react';
import { useCMS } from '../../lib/cmsStore';
import { siteImages } from '../../lib/images';
import { OptimizedImage } from '../ui/OptimizedImage';

export const DishStrip: React.FC = () => {
  const cms = useCMS();

  // Pick up to 8 signature items (or active items)
  const signatureItems = cms.menuItems
    .filter((i) => i.available)
    .slice(0, 8);

  // If less than 8, duplicate or fill from other items
  const displayItems = [...signatureItems, ...signatureItems];

  // Fallback thumbnails mapped gracefully
  const fallbackThumbnails = [
    siteImages.heroDish,
    siteImages.overheadFeast,
    siteImages.chefPlating,
    siteImages.diningRoom,
    siteImages.cateringSpread,
    siteImages.heroDish,
    siteImages.overheadFeast,
    siteImages.chefPlating,
  ];

  return (
    <section aria-label="Signature Dishes Strip" className="w-full bg-white py-6 overflow-hidden border-y border-[#DDDDDD]">
      <div className="sr-only">
        Signature Dishes Marquee showcasing our top culinary creations.
      </div>
      <div
        className="animate-marquee flex items-center gap-6 cursor-grab active:cursor-grabbing"
        tabIndex={0}
        aria-label="Signature dishes carousel. Press tab and arrow keys to view."
      >
        {displayItems.map((item, index) => {
          const imageSrc = item.thumbnail || fallbackThumbnails[index % fallbackThumbnails.length];
          return (
            <div
              key={`${item.id}-${index}`}
              className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[28px] overflow-hidden bg-[#F2F2F2] border border-black/10 relative shrink-0">
                <OptimizedImage
                  src={imageSrc}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={false}
                />
              </div>
              <span className="text-[11px] font-semibold tracking-wide text-[#111111] max-w-[110px] text-center truncate">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
