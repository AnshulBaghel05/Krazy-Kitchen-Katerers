import React, { useState } from 'react';
import { useCMS } from '../../lib/cmsStore';
import { X, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigate?: (path: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigate }) => {
  const cms = useCMS();
  const [dismissed, setDismissed] = useState(false);

  if (!cms.announcement.enabled || dismissed) return null;

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#F0C964] text-[#111111] px-4 py-2.5 text-xs sm:text-sm font-medium border-b border-[#111111]/10 transition-all duration-200"
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <span>{cms.announcement.text}</span>
          {cms.announcement.linkText && (
            <button
              onClick={() => onNavigate?.(cms.announcement.linkUrl || '/catering')}
              className="inline-flex items-center gap-1 font-bold underline hover:opacity-80 transition-opacity cursor-pointer shrink-0"
            >
              <span>{cms.announcement.linkText}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#111111]/70 hover:text-[#111111] p-1 rounded hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
