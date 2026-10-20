import { useState, useEffect } from 'react';
import { initialCMSData, CMSData, MenuItemData, HoursDay, MenuCategoryData } from '../config/seedData';

const CMS_STORAGE_KEY = 'krazy_kitchen_cms_v1';

let currentCMSData: CMSData = (() => {
  if (typeof window === 'undefined') return initialCMSData;
  try {
    const saved = localStorage.getItem(CMS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure merged with defaults in case of missing keys
      return { ...initialCMSData, ...parsed };
    }
  } catch (e) {
    console.error('Error loading CMS data from localStorage', e);
  }
  return initialCMSData;
})();

const listeners = new Set<() => void>();

function notify() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(currentCMSData));
    } catch (e) {
      console.error('Error saving CMS data to localStorage', e);
    }
  }
  listeners.forEach((listener) => listener());
}

export const cmsStore = {
  get: () => currentCMSData,

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  update: (updates: Partial<CMSData>) => {
    currentCMSData = { ...currentCMSData, ...updates };
    notify();
  },

  updateMenuItem: (id: string, updates: Partial<MenuItemData>) => {
    const menuItems = currentCMSData.menuItems.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    currentCMSData = { ...currentCMSData, menuItems };
    notify();
  },

  toggleMenuItemAvailability: (id: string) => {
    const menuItems = currentCMSData.menuItems.map((item) =>
      item.id === id ? { ...item, available: !item.available } : item
    );
    currentCMSData = { ...currentCMSData, menuItems };
    notify();
  },

  addMenuItem: (item: Omit<MenuItemData, 'id'>) => {
    const newItem: MenuItemData = {
      ...item,
      id: `item-${Date.now()}`,
    };
    currentCMSData = {
      ...currentCMSData,
      menuItems: [...currentCMSData.menuItems, newItem],
    };
    notify();
  },

  deleteMenuItem: (id: string) => {
    currentCMSData = {
      ...currentCMSData,
      menuItems: currentCMSData.menuItems.filter((i) => i.id !== id),
    };
    notify();
  },

  updateHours: (hours: HoursDay[]) => {
    currentCMSData = { ...currentCMSData, hours };
    notify();
  },

  reorderCategories: (categories: MenuCategoryData[]) => {
    currentCMSData = { ...currentCMSData, categories };
    notify();
  },

  resetToDefaults: () => {
    currentCMSData = JSON.parse(JSON.stringify(initialCMSData));
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CMS_STORAGE_KEY);
    }
    notify();
  },
};

export function useCMS(): CMSData {
  const [data, setData] = useState<CMSData>(() => cmsStore.get());

  useEffect(() => {
    const unsubscribe = cmsStore.subscribe(() => {
      setData({ ...cmsStore.get() });
    });
    return unsubscribe;
  }, []);

  return data;
}
