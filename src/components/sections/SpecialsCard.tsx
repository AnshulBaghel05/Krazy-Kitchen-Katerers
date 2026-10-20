import React from 'react';
import { useCMS } from '../../lib/cmsStore';
import { ScriptHeading } from '../ui/ScriptHeading';
import { siteImages } from '../../lib/images';
import { OptimizedImage } from '../ui/OptimizedImage';
import { Clock, Check } from 'lucide-react';

export const SpecialsCard: React.FC = () => {
  const cms = useCMS();
  const special = cms.lunchSpecial;

  if (!special || !special.active || !special.items || special.items.length === 0) {
    return null;
  }

  return (
    <section aria-label="Daily Lunch Specials" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Grey Card with 24-32px radius */}
        <div className="bg-[#F2F2F2] rounded-[32px] p-8 md:p-14 border border-[#DDDDDD] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Col: Special Details & Bullets */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0C964] text-[#111111] text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>{special.time}</span>
              </div>

              <div>
                <ScriptHeading as="h2">{special.title}</ScriptHeading>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#111111] tabular-nums">
                  ${special.price.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-[#4A4A4A] uppercase tracking-wider">
                  per guest combo
                </span>
              </div>

              {/* Bullets */}
              <ul className="space-y-3 pt-2">
                {special.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-[#111111]">
                    <span className="w-5 h-5 rounded-full bg-[#9CBF77] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#111111]" />
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-[#4A4A4A] pt-2">
                *Available for dine-in &amp; takeout. Includes choice of Caribbean beverage.
              </p>
            </div>

            {/* Right Col: 3-Photo Collage */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="col-span-2 aspect-[16/9] rounded-[28px] overflow-hidden bg-[#111111] border border-black/10">
                <OptimizedImage
                  src={siteImages.jerkChicken}
                  alt="Lunch special: Grilled jerk chicken combo"
                  className="w-full h-full object-cover"
                  priority={false}
                />
              </div>
              <div className="aspect-square rounded-[28px] overflow-hidden bg-[#111111] border border-black/10">
                <OptimizedImage
                  src={siteImages.friedPlantainsMaduros}
                  alt="Lunch special: Caramelized sweet fried plantains side"
                  className="w-full h-full object-cover"
                  priority={false}
                />
              </div>
              <div className="aspect-square rounded-[28px] overflow-hidden bg-[#111111] border border-black/10">
                <OptimizedImage
                  src={siteImages.sorrelGingerDrink}
                  alt="Lunch special: Chilled cold-pressed sorrel hibiscus drink"
                  className="w-full h-full object-cover"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
