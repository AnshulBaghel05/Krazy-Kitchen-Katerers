import React from 'react';
import { siteConfig } from '../../config/site';
import { Flame, Sparkles, Sprout } from 'lucide-react';

export const FeatureBand: React.FC = () => {
  const icons = [Flame, Sparkles, Sprout];
  const discColors = ['bg-[#E67A3E]', 'bg-[#F0C964]', 'bg-[#9CBF77]'];

  return (
    <section aria-label="Our Culinary Principles" className="bg-[#F2F2F2] py-14 border-y border-[#DDDDDD]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DDDDDD]">
          {siteConfig.valueProps.map((prop, idx) => {
            const Icon = icons[idx % icons.length];
            const discColor = discColors[idx % discColors.length];

            return (
              <div
                key={idx}
                className="flex items-start gap-4 py-6 md:py-2 md:px-8 first:pt-0 first:md:pl-0 last:pb-0 last:md:pr-0"
              >
                {/* 48px colored icon disc */}
                <div
                  className={`w-12 h-12 rounded-full ${discColor} flex items-center justify-center shrink-0 text-[#111111] shadow-none`}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text */}
                <div className="space-y-1">
                  <h3 className="font-bold text-base md:text-lg text-[#111111] leading-snug">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
