import React, { useState } from 'react';
import { siteImages } from '../../lib/images';
import { Play } from 'lucide-react';

export const VideoPoster: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section aria-label="Kitchen craft video documentary" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-[0.08em] font-bold text-[#4A4A4A] block mb-1">
            Behind the Burners
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
            Watch Our Kitchen Story
          </h3>
        </div>

        <div className="relative aspect-video w-full rounded-[30px] overflow-hidden bg-[#111111] border border-black/10">
          {!isPlaying ? (
            <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
              <img
                src={siteImages.chefPlating}
                alt="Video: Culinary Craft at Krazy Kitchen Katerers"
                className="w-full h-full object-cover filter brightness-85 group-hover:scale-102 transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button
                  type="button"
                  className="w-20 h-20 rounded-full bg-[#EE9B3B] hover:bg-[#D98826] text-[#111111] flex items-center justify-center transition-transform group-hover:scale-110 cursor-pointer"
                  aria-label="Play kitchen story video"
                >
                  <Play className="w-8 h-8 fill-[#111111] ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Culinary Craft at Krazy Kitchen Katerers"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
};
