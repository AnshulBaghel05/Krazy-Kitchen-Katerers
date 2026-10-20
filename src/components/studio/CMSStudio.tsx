import React, { useState } from 'react';
import { useCMS, cmsStore } from '../../lib/cmsStore';
import { ScriptHeading } from '../ui/ScriptHeading';
import { Button } from '../ui/Button';
import {
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  DollarSign,
  Clock,
  Menu as MenuIcon,
  Sparkles,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Plus,
  Trash2,
} from 'lucide-react';

export const CMSStudio: React.FC = () => {
  const cms = useCMS();
  const [activeTab, setActiveTab] = useState<'menu' | 'hours' | 'announcement' | 'specials' | 'copy'>('menu');
  const [saveAlert, setSaveAlert] = useState(false);

  // New item modal/form state
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('22');
  const [newItemCat, setNewItemCat] = useState(cms.categories[0]?.id || 'cat-mains');
  const [newItemTags, setNewItemTags] = useState('GF, Halal');

  const showSaveSuccess = () => {
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2500);
  };

  const handlePriceChange = (id: string, priceStr: string) => {
    const num = parseFloat(priceStr);
    if (!isNaN(num)) {
      cmsStore.updateMenuItem(id, { price: num });
      showSaveSuccess();
    }
  };

  const handleToggleAvailable = (id: string) => {
    cmsStore.toggleMenuItemAvailability(id);
    showSaveSuccess();
  };

  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    const categories = [...cms.categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    // Swap order
    const temp = categories[index];
    categories[index] = categories[targetIndex];
    categories[targetIndex] = temp;

    // Update order numbers
    categories.forEach((cat, idx) => {
      cat.order = idx + 1;
    });

    cmsStore.reorderCategories(categories);
    showSaveSuccess();
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const tags = newItemTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    cmsStore.addMenuItem({
      name: newItemName.trim(),
      description: newItemDesc.trim(),
      price: parseFloat(newItemPrice) || 20,
      categoryId: newItemCat,
      dietaryTags: tags,
      available: true,
      isSignature: false,
    });

    setNewItemName('');
    setNewItemDesc('');
    setIsAddingItem(false);
    showSaveSuccess();
  };

  return (
    <section aria-label="CMS Management Studio" className="py-12 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#DDDDDD] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[#9CBF77]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A]">
                Owner CMS Studio · Live Editor
              </span>
            </div>
            <ScriptHeading as="h1">Content Management Studio</ScriptHeading>
            <p className="text-sm text-[#4A4A4A] mt-2">
              Make changes to dishes, prices, hours, and announcements without touching code. Updates reflect instantly across the live app.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Reset all CMS content back to initial default seed data?')) {
                  cmsStore.resetToDefaults();
                  showSaveSuccess();
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DDDDDD] text-xs font-semibold text-[#4A4A4A] hover:bg-[#F2F2F2] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            {saveAlert && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#9CBF77] text-[#111111] text-xs font-bold animate-in fade-in">
                <CheckCircle className="w-4 h-4" />
                <span>Saved Live!</span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#DDDDDD]">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'menu'
                ? 'bg-[#0A0A0A] text-white'
                : 'bg-[#F2F2F2] text-[#111111] hover:bg-[#EAEAEA]'
            }`}
          >
            Dishes &amp; Prices ({cms.menuItems.length})
          </button>
          <button
            onClick={() => setActiveTab('hours')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'hours'
                ? 'bg-[#0A0A0A] text-white'
                : 'bg-[#F2F2F2] text-[#111111] hover:bg-[#EAEAEA]'
            }`}
          >
            Hours &amp; Holidays
          </button>
          <button
            onClick={() => setActiveTab('announcement')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'announcement'
                ? 'bg-[#0A0A0A] text-white'
                : 'bg-[#F2F2F2] text-[#111111] hover:bg-[#EAEAEA]'
            }`}
          >
            Announcement Bar
          </button>
          <button
            onClick={() => setActiveTab('specials')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'specials'
                ? 'bg-[#0A0A0A] text-white'
                : 'bg-[#F2F2F2] text-[#111111] hover:bg-[#EAEAEA]'
            }`}
          >
            Daily Lunch Special
          </button>
          <button
            onClick={() => setActiveTab('copy')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'copy'
                ? 'bg-[#0A0A0A] text-white'
                : 'bg-[#F2F2F2] text-[#111111] hover:bg-[#EAEAEA]'
            }`}
          >
            Story &amp; Headings
          </button>
        </div>

        {/* Tab 1: Menu Items & Pricing */}
        {activeTab === 'menu' && (
          <div className="space-y-8">
            {/* Category Reordering Bar */}
            <div className="bg-[#F2F2F2] rounded-[24px] p-6 border border-[#DDDDDD]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm text-[#111111]">Category Display Order</h3>
                  <p className="text-xs text-[#4A4A4A]">Reorder how categories appear on the /menu page.</p>
                </div>
                <button
                  onClick={() => setIsAddingItem(!isAddingItem)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EE9B3B] text-[#111111] text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Dish</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {cms.categories.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#DDDDDD] text-xs font-bold"
                  >
                    <span>{idx + 1}. {cat.name}</span>
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => handleMoveCategory(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-[#4A4A4A] hover:text-[#111111] disabled:opacity-20 cursor-pointer"
                        title="Move category up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleMoveCategory(idx, 'down')}
                        disabled={idx === cms.categories.length - 1}
                        className="p-1 text-[#4A4A4A] hover:text-[#111111] disabled:opacity-20 cursor-pointer"
                        title="Move category down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Dish Form Modal */}
            {isAddingItem && (
              <form onSubmit={handleAddItem} className="bg-white rounded-[24px] p-6 border-2 border-[#EE9B3B] space-y-4">
                <h4 className="font-bold text-base text-[#111111]">Create New Menu Item</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#111111] mb-1">Dish Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Island Coconut Calypso Curry"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="app-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#111111] mb-1">Price ($ USD)</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="app-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#111111] mb-1">Description</label>
                  <input
                    type="text"
                    required
                    placeholder="Short description of ingredients, rubs, and sides"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    className="app-input"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#111111] mb-1">Category</label>
                    <select
                      value={newItemCat}
                      onChange={(e) => setNewItemCat(e.target.value)}
                      className="app-input"
                    >
                      {cms.categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#111111] mb-1">Dietary Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="GF, Halal, Spicy, VG"
                      value={newItemTags}
                      onChange={(e) => setNewItemTags(e.target.value)}
                      className="app-input"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs font-bold hover:bg-[#222222] cursor-pointer"
                  >
                    Save &amp; Publish Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingItem(false)}
                    className="px-5 py-2.5 rounded-full border border-[#DDDDDD] text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Dishes Table */}
            <div className="border border-[#DDDDDD] rounded-[24px] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F2F2F2] border-b border-[#DDDDDD] text-xs uppercase tracking-wider text-[#4A4A4A] font-bold">
                    <th className="py-3 px-4">Dish Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price ($)</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDDDDD] text-sm">
                  {cms.menuItems.map((item) => {
                    const catName = cms.categories.find((c) => c.id === item.categoryId)?.name || 'General';
                    return (
                      <tr key={item.id} className={!item.available ? 'bg-black/5 opacity-60' : 'bg-white'}>
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="font-bold text-[#111111]">{item.name}</p>
                          <p className="text-xs text-[#666666] line-clamp-1">{item.description}</p>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-[#4A4A4A]">
                          {catName}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1 w-24">
                            <span className="text-xs text-[#666666]">$</span>
                            <input
                              type="number"
                              step="0.5"
                              value={item.price}
                              onChange={(e) => handlePriceChange(item.id, e.target.value)}
                              className="w-full bg-[#F2F2F2] px-2 py-1 rounded-[8px] text-xs font-bold text-[#111111] border-none outline-none focus:ring-1 focus:ring-black"
                              aria-label={`Price for ${item.name}`}
                            />
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleAvailable(item.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                              item.available
                                ? 'bg-[#9CBF77]/30 text-[#111111]'
                                : 'bg-[#E67A3E]/30 text-[#111111]'
                            }`}
                          >
                            {item.available ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{item.available ? 'Live' : 'Hidden'}</span>
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${item.name}?`)) {
                                cmsStore.deleteMenuItem(item.id);
                                showSaveSuccess();
                              }
                            }}
                            className="p-1.5 text-[#4A4A4A] hover:text-[#E67A3E] cursor-pointer"
                            title="Delete dish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Hours & Holidays */}
        {activeTab === 'hours' && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-[#F2F2F2] rounded-[24px] p-6 border border-[#DDDDDD]">
              <h3 className="font-bold text-base text-[#111111] mb-1">Weekly Operating Schedule</h3>
              <p className="text-xs text-[#4A4A4A] mb-6">
                Adjust open/close times or toggle days as closed. Used for live calculation of the Open Now / Closed chip.
              </p>

              <div className="space-y-3">
                {cms.hours.map((schedule, idx) => (
                  <div key={schedule.day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-[16px] border border-[#DDDDDD]">
                    <div className="w-32 font-bold text-sm text-[#111111]">
                      {schedule.day}
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={schedule.isOpen}
                          onChange={(e) => {
                            const copy = [...cms.hours];
                            copy[idx].isOpen = e.target.checked;
                            if (!e.target.checked) {
                              copy[idx].display = 'Closed';
                            } else {
                              copy[idx].display = `${schedule.openTime || '12:00'} – ${schedule.closeTime || '22:00'}`;
                            }
                            cmsStore.updateHours(copy);
                            showSaveSuccess();
                          }}
                          className="rounded"
                        />
                        <span>{schedule.isOpen ? 'Open' : 'Closed'}</span>
                      </label>

                      {schedule.isOpen && (
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={schedule.openTime}
                            onChange={(e) => {
                              const copy = [...cms.hours];
                              copy[idx].openTime = e.target.value;
                              copy[idx].display = `${e.target.value} – ${schedule.closeTime}`;
                              cmsStore.updateHours(copy);
                              showSaveSuccess();
                            }}
                            className="bg-[#F2F2F2] px-2 py-1 rounded text-xs"
                          />
                          <span className="text-xs text-[#777777]">to</span>
                          <input
                            type="time"
                            value={schedule.closeTime}
                            onChange={(e) => {
                              const copy = [...cms.hours];
                              copy[idx].closeTime = e.target.value;
                              copy[idx].display = `${schedule.openTime} – ${e.target.value}`;
                              cmsStore.updateHours(copy);
                              showSaveSuccess();
                            }}
                            className="bg-[#F2F2F2] px-2 py-1 rounded text-xs"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Announcement Bar */}
        {activeTab === 'announcement' && (
          <div className="space-y-6 max-w-2xl bg-[#F2F2F2] rounded-[24px] p-6 border border-[#DDDDDD]">
            <h3 className="font-bold text-base text-[#111111] mb-1">Top Announcement Banner</h3>
            <p className="text-xs text-[#4A4A4A] mb-4">
              Shows at the top of every page for grand openings, event announcements, or special notices.
            </p>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
              <input
                type="checkbox"
                checked={cms.announcement.enabled}
                onChange={(e) => {
                  cmsStore.update({
                    announcement: { ...cms.announcement, enabled: e.target.checked },
                  });
                  showSaveSuccess();
                }}
                className="rounded"
              />
              <span>Enable Announcement Bar</span>
            </label>

            <div>
              <label className="block text-xs font-bold uppercase text-[#111111] mb-1">
                Announcement Text
              </label>
              <input
                type="text"
                value={cms.announcement.text}
                onChange={(e) => {
                  cmsStore.update({
                    announcement: { ...cms.announcement, text: e.target.value },
                  });
                }}
                className="app-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-[#111111] mb-1">
                  Button Text (Optional)
                </label>
                <input
                  type="text"
                  value={cms.announcement.linkText || ''}
                  onChange={(e) => {
                    cmsStore.update({
                      announcement: { ...cms.announcement, linkText: e.target.value },
                    });
                  }}
                  className="app-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#111111] mb-1">
                  Link Path
                </label>
                <input
                  type="text"
                  value={cms.announcement.linkUrl || ''}
                  onChange={(e) => {
                    cmsStore.update({
                      announcement: { ...cms.announcement, linkUrl: e.target.value },
                    });
                  }}
                  className="app-input"
                />
              </div>
            </div>

            <button
              onClick={showSaveSuccess}
              className="px-6 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs font-bold hover:bg-[#222222] cursor-pointer"
            >
              Save Announcement
            </button>
          </div>
        )}

        {/* Tab 4: Specials */}
        {activeTab === 'specials' && (
          <div className="space-y-6 max-w-2xl bg-[#F2F2F2] rounded-[24px] p-6 border border-[#DDDDDD]">
            <h3 className="font-bold text-base text-[#111111] mb-1">Daily Lunch Specials Card</h3>
            <p className="text-xs text-[#4A4A4A] mb-4">
              Displayed on the home page. When disabled or empty, the section automatically hides.
            </p>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
              <input
                type="checkbox"
                checked={cms.lunchSpecial.active}
                onChange={(e) => {
                  cmsStore.update({
                    lunchSpecial: { ...cms.lunchSpecial, active: e.target.checked },
                  });
                  showSaveSuccess();
                }}
                className="rounded"
              />
              <span>Activate Lunch Specials Card</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-[#111111] mb-1">
                  Special Title
                </label>
                <input
                  type="text"
                  value={cms.lunchSpecial.title}
                  onChange={(e) => {
                    cmsStore.update({
                      lunchSpecial: { ...cms.lunchSpecial, title: e.target.value },
                    });
                  }}
                  className="app-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#111111] mb-1">
                  Combo Price ($)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={cms.lunchSpecial.price}
                  onChange={(e) => {
                    cmsStore.update({
                      lunchSpecial: { ...cms.lunchSpecial, price: parseFloat(e.target.value) || 0 },
                    });
                  }}
                  className="app-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#111111] mb-1">
                Time Window
              </label>
              <input
                type="text"
                value={cms.lunchSpecial.time}
                onChange={(e) => {
                  cmsStore.update({
                    lunchSpecial: { ...cms.lunchSpecial, time: e.target.value },
                  });
                }}
                className="app-input"
              />
            </div>

            <button
              onClick={showSaveSuccess}
              className="px-6 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs font-bold hover:bg-[#222222] cursor-pointer"
            >
              Update Specials
            </button>
          </div>
        )}

        {/* Tab 5: Story & Copy */}
        {activeTab === 'copy' && (
          <div className="space-y-6 max-w-2xl bg-[#F2F2F2] rounded-[24px] p-6 border border-[#DDDDDD]">
            <h3 className="font-bold text-base text-[#111111] mb-1">Story &amp; Editorial Headings</h3>

            <div>
              <label className="block text-xs font-bold uppercase text-[#111111] mb-1">
                Story Headline (About / Home)
              </label>
              <input
                type="text"
                value={cms.storyHeadline}
                onChange={(e) => cmsStore.update({ storyHeadline: e.target.value })}
                className="app-input"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#111111] mb-1">
                Feature Section Heading
              </label>
              <input
                type="text"
                value={cms.featureHeading}
                onChange={(e) => cmsStore.update({ featureHeading: e.target.value })}
                className="app-input"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#111111] mb-1">
                Menu Page Intro Description
              </label>
              <textarea
                rows={3}
                value={cms.menuIntro}
                onChange={(e) => cmsStore.update({ menuIntro: e.target.value })}
                className="app-input resize-none"
              />
            </div>

            <button
              onClick={showSaveSuccess}
              className="px-6 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs font-bold hover:bg-[#222222] cursor-pointer"
            >
              Save Editorial Copy
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
