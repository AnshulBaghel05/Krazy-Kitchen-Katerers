import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  priority?: boolean;
  className?: string;
  aspectRatioClass?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  priority = false,
  className = '',
  aspectRatioClass = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Derive WebP and JPG fallback paths automatically
  const webpSrc = src.endsWith('.webp') ? src : src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const defaultFallback = fallbackSrc || (src.endsWith('.webp') ? src.replace(/\.webp$/i, '.jpg') : src);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F2F2F2] text-[#4A4A4A] p-4 text-center select-none ${aspectRatioClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Utensils className="w-8 h-8 text-[#EE9B3B] mb-2 opacity-80" aria-hidden="true" />
        <span className="text-xs font-semibold tracking-wide text-[#111111] max-w-[140px] truncate">
          {alt || 'Dish Preview'}
        </span>
      </div>
    );
  }

  return (
    <picture className={`contents ${aspectRatioClass}`}>
      <source type="image/webp" srcSet={webpSrc} />
      <source type="image/jpeg" srcSet={defaultFallback} />
      <img
        src={defaultFallback}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${
          isLoaded || priority ? 'opacity-100' : 'opacity-90'
        } transition-opacity duration-300`}
        {...props}
      />
    </picture>
  );
};
