import React from 'react';
import { useCMS } from '../../lib/cmsStore';
import { computeHoursStatus } from '../../lib/hours';
import { siteConfig } from '../../config/site';
import { siteImages } from '../../lib/images';
import { BotanicalSvg } from '../ui/BotanicalSvg';
import { OptimizedImage } from '../ui/OptimizedImage';
import { Clock, MapPin, Phone } from 'lucide-react';

interface HoursBlockProps {
  color?: 'yellow' | 'orange' | 'green';
  id?: string;
}

export const HoursBlock: React.FC<HoursBlockProps> = ({
  color = 'yellow',
  id = 'hours-block',
}) => {
  const cms = useCMS();
  const status = computeHoursStatus(cms.hours, cms.holidayOverrides, siteConfig.ianaTimezone);

  // Background block color
  const bgColor = {
    yellow: 'bg-[#F0C964]',
    orange: 'bg-[#E67A3E]',
    green: 'bg-[#9CBF77]',
  }[color];

  // Current day in target timezone
  const now = new Date();
  const currentWeekday = new Intl.DateTimeFormat('en-US', {
    timeZone: siteConfig.ianaTimezone,
    weekday: 'long',
  }).format(now);

  return (
    <section id={id} aria-label="Operating Hours" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className={`relative ${bgColor} rounded-[40px] p-8 md:p-14 overflow-hidden border border-black/10`}>
          {/* Overlapping botanical line art SVG */}
          <div className="absolute -top-10 -right-10 opacity-70 pointer-events-none hidden md:block">
            <BotanicalSvg variant="pimento" className="w-56 h-56" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Col: Hours Schedule */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header with script and status chip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#111111]/80 block mb-1">
                    Hospitality &amp; Kitchen Pass
                  </span>
                  <h2
                    className="font-display font-bold text-4xl sm:text-5xl text-[#111111] leading-tight"
                    style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}
                  >
                    Join Us Now
                  </h2>
                </div>

                {/* Computed Chip (WCAG accessible: high contrast, no pill enclosure spam, clean badge) */}
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shrink-0 ${
                    status.isOpen
                      ? 'bg-[#111111] text-[#9CBF77]'
                      : 'bg-[#111111] text-[#F0C964]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{status.statusText}</span>
                </div>
              </div>

              {/* 7 Rows with Hairline Leaders */}
              <div className="space-y-3 pt-2">
                {cms.hours.map((schedule) => {
                  const isToday = schedule.day === currentWeekday;
                  return (
                    <div
                      key={schedule.day}
                      className={`flex items-baseline text-sm md:text-base py-1.5 transition-colors ${
                        isToday
                          ? 'font-bold text-[#111111] bg-black/5 px-3 rounded-lg -mx-3'
                          : 'text-[#111111]/90'
                      }`}
                    >
                      <span className="shrink-0 flex items-center gap-2">
                        {schedule.day}
                        {isToday && (
                          <span className="text-[11px] uppercase tracking-wider text-[#111111] bg-white/70 px-2 py-0.5 rounded-full font-bold">
                            Today
                          </span>
                        )}
                      </span>

                      {/* Hairline leader */}
                      <span className="hairline-leader" aria-hidden="true" />

                      {/* Display Hours */}
                      <span className="shrink-0 font-medium tabular-nums">
                        {schedule.isOpen ? schedule.display : (
                          <span className="font-semibold text-[#111111]/70">Closed</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Holiday overrides notes if any */}
              {cms.holidayOverrides && cms.holidayOverrides.length > 0 && (
                <div className="pt-3 border-t border-black/10 text-xs text-[#111111]/80 space-y-1">
                  <span className="font-bold uppercase tracking-wider block">Upcoming Holiday Hours:</span>
                  {cms.holidayOverrides.slice(0, 2).map((h, i) => (
                    <p key={i}>
                      · <span className="font-semibold">{h.date}</span>: {h.note}
                    </p>
                  ))}
                </div>
              )}

              {/* Quick NAP */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs font-medium text-[#111111]/90 border-t border-black/10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0 text-[#111111]" />
                  <span>{siteConfig.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-[#111111]" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                    className="hover:underline font-semibold"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Col: Rounded Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[420px] aspect-[4/3] rounded-[30px] overflow-hidden bg-[#111111] border border-black/10 relative">
                <OptimizedImage
                  src={siteImages.overheadFeast}
                  alt={`Fresh Caribbean dishes spread at ${siteConfig.businessName}`}
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
