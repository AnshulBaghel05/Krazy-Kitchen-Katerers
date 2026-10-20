import React from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { Button } from '../ui/Button';
import { BotanicalSvg } from '../ui/BotanicalSvg';
import { OptimizedImage } from '../ui/OptimizedImage';

interface SplitSectionProps {
  id?: string;
  imagePosition?: 'left' | 'right';
  color?: 'yellow' | 'orange' | 'green';
  tagline?: string;
  title: string;
  paragraphs: string[];
  ctaText?: string;
  ctaVariant?: 'primary' | 'dark' | 'outline';
  onCtaClick?: () => void;
  imageSrc: string;
  imageAlt: string;
  botanicalVariant?: 'pepper' | 'pimento' | 'thyme';
  botanicalPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const SplitSection: React.FC<SplitSectionProps> = ({
  id,
  imagePosition = 'right',
  color = 'green',
  tagline,
  title,
  paragraphs,
  ctaText,
  ctaVariant = 'dark',
  onCtaClick,
  imageSrc,
  imageAlt,
  botanicalVariant,
  botanicalPosition = 'top-right',
}) => {
  const blockBg = {
    yellow: 'bg-[#F0C964]',
    orange: 'bg-[#E67A3E]',
    green: 'bg-[#9CBF77]',
  }[color];

  const botanicalPosClasses = {
    'top-left': '-top-8 -left-8',
    'top-right': '-top-10 -right-8',
    'bottom-left': '-bottom-8 -left-8',
    'bottom-right': '-bottom-8 -right-8',
  }[botanicalPosition];

  return (
    <section id={id} className="py-16 md:py-24 bg-white overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
            imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Content Column */}
          <div
            className={`space-y-6 ${
              imagePosition === 'left'
                ? 'lg:col-span-6 lg:order-2'
                : 'lg:col-span-6 lg:order-1'
            }`}
          >
            {tagline && (
              <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block">
                {tagline}
              </span>
            )}

            <div>
              <ScriptHeading as="h2">{title}</ScriptHeading>
            </div>

            <div className="space-y-4 text-base md:text-lg text-[#4A4A4A] leading-relaxed">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {ctaText && onCtaClick && (
              <div className="pt-2">
                <Button variant={ctaVariant} onClick={onCtaClick}>
                  {ctaText}
                </Button>
              </div>
            )}
          </div>

          {/* Image on Color Block Column */}
          <div
            className={`relative ${
              imagePosition === 'left'
                ? 'lg:col-span-6 lg:order-1'
                : 'lg:col-span-6 lg:order-2'
            }`}
          >
            {/* Flat Color Block behind image that bleeds towards container edge */}
            <div
              className={`absolute inset-0 ${blockBg} rounded-[40px] transform ${
                imagePosition === 'left'
                  ? 'translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5'
                  : '-translate-x-3 translate-y-3 sm:-translate-x-5 sm:translate-y-5'
              } border border-black/10`}
              aria-hidden="true"
            />

            {/* Overlapping Botanical Line-Art SVG */}
            {botanicalVariant && (
              <div
                className={`absolute z-20 pointer-events-none hidden sm:block ${botanicalPosClasses}`}
              >
                <BotanicalSvg variant={botanicalVariant} className="w-40 h-40 opacity-80" />
              </div>
            )}

            {/* Photo with radius 28-32px (--r-img: 30px) */}
            <div className="relative z-10 w-full aspect-[4/3] rounded-[30px] overflow-hidden bg-[#111111] border border-black/10">
              <OptimizedImage
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
