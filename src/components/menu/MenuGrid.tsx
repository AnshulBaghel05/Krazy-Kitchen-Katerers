import React from 'react';
import { MenuCategoryData, MenuItemData } from '../../config/seedData';
import { MenuItem } from './MenuItem';

interface MenuGridProps {
  categories: MenuCategoryData[];
  menuItems: MenuItemData[];
  selectedCategory: string; // 'all' or slug
}

export const MenuGrid: React.FC<MenuGridProps> = ({
  categories,
  menuItems,
  selectedCategory,
}) => {
  // Sort categories by order
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  // Filter categories if a specific category is selected
  const displayCategories =
    selectedCategory === 'all'
      ? sortedCategories
      : sortedCategories.filter((c) => c.slug === selectedCategory);

  return (
    <div className="py-12 max-w-[1200px] mx-auto px-5 sm:px-6">
      {displayCategories.map((cat, idx) => {
        // Items in this category that are available
        const items = menuItems.filter(
          (item) => item.categoryId === cat.id && item.available
        );

        if (items.length === 0) return null;

        return (
          <section key={cat.id} aria-labelledby={`cat-heading-${cat.id}`} className="mb-14 last:mb-0">
            {/* Uppercase Centered Heading tracking .04em */}
            <div className="text-center mb-8">
              <h3
                id={`cat-heading-${cat.id}`}
                className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.04em] text-[#111111]"
              >
                {cat.name}
              </h3>
              <div className="w-12 h-1 bg-[#9CBF77] mx-auto mt-2 rounded-full" aria-hidden="true" />
            </div>

            {/* 3-column grid on desktop, 2 on tablet, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {items.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>

            {/* Hairline between categories (except last) */}
            {idx < displayCategories.length - 1 && (
              <hr className="border-t border-[#DDDDDD] mt-16 mb-6" />
            )}
          </section>
        );
      })}
    </div>
  );
};
