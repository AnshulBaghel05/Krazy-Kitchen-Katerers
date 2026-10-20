import React from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { Button } from '../ui/Button';
import { siteImages } from '../../lib/images';
import { siteConfig } from '../../config/site';
import { OptimizedImage } from '../ui/OptimizedImage';

interface CateringTilesProps {
  onSelectType: (type: string) => void;
  onRequestQuote: () => void;
}

export const CateringTiles: React.FC<CateringTilesProps> = ({
  onSelectType,
  onRequestQuote,
}) => {
  const eventTypes = [
    {
      id: 'corporate',
      title: 'Corporate Gatherings',
      capacity: '15 – 350 Guests',
      description: 'Polished boxed lunches, hot executive buffets, and prompt conference setups.',
      image: siteImages.cateringSpread,
    },
    {
      id: 'weddings',
      title: 'Weddings & Galas',
      capacity: '50 – 500 Guests',
      description: 'Lavish multi-course banquet stations, passed appetizers, and uniformed captain service.',
      image: siteImages.diningRoom,
    },
    {
      id: 'birthdays',
      title: 'Milestone Birthdays',
      capacity: '20 – 150 Guests',
      description: 'Lively family-style platters, whole roasted snapper displays, and Caribbean desserts.',
      image: siteImages.overheadFeast,
    },
    {
      id: 'socials',
      title: 'Socials & Block Parties',
      capacity: '30 – 400 Guests',
      description: 'Authentic live smoker setups, street food stations, and tropical punch stations.',
      image: siteImages.heroDish,
    },
  ];

  return (
    <section aria-label="Catering Services" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-2">
            Full-Service Banquets
          </span>
          <ScriptHeading as="h2">Catering Services</ScriptHeading>
          <p className="mt-4 text-base text-[#4A4A4A]">
            Whether you are hosting an intimate milestone dinner or a 400-guest wedding reception, we bring joyful warmth and unforgettable soul to your table.
          </p>
        </div>

        {/* 4 Catering Event Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventTypes.map((event) => (
            <div
              key={event.id}
              onClick={() => onSelectType(event.id)}
              className="group relative cursor-pointer flex flex-col focus-visible:outline-2 focus-visible:outline-[#111111]"
              tabIndex={0}
              role="button"
              aria-label={`View catering details for ${event.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectType(event.id);
                }
              }}
            >
              <div className="relative aspect-[4/5] w-full rounded-[30px] overflow-hidden bg-[#F2F2F2] border border-black/10">
                <OptimizedImage
                  src={event.image}
                  alt={`${event.title} catering by ${siteConfig.businessName}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
                {/* Flat bottom scrim card */}
                <div className="absolute inset-x-0 bottom-0 bg-[#0A0A0A]/75 backdrop-blur-xs p-5 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F0C964] block mb-1">
                    {event.capacity}
                  </span>
                  <h3 className="font-bold text-base text-white group-hover:text-[#F0C964] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#CCCCCC] mt-1 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA "Request a Quote" */}
        <div className="mt-12 text-center">
          <Button variant="dark" size="lg" onClick={onRequestQuote}>
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
};
