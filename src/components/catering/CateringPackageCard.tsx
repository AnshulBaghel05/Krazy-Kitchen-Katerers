import React from 'react';
import { CateringPackageData } from '../../config/seedData';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface CateringPackageCardProps {
  pkg: CateringPackageData;
  onSelect: (pkgTitle: string) => void;
}

export const CateringPackageCard: React.FC<CateringPackageCardProps> = ({
  pkg,
  onSelect,
}) => {
  return (
    <div
      className={`relative bg-white rounded-[32px] p-8 border flex flex-col justify-between transition-all duration-200 ${
        pkg.popularTag ? 'border-[#EE9B3B] bg-[#FFFDF9]' : 'border-[#DDDDDD]'
      }`}
    >
      {/* Most Popular Tag if applicable */}
      {pkg.popularTag && (
        <div className="absolute -top-3.5 left-8 bg-[#EE9B3B] text-[#111111] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {pkg.popularTag}
        </div>
      )}

      <div>
        <div className="mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-1">
            {pkg.title}
          </h3>
          <p className="text-xs text-[#4A4A4A] font-medium leading-relaxed">
            {pkg.subtitle}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-1.5 py-3 border-y border-[#EEEEEE] mb-5">
          <span className="font-display text-4xl sm:text-5xl font-bold text-[#111111] tabular-nums">
            ${pkg.pricePerPerson}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#4A4A4A]">
            / guest · min {pkg.minGuests} guests
          </span>
        </div>

        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-6">
          {pkg.description}
        </p>

        {/* Features List */}
        <ul className="space-y-3 mb-8">
          {pkg.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111111]">
              <span className="w-4 h-4 rounded-full bg-[#9CBF77] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-[#111111]" />
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Button
          variant={pkg.popularTag ? 'primary' : 'outline'}
          size="default"
          className="w-full"
          onClick={() => onSelect(pkg.title)}
        >
          Select Package
        </Button>
      </div>
    </div>
  );
};
