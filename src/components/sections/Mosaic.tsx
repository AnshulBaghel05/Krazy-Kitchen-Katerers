import React, { useState } from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { Button } from '../ui/Button';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { OptimizedImage } from '../ui/OptimizedImage';
import { X, ZoomIn, Instagram } from 'lucide-react';

interface MosaicItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  aspect: string; // for varied masonry balance
}

export const Mosaic: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<MosaicItem | null>(null);

  const images: MosaicItem[] = [
    {
      id: 'm-1',
      title: 'Pimento Wood Jerk Chicken Platter',
      subtitle: 'Charred over real Jamaican pimento wood coals',
      src: siteImages.jerkChicken,
      aspect: 'col-span-1 sm:col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto',
    },
    {
      id: 'm-2',
      title: 'Warm Dining Room Pass',
      subtitle: 'Family-style tables and tropical hospitality',
      src: siteImages.diningRoom,
      aspect: 'col-span-1 aspect-[4/3]',
    },
    {
      id: 'm-3',
      title: 'Royal Creole Catering Feast',
      subtitle: 'Celebratory banquet spreads for weddings & galas',
      src: siteImages.cateringSpread,
      aspect: 'col-span-1 aspect-[4/3]',
    },
    {
      id: 'm-4',
      title: 'Crispy Red Snapper Escovitch',
      subtitle: 'Plated with spicy pickled scotch bonnet julienne',
      src: siteImages.snapperEscovitch,
      aspect: 'col-span-1 aspect-[4/3]',
    },
    {
      id: 'm-5',
      title: 'Island Harvest Table Spread',
      subtitle: 'Caramelized plantains, citrus salad, and curry pots',
      src: siteImages.overheadFeast,
      aspect: 'col-span-1 aspect-[4/3]',
    },
    {
      id: 'm-6',
      title: 'Slow-Simmered Creole Braises',
      subtitle: 'Nine-hour simmered oxtail and aromatic butter beans',
      src: siteImages.oxtailStew,
      aspect: 'col-span-1 aspect-[4/3]',
    },
  ];

  return (
    <section aria-label="Our Dishes Gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-2">
            Visual Culinary Craft
          </span>
          <ScriptHeading as="h2">Our Dishes</ScriptHeading>
          <p className="mt-4 text-base text-[#4A4A4A]">
            A glimpse into our kitchen pass, hardwood smoke pits, and joyful banquet presentations.
          </p>
        </div>

        {/* 6 Images Grid with 30px photo radius */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 auto-rows-[220px]">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className={`group relative rounded-[30px] overflow-hidden bg-[#F2F2F2] border border-black/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111111] ${img.aspect}`}
              tabIndex={0}
              role="button"
              aria-label={`View enlarged photo of ${img.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(img);
                }
              }}
            >
              <OptimizedImage
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                priority={false}
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-[#0A0A0A]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white">{img.title}</h3>
                    <p className="text-xs text-[#DDDDDD]">{img.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "View Instagram" pill */}
        <div className="mt-10 text-center">
          <Button
            variant="dark"
            asLink
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>View Instagram</span>
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelectedImage(null);
          }}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center bg-[#111111] rounded-[30px] overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close enlarged preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4 sm:p-6 w-full text-white bg-[#111111] border-t border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base sm:text-lg">{selectedImage.title}</h3>
                <p className="text-xs sm:text-sm text-[#AAAAAA]">{selectedImage.subtitle}</p>
              </div>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#F0C964] hover:underline font-semibold"
              >
                @krazykitchenkaterers
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
