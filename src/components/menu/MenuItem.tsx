import React from 'react';
import { MenuItemData } from '../../config/seedData';
import { OptimizedImage } from '../ui/OptimizedImage';

interface MenuItemProps {
  item: MenuItemData;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  if (!item.available) return null;

  return (
    <article className="flex gap-4 items-start py-4 group">
      {/* Optional Thumbnail hidden if absent */}
      {item.thumbnail && (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] overflow-hidden bg-[#F2F2F2] border border-black/10 shrink-0">
          <OptimizedImage
            src={item.thumbnail}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            priority={false}
          />
        </div>
      )}

      {/* Item info */}
      <div className="flex-1 min-w-0">
        {/* Name, Hairline Leader, Price */}
        <div className="flex items-baseline justify-between w-full">
          <h4 className="font-bold text-base sm:text-lg text-[#111111] group-hover:text-[#EE9B3B] transition-colors shrink-0">
            {item.name}
          </h4>

          {/* Hairline leader */}
          <span className="hairline-leader" aria-hidden="true" />

          {/* Right-aligned Price */}
          <span className="font-bold text-base sm:text-lg text-[#111111] shrink-0 tabular-nums">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1.5 leading-relaxed">
          {item.description}
        </p>

        {/* Dietary tags (Zero-Pill Discipline: clean unboxed metadata with · separators) */}
        {item.dietaryTags && item.dietaryTags.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-[#666666]">
            {item.dietaryTags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className={tag === 'Spicy' ? 'text-[#E67A3E]' : ''}>{tag}</span>
                {idx < item.dietaryTags.length - 1 && (
                  <span aria-hidden="true" className="text-[#CCCCCC]">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
