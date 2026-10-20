import React from 'react';
import { MenuCategoryData } from '../../config/seedData';

interface MenuFilterProps {
  categories: MenuCategoryData[];
  selectedCategory: string; // 'all' or category.slug
  onSelectCategory: (slug: string) => void;
}

export const MenuFilter: React.FC<MenuFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-y border-[#DDDDDD] py-3.5 px-4">
      <div className="max-w-[1200px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {/* 'All Dishes' button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold min-h-[44px] whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#0A0A0A] text-white'
              : 'border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#F2F2F2]'
          }`}
        >
          All Dishes
        </button>

        {/* Category Pills */}
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold min-h-[44px] whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0A0A0A] text-white'
                  : 'border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#F2F2F2]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
