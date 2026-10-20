import React from 'react';
import { ScriptHeading } from '../ui/ScriptHeading';
import { Button } from '../ui/Button';
import { siteImages } from '../../lib/images';
import { OptimizedImage } from '../ui/OptimizedImage';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <section aria-label="Page Not Found" className="py-20 md:py-28 bg-white text-center">
      <div className="max-w-[700px] mx-auto px-5 sm:px-6 flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#E67A3E] mb-2">
          Error 404
        </span>

        {/* Script heading */}
        <div className="mb-6">
          <ScriptHeading as="h1">Recipe Not Found</ScriptHeading>
        </div>

        <p className="text-base text-[#4A4A4A] max-w-md mx-auto mb-8 leading-relaxed">
          The dish or page you are looking for has been moved or simmered away. Let’s bring you back to our feast.
        </p>

        {/* Dish image with 30px radius */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-[30px] overflow-hidden bg-[#111111] border border-black/10 mb-8">
          <OptimizedImage
            src={siteImages.heroDish}
            alt="Warm signature Caribbean plate"
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" onClick={() => onNavigate('/')}>
            Return Home
          </Button>
          <Button variant="outline" onClick={() => onNavigate('/menu')}>
            Explore Menu
          </Button>
        </div>
      </div>
    </section>
  );
};
