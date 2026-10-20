import React from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { BotanicalSvg } from '../ui/BotanicalSvg';
import { OptimizedImage } from '../ui/OptimizedImage';

interface BlockHeroProps {
  color: 'yellow' | 'orange' | 'green';
  tagline?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  mirrored?: boolean;
  botanicalVariant?: 'pepper' | 'pimento' | 'thyme';
  children?: React.ReactNode;
}

export const BlockHero: React.FC<BlockHeroProps> = ({
  color,
  tagline,
  title,
  description,
  imageSrc,
  imageAlt,
  mirrored = false,
  botanicalVariant,
  children,
}) => {
  const blockBg = {
    yellow: 'bg-[#F0C964]',
    orange: 'bg-[#E67A3E]',
    green: 'bg-[#9CBF77]',
  }[color];

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div
          className={`relative ${blockBg} rounded-[40px] p-8 md:p-14 border border-black/10 overflow-hidden`}
        >
          {/* Overlapping botanical line-art */}
          {botanicalVariant && (
            <div className="absolute -top-6 -right-6 pointer-events-none opacity-60 hidden md:block">
              <BotanicalSvg variant={botanicalVariant} className="w-48 h-48" />
            </div>
          )}

          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
              mirrored ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Text side */}
            <div
              className={`space-y-4 ${
                mirrored ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-6'
              }`}
            >
              {tagline && (
                <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#111111]/80 block">
                  {tagline}
                </span>
              )}

              <div>
                <ScriptHeading as="h1" showUnderline={true}>
                  {title}
                </ScriptHeading>
              </div>

              <p className="text-base sm:text-lg text-[#111111] leading-relaxed max-w-xl font-medium">
                {description}
              </p>

              {children && <div className="pt-2">{children}</div>}
            </div>

            {/* Rounded Photo side */}
            <div
              className={`flex justify-center ${
                mirrored ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-6'
              }`}
            >
              <div className="w-full aspect-[4/3] rounded-[30px] overflow-hidden bg-[#111111] border border-black/10 relative">
                <OptimizedImage
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
